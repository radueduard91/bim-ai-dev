import os
import sys
import pytest
from fastapi.testclient import TestClient

# Add the parent directory to sys.path to allow importing app modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.main import app, data_store  # Import the FastAPI app and data_store

@pytest.fixture
def client():
    """
    TestClient instance with overridden dependencies for testing.
    """
    # Reset data_store to initial state before each test
    data_store.clear()
    data_store.update({
        "df": None, 
        "nodeDataArray": [], 
        "linkDataArray": [], 
        "loadDescriptions": False
    })
    
    with TestClient(app) as test_client:
        yield test_client

@pytest.fixture
def test_csv_file():
    """
    Create a test CSV file with valid data.
    """
    csv_content = """cluster_name,object_name,object_name_alt,attribute_name,attribute_name_alt,attribute_definition
Cluster1,Object1,Object1 Alt,Attribute1,Alt1,This is definition 1
Cluster1,Object1,Object1 Alt,Attribute2,Alt2,This is definition 2
Cluster2,Object2,Object2 Alt,Attribute3,Alt3,This is definition 3
"""
    import tempfile
    with tempfile.NamedTemporaryFile(suffix=".csv", delete=False) as temp_file:
        temp_file.write(csv_content.encode('utf-8'))
        temp_file_path = temp_file.name
    
    yield temp_file_path
    
    # Cleanup
    if os.path.exists(temp_file_path):
        os.unlink(temp_file_path)