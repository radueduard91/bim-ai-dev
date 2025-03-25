import axios from 'axios';

export const handleDragStart = (event, key, category, setDraggedItem) => {
    event.dataTransfer.setData("text/plain", key);
    event.dataTransfer.setData("category", category);
    setDraggedItem(key);
    
    if (event.target.classList) {
        event.target.classList.add("dragging");
    }
};

export const handleDragEnd = (event, setDraggedItem) => {
    if (event.target.classList) {
        event.target.classList.remove("dragging");
    }
    setDraggedItem(null);
};

export const handleDragOver = (event) => {
    event.preventDefault();
    if (event.currentTarget.classList) {
        event.currentTarget.classList.add("drop-target");
    }
};

export const handleDragLeave = (event) => {
    if (event.currentTarget.classList) {
        event.currentTarget.classList.remove("drop-target");
    }
};

export const processDragDrop = async (
    event, 
    targetKey, 
    targetCategory, 
    graphData, 
    setGraphData, 
    fetchGraphData
) => {
    event.preventDefault();
    
    if (event.currentTarget.classList) {
        event.currentTarget.classList.remove("drop-target");
    }
    
    const sourceKey = event.dataTransfer.getData("text/plain");
    const sourceCategory = event.dataTransfer.getData("category");

    if (sourceKey && sourceKey !== targetKey) {
        setGraphData((prev) => {
            let updatedNodeDataArray = [...prev.nodeDataArray];
            let updatedLinkDataArray = [...prev.linkDataArray];

            const sourceNode = prev.nodeDataArray.find(node => node.key === sourceKey);
            const targetNode = prev.nodeDataArray.find(node => node.key === targetKey);
            
            if (sourceNode && targetNode) {
                // Existing link removal and creation logic
                updatedLinkDataArray = updatedLinkDataArray.filter(link => link.to !== sourceKey);

                if (sourceNode.category === "attribute") {
                    if (targetNode.category === "object") {
                        updatedLinkDataArray.push({ from: targetKey, to: sourceKey });
                    }
                    else if (targetNode.category === "system") {
                        const linkedObject = updatedNodeDataArray.find(node =>
                            prev.linkDataArray.some(link => link.from === node.key && link.to === sourceKey)
                        );
                        if (linkedObject) {
                            updatedLinkDataArray = updatedLinkDataArray.filter(link => 
                                link.from !== linkedObject.key && link.to !== sourceKey
                            );
                        }

                        const objects = updatedNodeDataArray.filter(node => node.category === "object");
                        const objectLinks = updatedLinkDataArray.filter(link => 
                            link.to !== sourceKey && objects.some(obj => obj.key === link.from)
                        );
                        
                        if (objectLinks.length > 0) {
                            const parentObject = objects.find(obj => 
                                objectLinks.some(l => l.from === obj.key)
                            );
                            if (parentObject) {
                                updatedLinkDataArray.push({ from: targetKey, to: parentObject.key });
                                updatedLinkDataArray.push({ from: parentObject.key, to: sourceKey });
                            }
                        }
                    }
                }
                else if (sourceNode.category === "object") {
                    if (targetNode.category === "system") {
                        updatedLinkDataArray = updatedLinkDataArray.filter(link => link.to !== sourceKey);
                        updatedLinkDataArray.push({ from: targetKey, to: sourceKey });
                    }
                }
            }

            return {
                ...prev,
                nodeDataArray: updatedNodeDataArray,
                linkDataArray: updatedLinkDataArray,
            };
        });

        // Send drag-drop changes to backend
        try {
            const sourceNode = graphData.nodeDataArray.find(node => node.key === sourceKey);
            const targetNode = graphData.nodeDataArray.find(node => node.key === targetKey);
            
            const response = await axios.post("http://localhost:8000/apply-drag-drop/", {
                source: sourceKey,
                target: targetKey,
                sourceType: sourceNode.category,
                targetType: targetNode.category
            });
            
            if (response.data.message === "Drag-and-drop operation completed successfully") {
                await fetchGraphData();
            }
        } catch (error) {
            console.error("Error applying drag and drop:", error);
            let errorMessage = "Error applying drag and drop.";
            if (error.response && error.response.data) {
                errorMessage += ` ${error.response.data.detail || ''}`;
            }
            alert(errorMessage);
        }
    }
};