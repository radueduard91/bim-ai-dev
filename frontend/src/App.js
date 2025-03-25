import React from "react";
import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";
import TableVisualization from "./components/TableVisualization";
import DiagramPopup from "./components/DiagramPopup";
import NotificationToast from "./components/NotificationToast";
import LoadingOverlay from "./components/LoadingOverlay";
import Popup from "./components/Popup";
import useAppState from "./hooks/useAppState";
import useFileUpload from "./hooks/useFileUpload";
import useNotifications from "./hooks/useNotifications";
import useDragDrop from "./hooks/useDragDrop";
import GlobalStyles from "./utils/globalStyles";

// Import the components
import ConfirmationDialog from "./components/ConfirmationDialog";
import AIThinkingOverlay from "./components/AIThinkingOverlay";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
    const { notification, showNotification } = useNotifications();
    
    const {
        graphData, 
        setGraphData,
        popup, 
        setPopup,
        dimensions, 
        setDimensions,
        showHarmonisedColumn, 
        setShowHarmonisedColumn,
        showDiagram, 
        setShowDiagram,
        isDiagramMinimized, 
        setIsDiagramMinimized,
        hasHarmonisedData,
        hasDiagramData,
        confirmDialog,
        hideConfirmDialog,
        isAIThinking,
        aiProgress,
        aiMessage,
        handleLabelChange,
        openPopup,
        closePopup,
        savePopupChanges,
        loadAttributeDescriptions,
        harmonizeAttributes, 
        generateDiagram,
        toggleHarmonisedColumn,
        toggleDiagram,
        toggleMinimizeDiagram
    } = useAppState();

    const {
        file,
        isLoading,
        handleFileChange,
        handleFileUpload,
        fetchGraphData
    } = useFileUpload(setGraphData, showNotification);

    const {
        draggedItem,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDragLeave,
        processDragDrop
    } = useDragDrop(graphData, setGraphData, showNotification);

    console.log("App rendering - confirmDialog state:", confirmDialog);

    return (
        <div className="app-container" style={{ 
            display: "flex", 
            flexDirection: "column",
            width: "100%", 
            height: "100vh",
            fontFamily: "Inter, system-ui, sans-serif",
            backgroundColor: "#f5f7fa"
        }}>
            <Header />
            
            <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                flexGrow: 1,
                height: "calc(100vh - 64px)", 
                overflow: "hidden",
                padding: "16px",
                gap: "16px"
            }}>
                <div style={{ 
                    width: "100%", 
                    padding: "16px", 
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    overflowY: "auto",
                    flexGrow: 1
                }} className="table-panel">
                    <ControlPanel 
                        isLoading={isLoading}
                        handleFileChange={handleFileChange}
                        handleFileUpload={() => handleFileUpload(showNotification)}
                        loadAttributeDescriptions={() => loadAttributeDescriptions(isLoading, showNotification)}
                        harmonizeAttributes={() => harmonizeAttributes(isLoading, showNotification)}
                        generateDiagram={() => generateDiagram(isLoading, showNotification)}
                        toggleHarmonisedColumn={toggleHarmonisedColumn}
                        toggleDiagram={() => toggleDiagram(showNotification)}
                        showHarmonisedColumn={showHarmonisedColumn}
                        showDiagram={showDiagram}
                        hasHarmonisedData={hasHarmonisedData}
                        hasDiagramData={hasDiagramData}
                    />
                    
                    <TableVisualization
                        graphData={graphData}
                        handleLabelChange={handleLabelChange}
                        openPopup={openPopup}
                        setGraphData={setGraphData}
                        fetchGraphData={() => fetchGraphData(showNotification)}
                        showHarmonisedColumn={showHarmonisedColumn}
                        draggedItem={draggedItem}
                        handleDragStart={handleDragStart}
                        handleDragEnd={handleDragEnd}
                        handleDragOver={handleDragOver}
                        handleDragLeave={handleDragLeave}
                        processDragDrop={processDragDrop}
                        showNotification={showNotification}
                    />
                </div>
            </div>
            
            {showDiagram && (
                <DiagramPopup 
                    graphData={graphData}
                    dimensions={dimensions}
                    setDimensions={setDimensions}
                    isDiagramMinimized={false} // Always show maximized
                    toggleMinimizeDiagram={toggleMinimizeDiagram}
                    toggleDiagram={() => toggleDiagram(showNotification)}
                    hideControlButtons={true} // Hide the top row buttons
                />
            )}
            
            <Popup
                isOpen={popup.isOpen}
                label={popup.value}
                nodeName={popup.name}
                onChangeLabel={(e) => setPopup({ ...popup, value: e.target.value })}
                onChangeName={(e) => setPopup({ ...popup, name: e.target.value })}
                onSave={() => savePopupChanges(showNotification)}
                onClose={closePopup}
            />
            
            {notification.show && (
                <NotificationToast 
                    notification={notification} 
                    showDiagram={showDiagram} 
                    isDiagramMinimized={isDiagramMinimized} 
                />
            )}
            
            {/* Confirmation Dialog Component */}
            <ConfirmationDialog 
                isOpen={confirmDialog.isOpen}
                title={confirmDialog.title}
                message={confirmDialog.message}
                confirmText={confirmDialog.confirmText}
                cancelText={confirmDialog.cancelText}
                onConfirm={() => {
                    console.log("onConfirm callback called from App");
                    if (typeof confirmDialog.onConfirm === 'function') {
                        confirmDialog.onConfirm();
                    }
                }}
                onCancel={() => {
                    console.log("onCancel callback called from App");
                    hideConfirmDialog();
                }}
            />
            
            {/* AI Thinking Overlay Component */}
            <AIThinkingOverlay 
                isOpen={isAIThinking} 
                message={aiMessage} 
                progress={aiProgress}
            />
            
            {/* Regular Loading Overlay */}
            {isLoading && <LoadingOverlay />}
            
            <GlobalStyles />
        </div>
    );
};

// Wrapped App with ErrorBoundary
const WrappedApp = () => {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
};

export default WrappedApp;