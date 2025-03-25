from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import StringIO
import uuid
import os
import logging
from pathlib import Path

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Create templates directory if it doesn't exist
templates_dir = Path("templates")
templates_dir.mkdir(exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for the uploaded DataFrame and node data
data_store = {"df": None, "nodeDataArray": [], "linkDataArray": [], "loadDescriptions": False}

# Copy the Excel template to the templates directory
# Note: This should be done during app setup or handled via a proper file system approach
@app.on_event("startup")
async def startup_event():
    # Ensure the templates directory exists
    os.makedirs("templates", exist_ok=True)
    
    # Check if the template file exists in the root directory
    if os.path.exists("ai template.xlsx"):
        # Copy it to the templates directory
        import shutil
        shutil.copy("ai template.xlsx", "templates/ai_template.xlsx")
        logger.info("Excel template copied to templates directory")
    else:
        logger.warning("Excel template not found in root directory")


@app.get("/api/templates/ai_template.xlsx")
async def download_template():
    """
    Endpoint to download the AI VP template Excel file
    """
    template_path = "templates/ai_template.xlsx"
    
    if not os.path.exists(template_path):
        # Check if it exists in the root directory
        if os.path.exists("ai template.xlsx"):
            template_path = "ai template.xlsx"
        else:
            raise HTTPException(status_code=404, detail="Template file not found")
    
    return FileResponse(
        path=template_path,
        filename="AI VP Template.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a CSV file and parse it into a DataFrame.
    """
    try:
        # Read and parse the CSV file
        content = await file.read()
        df = pd.read_csv(StringIO(content.decode("utf-8")))

        # Log the column names for debugging
        logger.info(f"CSV columns: {df.columns.tolist()}")
        
        # Check for new_object column (with or without space)
        if "new_object" in df.columns:
            logger.info("Found 'new_object' column (without space)")
            # Log sample values
            logger.info(f"Sample 'new_object' values: {df['new_object'].head().tolist()}")
        elif "new_object " in df.columns:
            logger.info("Found 'new_object ' column (with space)")
            # Log sample values
            logger.info(f"Sample 'new_object ' values: {df['new_object '].head().tolist()}")
            # Check if values exist
            non_empty_count = df['new_object '].notna().sum()
            logger.info(f"Number of non-empty 'new_object ' values: {non_empty_count}")
            if non_empty_count > 0:
                sample_values = df[df['new_object '].notna()]['new_object '].head().tolist()
                logger.info(f"Sample non-empty values: {sample_values}")
        else:
            logger.warning("No 'new_object' column found in CSV")

        # Validate required columns
        required_columns = [
            "cluster_name",
            "object_name",
            "object_name_alt",
            "attribute_name",
            "attribute_name_alt",
            "attribute_definition",
        ]
        if not all(col in df.columns for col in required_columns):
            raise HTTPException(
                status_code=400, detail="Missing required columns in CSV file"
            )

        # Store the validated DataFrame in memory
        data_store["df"] = df
        
        # Clear cached graph data
        data_store["nodeDataArray"] = []
        data_store["linkDataArray"] = []
        
        # Reset descriptions flag
        data_store["loadDescriptions"] = False

        return {"message": "File uploaded successfully"}
    except Exception as e:
        logger.error(f"Error processing file: {str(e)}")
        return JSONResponse(
            status_code=500, content={"message": f"Error processing the file: {str(e)}"}
        )


@app.get("/graph-data/")
def get_graph_data():
    """
    Generate graph data from the uploaded CSV file.
    """
    if data_store["df"] is None:
        raise HTTPException(
            status_code=400, detail="No data available. Please upload a file first."
        )

    if data_store["nodeDataArray"] and not data_store.get("loadDescriptions", False):
        return {
            "nodeDataArray": data_store["nodeDataArray"],
            "linkDataArray": data_store["linkDataArray"],
        }
        
    df = data_store["df"]
    
    # Check for new_object column (with or without space)
    if "new_object" in df.columns:
        logger.info("Found 'new_object' column in DataFrame")
    elif "new_object " in df.columns:
        logger.info("Found 'new_object ' column in DataFrame (with space)")
    else:
        logger.warning("No 'new_object' column found in DataFrame")

    # Transform DataFrame into GoJS format
    node_data_array = []
    link_data_array = []

    # Track unique nodes
    added_object_nodes = {}
    
    #Create unique keys for each cluster
    cluster_keys = {}
    for cluster_name in df["cluster_name"].unique():
        cluster_key = str(uuid.uuid4())
        cluster_keys[cluster_name] = cluster_key
        node_data_array.append({
            "key": cluster_key, 
            "category": "system", 
            "label": cluster_name,
            # Only add hoverLabel if descriptions should be loaded
            "hoverLabel": cluster_name if data_store.get("loadDescriptions", False) else ""
        })

    attribute_nodes_with_new_object = 0
    
    # Process each row to create object and attribute nodes
    for idx, row in df.iterrows():
        # Add the object node if not already added
        object_node_key = row["object_name"] + f"_{cluster_keys[row['cluster_name']]}"
        if object_node_key not in added_object_nodes:
            object_node = {
                "key": object_node_key,
                "category": "object",
                "label": row["object_name"],
                # Only add hoverLabel if descriptions should be loaded
                "hoverLabel": row["object_name_alt"] if data_store.get("loadDescriptions", False) else "",
            }
            node_data_array.append(object_node)
            added_object_nodes[object_node_key] = object_node

        # Add the attribute node
        attribute_node_key = str(uuid.uuid4())
        
        # Check if harmonised_attribute exists in the row
        harmonised_attr = row.get("harmonised_attribute", "")
        
        # Create base attribute node with required fields
        attribute_node = {
            "key": attribute_node_key,
            "category": "attribute",
            "label": row["attribute_name"],
            # Only add definition if descriptions should be loaded
            "hoverLabel": f"{row['attribute_name_alt']}\n{row['attribute_definition']}" if data_store.get("loadDescriptions", False) else "",
            "harmonisedAttribute": harmonised_attr if harmonised_attr else f"Harmonised-{row['attribute_name']}"
        }
        
        # Add all other columns from the dataframe to preserve metadata
        for col in df.columns:
            if col not in ["cluster_name", "object_name", "object_name_alt", "attribute_name", "attribute_name_alt", "attribute_definition", "harmonised_attribute"]:
                # Add the column to the attribute node, handling column names with spaces
                column_name = col.strip()
                # Get the value, handling potential NaN or None
                val = row.get(col)
                if pd.notna(val):  # Check if value is not NaN
                    attribute_node[column_name] = val
                    
                    # Track if we're adding new_object values
                    if column_name == "new_object" and val:
                        attribute_nodes_with_new_object += 1
                
        node_data_array.append(attribute_node)
        
        # Create links
        link_data_array.append({"from": cluster_keys[row["cluster_name"]], "to": object_node_key})
        link_data_array.append({"from": object_node_key, "to": attribute_node_key})

    # Log statistics on data processing
    logger.info(f"Created {len(node_data_array)} nodes and {len(link_data_array)} links")
    logger.info(f"Attributes with new_object values: {attribute_nodes_with_new_object}")
    
    # Check a sample attribute node to verify it has the new_object property
    attribute_nodes = [node for node in node_data_array if node["category"] == "attribute"]
    if attribute_nodes:
        sample_node = attribute_nodes[0]
        if "new_object" in sample_node:
            logger.info(f"Sample attribute has 'new_object' property with value: {sample_node['new_object']}")
        else:
            logger.warning("Sample attribute does not have 'new_object' property")
            logger.info(f"Sample attribute properties: {list(sample_node.keys())}")
    
    # Cache the generated node and link data
    data_store["nodeDataArray"] = node_data_array
    data_store["linkDataArray"] = link_data_array
    
    return {
        "nodeDataArray": node_data_array,
        "linkDataArray": link_data_array,
    }


@app.post("/load-descriptions/")
async def load_descriptions():
    """
    Toggle loading descriptions for nodes.
    """
    if data_store["df"] is None:
        raise HTTPException(
            status_code=400, detail="No data available. Please upload a file first."
        )

    # Set flag to load descriptions
    data_store["loadDescriptions"] = True
    
    # Clear cached graph data to force regeneration
    data_store["nodeDataArray"] = []
    data_store["linkDataArray"] = []

    return {"message": "Descriptions will be loaded in next graph data fetch"}


@app.post("/apply-drag-drop/")
async def apply_drag_drop(data: dict):
    """
    Update graph data based on drag-and-drop actions.
    """
    source_key = data.get("source")
    target_key = data.get("target")
    source_type = data.get("sourceType")
    target_type = data.get("targetType")
    
    if not source_key or not target_key:
       raise HTTPException(status_code=400, detail="Invalid source or target key.")

    # Get all the links
    links = data_store["linkDataArray"]

    # Find all links connected to source key
    links_to_remove = [link for link in links if link["to"] == source_key ]

    # Filter out all links related to the source key
    data_store["linkDataArray"] = [link for link in data_store["linkDataArray"] if link not in links_to_remove]

    # Add new link based on drag-and-drop type
    if source_type == "attribute" and target_type == "object":
         data_store["linkDataArray"].append({"from": target_key, "to": source_key})

    elif source_type == "object" and target_type == "system":
        data_store["linkDataArray"].append({"from": target_key, "to": source_key})
    else:
        raise HTTPException(status_code=400, detail="Invalid drag-and-drop operation.")


    return {"message": "Drag-and-drop operation completed successfully"}


@app.get("/graph-summary/")
def get_graph_summary():
    """
    Provide a summary of the graph data (useful for large datasets).
    """
    if not data_store["nodeDataArray"] or not data_store["linkDataArray"]:
        raise HTTPException(
            status_code=400, detail="No graph data available. Please upload a file first."
        )

    return {
        "nodeCount": len(data_store["nodeDataArray"]),
        "linkCount": len(data_store["linkDataArray"]),
    }