import json
from fastapi import status

def test_load_descriptions_endpoint(client, test_csv_file):
    """Test loading descriptions for attributes."""
    # First upload a valid file
    with open(test_csv_file, 'rb') as f:
        client.post(
            "/upload/",
            files={"file": ("test.csv", f, "text/csv")}
        )
    
    # Then try to load descriptions
    response = client.post("/load-descriptions/")
    assert response.status_code == status.HTTP_200_OK
    assert "message" in response.json()
    assert "Descriptions will be loaded" in response.json()["message"]
    
    # Now fetch the graph data with descriptions
    graph_data_response = client.get("/graph-data/")
    assert graph_data_response.status_code == status.HTTP_200_OK
    
    data = graph_data_response.json()
    assert "nodeDataArray" in data
    assert "linkDataArray" in data
    
    # Check if node data includes hoverLabel (descriptions)
    nodes = data["nodeDataArray"]
    attribute_nodes = [node for node in nodes if node["category"] == "attribute"]
    
    # At least one attribute should have a non-empty hoverLabel
    has_hover_label = any(node.get("hoverLabel") for node in attribute_nodes)
    assert has_hover_label

def test_apply_drag_drop(client, test_csv_file):
    """Test the drag and drop functionality."""
    # First upload a valid file
    with open(test_csv_file, 'rb') as f:
        client.post(
            "/upload/",
            files={"file": ("test.csv", f, "text/csv")}
        )
    
    # Get graph data to find node keys
    graph_data_response = client.get("/graph-data/")
    data = graph_data_response.json()
    
    # Find an object and a system node
    object_nodes = [node for node in data["nodeDataArray"] if node["category"] == "object"]
    system_nodes = [node for node in data["nodeDataArray"] if node["category"] == "system"]
    
    if object_nodes and system_nodes:
        source_key = object_nodes[0]["key"]
        target_key = system_nodes[0]["key"]
        
        # Test drag-drop operation
        response = client.post(
            "/apply-drag-drop/",
            json={
                "source": source_key,
                "target": target_key,
                "sourceType": "object",
                "targetType": "system"
            }
        )
        
        assert response.status_code == status.HTTP_200_OK
        assert "message" in response.json()
        assert "Drag-and-drop operation completed successfully" in response.json()["message"]