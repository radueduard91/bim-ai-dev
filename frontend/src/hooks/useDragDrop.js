import { useState } from "react";
import axios from "axios";
import useAppState from './useAppState';

const useDragDrop = (graphData, setGraphData, showNotification) => {
    const [draggedItem, setDraggedItem] = useState(null);
    const { showConfirmDialog } = useAppState();

    // Define the drag handlers
    const handleDragStart = (event, key, category) => {
        console.log("Drag started:", { key, category });
        event.dataTransfer.setData("text/plain", key);
        event.dataTransfer.setData("category", category);
        setDraggedItem(key);
        
        if (event.target.classList) {
            event.target.classList.add("dragging");
        }
    };

    const handleDragEnd = (event) => {
        console.log("Drag ended");
        if (event.target.classList) {
            event.target.classList.remove("dragging");
        }
        setDraggedItem(null);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        if (event.currentTarget.classList) {
            event.currentTarget.classList.add("drop-target");
        }
    };

    const handleDragLeave = (event) => {
        if (event.currentTarget.classList) {
            event.currentTarget.classList.remove("drop-target");
        }
    };
    
    // Process drag drop without confirmation dialog to simplify things
    const processDragDrop = async (event, targetKey, targetCategory) => {
        event.preventDefault();
        console.log("Processing drag and drop:", { targetKey, targetCategory });
        
        if (event.currentTarget.classList) {
            event.currentTarget.classList.remove("drop-target");
        }
        
        const sourceKey = event.dataTransfer.getData("text/plain");
        const sourceCategory = event.dataTransfer.getData("category");

        console.log("Drag source:", { sourceKey, sourceCategory });
        console.log("Drag target:", { targetKey, targetCategory });

        if (!sourceKey || sourceKey === targetKey) {
            console.log("Invalid drag operation - same source and target or missing source key");
            return;
        }

        if (!graphData || !graphData.nodeDataArray || !graphData.linkDataArray) {
            console.error("Invalid graph data structure");
            return;
        }

        try {
            const sourceNode = graphData.nodeDataArray.find(node => node.key === sourceKey);
            const targetNode = graphData.nodeDataArray.find(node => node.key === targetKey);
            
            if (!sourceNode || !targetNode) {
                console.error("Source or target node not found:", { sourceKey, targetKey });
                return;
            }

            console.log("Source node:", sourceNode);
            console.log("Target node:", targetNode);

            // Update local state immediately
            setGraphData((prev) => {
                let updatedNodeDataArray = [...prev.nodeDataArray];
                let updatedLinkDataArray = [...prev.linkDataArray];
                
                // Existing link removal and creation logic
                updatedLinkDataArray = updatedLinkDataArray.filter(link => link.to !== sourceKey);

                if (sourceNode.category === "attribute" && targetNode.category === "object") {
                    updatedLinkDataArray.push({ from: targetKey, to: sourceKey });
                }
                else if (sourceNode.category === "object" && targetNode.category === "system") {
                    updatedLinkDataArray = updatedLinkDataArray.filter(link => link.to !== sourceKey);
                    updatedLinkDataArray.push({ from: targetKey, to: sourceKey });
                }

                return {
                    ...prev,
                    nodeDataArray: updatedNodeDataArray,
                    linkDataArray: updatedLinkDataArray,
                };
            });

            // Send drag-drop changes to backend
            console.log("Sending drag-drop changes to backend");
            try {
                const response = await axios.post("http://localhost:8000/apply-drag-drop/", {
                    source: sourceKey,
                    target: targetKey,
                    sourceType: sourceNode.category,
                    targetType: targetNode.category
                });
                
                console.log("Backend response:", response.data);
                
                if (response.data && response.data.message === "Drag-and-drop operation completed successfully") {
                    if (showNotification) {
                        showNotification("Item moved successfully", "success");
                    }
                }
            } catch (error) {
                console.error("Error applying drag and drop:", error);
                let errorMessage = "Error moving item.";
                if (error.response && error.response.data) {
                    errorMessage += ` ${error.response.data.detail || ''}`;
                }
                if (showNotification) {
                    showNotification(errorMessage, "error");
                }
            }
        } catch (error) {
            console.error("Error processing drag and drop:", error);
            if (showNotification) {
                showNotification("Error processing drag and drop operation", "error");
            }
        }
    };

    return {
        draggedItem,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDragLeave,
        processDragDrop
    };
};

export default useDragDrop;