# BIM AI POC (Business Information Modeling AI Proof of Concept)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.95.x-009688.svg)

A proof of concept application demonstrating AI-assisted Building Information Modeling (BIM) data management and visualization. This application enables users to upload, analyze, harmonize, and visualize attribute data, providing an interactive platform for exploring and manipulating relationships between BIM entities.

## 📋 Table of Contents

- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#️-installation)
- [Usage Guide](#-usage-guide)
- [Data Models](#-data-models)
- [Key Components](#-key-components)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Code Architecture Patterns](#-code-architecture-patterns)
- [Known Limitations](#-known-limitations)
- [Extension Points](#️-extension-points)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

## 🚀 Features

- **Data Upload & Processing**: Import and visualize attribute data from CSV files
- **Smart Definitions**: AI-simulated generation of attribute definitions based on context and naming patterns
- **Attribute Harmonization**: Intelligent grouping and standardization of similar attributes
- **Interactive Visualizations**: 
  - Table view with filtering, sorting, and pagination
  - Hierarchical graph visualization of relationships
  - Specialized table view showing parent-child relationships
- **Drag & Drop Interface**: Intuitive reorganization of data relationships
- **3NF Analysis**: Verification of Third Normal Form compliance for data attributes
- **AI-Suggested Rearrangements**: Optimized data structure suggestions
- **Responsive Design**: Modern UI that works on various screen sizes

## 🏗 System Architecture

The application follows a client-server architecture:

### Backend (Server)

Built with FastAPI, the backend provides:
- RESTful API endpoints for data operations
- File upload and processing capabilities
- In-memory data storage for the current session
- Graph data generation and relationship management

### Frontend (Client)

Built with React, the frontend provides:
- Interactive user interface for data visualization
- State management via custom hooks
- Multiple visualization modes for data exploration
- AI processing simulation with progress indicators
- Drag-and-drop functionality for relationship manipulation

### Data Flow

1. Users upload CSV files containing attribute data
2. Backend processes these files and extracts structured data
3. Frontend visualizes this data in various formats
4. Users can trigger AI-simulated processing features
5. Users can manipulate relationships using the interactive interface

## 💻 Tech Stack

### Frontend
- **React 18**: Core UI library
- **Custom Hooks**: For state management and logic reuse
- **ReactFlow**: For interactive graph visualization
- **HTML5 Drag and Drop API**: For relationship manipulation
- **CSS-in-JS**: For component styling

### Backend
- **FastAPI**: High-performance Python framework
- **Pandas**: For data processing and manipulation
- **Python 3.9+**: Core backend language
- **CORS middleware**: For cross-origin request handling
- **In-memory storage**: For session data persistence

## 🛠️ Installation

### Prerequisites
- Node.js (v16+)
- Python 3.9+
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# For Windows
venv\Scripts\activate
# For macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install

# Start development server
npm start
# or
yarn start
```

The application should now be accessible at http://localhost:3000, connecting to the backend at http://localhost:8000.

## 📖 Usage Guide

### Basic Workflow

1. **Upload Data**: 
   - Click "Select File" to choose a CSV file
   - Click "Upload" to process the file
   - The application expects specific columns (cluster_name, object_name, object_name_alt, attribute_name, attribute_name_alt, attribute_definition)

2. **Explore Data**:
   - Navigate through the table visualization
   - Use filter and sort functions to find specific data
   - Use pagination controls for large datasets

3. **Generate Definitions**:
   - Click "Generate Definitions" to create attribute descriptions
   - Wait for the AI processing simulation to complete
   - Review generated definitions for each attribute

4. **Harmonize Attributes**:
   - Click "Harmonise Attributes" to standardize attribute naming
   - Toggle "Show Harmonised" to view the harmonized data
   - Review which attributes have been grouped together

5. **Generate and Explore Relationships**:
   - Click "Generate Diagram" to create a visual relationship diagram
   - Use the diagram controls to explore relationships
   - Pan, zoom, and select nodes to focus on specific areas

6. **Reorganize Data**:
   - Drag attributes between objects to change relationships
   - Drag objects between clusters to change grouping
   - Changes are immediately reflected in the visualization

### Advanced Features

1. **3NF Analysis**:
   - In the TableGraphVisualization, view 3NF compliance status
   - Check which attributes comply with Third Normal Form rules
   - Understand the reasons for non-compliance

2. **AI Rearrangement**:
   - Apply AI-suggested rearrangements to optimize data structure
   - Compare original and suggested structures
   - Evaluate the benefits of the suggested changes

3. **Attribute Details**:
   - Click on attributes to expand and see original source attributes
   - View migration history when using AI rearrangement
   - Edit descriptions and names through the popup interface

### Sample Data

The repository includes sample CSV files to help you get started. Each file should include the required columns.

## 📊 Data Models

### Node Types

- **System/Cluster**: Top-level grouping of objects (category: "system")
  - Properties: key, label, hoverLabel (description)
  
- **Object**: Container for attributes (category: "object")
  - Properties: key, label, hoverLabel (description)
  - May have parent-child relationships in AI rearrangement view
  
- **Attribute**: Specific data points (category: "attribute")
  - Properties: key, label, hoverLabel (description), harmonisedAttribute

### Relationships

Relationships are represented as links between nodes:
- Cluster → Object: An object belongs to a cluster
- Object → Attribute: An attribute belongs to an object
- Object → Object: Parent-child relationships (in AI rearrangement)

### Harmonized Attributes

The application groups similar attributes into harmonized categories:
- Original attribute names are preserved for reference
- Harmonized attributes provide standardized naming
- 3NF compliance is assessed for each harmonized attribute
- Original location tracking when attributes are moved

## 🧩 Key Components

### Backend Components

#### main.py

Core backend file with FastAPI endpoints:
- `/upload/`: Processes uploaded CSV files
- `/graph-data/`: Generates and returns graph structure
- `/load-descriptions/`: Simulates loading attribute descriptions
- `/apply-drag-drop/`: Updates relationships based on drag-and-drop actions

### Frontend Components

#### App.js

Main React component orchestrating the entire application:
- Error boundary implementation
- Component composition
- Core application layout
- Hook integration

#### Custom Hooks

- **useAppState.js**: Core application state management
- **useFileUpload.js**: File handling and upload process
- **useDragDrop.js**: Drag-and-drop operation management
- **useNotifications.js**: Notification display system
- **useGraphVisualization.js**: Graph data processing and display
- **useTableState.js**: Table state and interaction management
- **useRowProcessing.js**: Data row processing for tables

#### Visualization Components

- **TableVisualization**: Main data table with filtering and sorting
- **TableGraphVisualization**: Hierarchical view with 3NF analysis
- **GraphVisualization**: Node-based graph using ReactFlow
- **DiagramPopup**: Modal container for full-screen diagrams

#### UI Components

- **ControlPanel**: Main action buttons and toggles
- **FileUpload**: File selection and upload interface
- **Popup/ConfirmationDialog**: User interaction dialogs
- **AIThinkingOverlay**: AI simulation progress display
- **NotificationToast**: Feedback message display
- **LoadingOverlay**: Loading indicator for async operations

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/upload/` | POST | Upload and process a CSV file |
| `/graph-data/` | GET | Retrieve the processed graph data |
| `/load-descriptions/` | POST | Trigger loading of attribute descriptions |
| `/apply-drag-drop/` | POST | Apply drag-and-drop relationship changes |
| `/graph-summary/` | GET | Get summary statistics about the graph data |
| `/api/templates/ai_template.xlsx` | GET | Download the Excel template |

## 🔍 Project Structure

```
bim-ai-poc/
├── backend/                       # FastAPI backend
│   ├── app/
│   │   ├── dependencies.py
│   │   └── main.py               # Main API endpoints
│   ├── backend-readme.md
│   └── requirements.txt
├── frontend/                      # React frontend
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/            # UI components
│   │   │   ├── TableGraphVisualization/  # Hierarchical visualization
│   │   │   ├── TableVisualization/       # Table data display
│   │   │   ├── AIThinkingOverlay.js      # AI processing indicator
│   │   │   ├── ConfirmationDialog.js     # Confirmation prompts
│   │   │   ├── ControlPanel.js           # Main control buttons
│   │   │   ├── DiagramPopup.js           # Diagram modal
│   │   │   ├── FileUpload.js             # File upload interface
│   │   │   ├── GraphVisualization.js     # Node graph display
│   │   │   ├── Header.js                 # Application header
│   │   │   ├── LoadingOverlay.js         # Loading indicator
│   │   │   ├── NotificationToast.js      # Notification display
│   │   │   └── Popup.js                  # Edit popup
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useAppState.js     # Core state management
│   │   │   ├── useDragDrop.js     # Drag and drop logic
│   │   │   ├── useFileUpload.js   # File handling
│   │   │   └── useNotifications.js  # Notifications
│   │   ├── utils/                 # Utility functions
│   │   ├── App.js                 # Main application component
│   │   └── index.js               # Application entry point
│   └── package.json
└── templates/                     # Template files
    └── ai_template.xlsx
```

## 🧠 Code Architecture Patterns

1. **Component Composition**: Breaking UI into small, reusable components
2. **Custom Hooks**: Extracting stateful logic into reusable hooks
3. **Separation of Concerns**: Dividing UI, state management, and business logic
4. **Prop Drilling**: Passing data and callbacks down the component tree
5. **Error Boundaries**: Catching and handling errors in React components
6. **Event-Driven Interactions**: Using events for user interaction handling
7. **Simulated AI Processing**: Progress indicators and staged messages
8. **Responsive Design**: Adapting UI for different screen sizes

## ⚠️ Known Limitations

1. **In-Memory Storage**: Data is not persisted across server restarts
2. **Limited File Formats**: Only supports CSV files in a specific format
3. **No Authentication**: No user authentication or authorization
4. **Simulated AI**: AI features are simulated, not using actual AI algorithms
5. **Performance Limitations**: May have performance issues with very large datasets
6. **No Server-Side Validation**: Limited validation of uploaded data
7. **Single Session**: No multi-user or collaborative features implemented yet

## 🛣️ Extension Points

Here are potential areas for future development:

1. **Vector Database Integration**: Add persistent storage with a vector database
2. **Additional File Formats**: Support for Excel, JSON, or other formats
3. **Real AI Integration**: Connect to actual AI services for analysis
4. **User Authentication**: Add user accounts and access control
5. **Collaborative Features**: Allow multiple users to work on the same dataset
6. **Export Functionality**: Allow exporting processed data in various formats
7. **Advanced Visualizations**: Add more visualization types for different analyses
8. **Undo/Redo Functionality**: Add history tracking for user actions
9. **Performance Optimization**: Improve handling of large datasets
10. **Expanded 3NF Analysis**: More detailed normalization recommendations

## 🔧 Troubleshooting

### Common Issues

1. **Upload Errors**:
   - Check CSV format and required columns
   - Ensure backend server is running
   - Check network connectivity
   - Verify file size constraints

2. **Visualization Issues**:
   - Clear browser cache
   - Ensure required data is loaded
   - Check browser console for errors
   - Try a different browser if rendering problems persist

3. **Backend Connection Issues**:
   - Verify backend server is running on the expected port
   - Check CORS configuration
   - Ensure network requests aren't being blocked
   - Look for error messages in the backend console

### Development Tips

1. Use the browser console to debug frontend issues
2. Check backend logs for API request problems
3. Use the error boundary to catch and display React component errors
4. Test API endpoints directly using tools like Postman before integrating with frontend
5. Start with small datasets when testing new features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

When contributing, please keep in mind:
- Add tests for new functionality
- Update documentation for any changes
- Maintain cross-browser compatibility

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [React](https://reactjs.org/) for the frontend library
- [ReactFlow](https://reactflow.dev/) for the graph visualization
- [Pandas](https://pandas.pydata.org/) for data manipulation

---


