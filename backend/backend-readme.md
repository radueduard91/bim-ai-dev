# Backend for Graph Visualizer

## Overview
This is the FastAPI backend for the Graph Visualizer application. It handles file uploads, data processing, and graph data generation.

## Endpoints

### `/upload/`
- **Method**: POST
- **Description**: Upload a CSV file for processing
- **Parameters**: 
  - `file`: CSV file to be uploaded
- **Returns**: JSON response with upload status

### `/graph-data/`
- **Method**: GET
- **Description**: Retrieve processed graph data from the uploaded CSV
- **Returns**: 
  - `nodeDataArray`: List of nodes
  - `linkDataArray`: List of links between nodes

### `/apply-drag-drop/`
- **Method**: POST
- **Description**: Update graph structure based on drag-and-drop actions
- **Parameters**:
  - `source`: Source node key
  - `target`: Target node key
  - `sourceType`: Category of source node
  - `targetType`: Category of target node

### `/graph-summary/`
- **Method**: GET
- **Description**: Get a summary of the current graph data
- **Returns**: 
  - `nodeCount`: Total number of nodes
  - `linkCount`: Total number of links

## Data Requirements
The CSV file should have the following columns:
- `cluster_name`
- `object_name`
- `object_name_alt`
- `attribute_name`
- `attribute_name_alt`
- `attribute_definition`

## Installation
1. Create a virtual environment
2. Install dependencies: `pip install -r requirements.txt`
3. Run the server: `uvicorn main:app --reload`

## Technology Stack
- FastAPI
- Pandas
- Python
