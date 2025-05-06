import os
import json
from fastapi import status

def test_upload_endpoint(client, test_csv_file):
    """Test the file upload endpoint with a valid CSV file."""
    with open(test_csv_file, 'rb') as f:
        response = client.post(
            "/upload/",
            files={"file": ("test.csv", f, "text/csv")}
        )
    
    assert response.status_code == status.HTTP_200_OK
    assert "message" in response.json()
    assert response.json()["message"] == "File uploaded successfully"

def test_graph_data_endpoint_no_data(client):
    """Test the graph data endpoint when no data is available."""
    # The client fixture now resets data_store before each test
    # so we don't need to manually reset it here
    response = client.get("/graph-data/")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "detail" in response.json()
    assert "No data available" in response.json()["detail"]

def test_upload_invalid_file(client):
    """Test uploading an invalid file."""
    # Create an invalid CSV missing required columns
    invalid_content = "col1,col2\n1,2\n3,4"
    
    with open("invalid.csv", "w") as f:
        f.write(invalid_content)
    
    try:
        with open("invalid.csv", "rb") as f:
            response = client.post(
                "/upload/",
                files={"file": ("invalid.csv", f, "text/csv")}
            )
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "Missing required columns" in response.json()["detail"]
    finally:
        # Clean up
        if os.path.exists("invalid.csv"):
            os.remove("invalid.csv")