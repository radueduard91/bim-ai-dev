import { useState, useRef } from "react";
import axios from "axios";

const useAppState = () => {
    // Main state
    const [graphData, setGraphData] = useState(null);
    const [popup, setPopup] = useState({ isOpen: false, key: null, value: "", name: "" });
    const [dimensions, setDimensions] = useState({ width: "100%", height: "600px" });
    const [showHarmonisedColumn, setShowHarmonisedColumn] = useState(false);
    const [showDiagram, setShowDiagram] = useState(false);
    const [isDiagramMinimized, setIsDiagramMinimized] = useState(false);
    
    // Track if harmonization and diagram generation have been performed
    const [hasHarmonisedData, setHasHarmonisedData] = useState(false);
    const [hasDiagramData, setHasDiagramData] = useState(false);

    // Confirmation dialog state
    const [confirmDialog, setConfirmDialog] = useState({ 
        isOpen: false, 
        title: "", 
        message: "", 
        confirmText: "", 
        cancelText: "", 
        onConfirm: () => {} 
    });

    // AI thinking state
    const [isAIThinking, setIsAIThinking] = useState(false);
    const [aiProgress, setAIProgress] = useState(0);
    const [aiMessage, setAIMessage] = useState("Analyzing data...");

    // Safely sanitize node data
    const sanitizeNodeData = (node) => {
        // Ensure we're only working with primitive values
        return {
            key: String(node.key || ''),
            category: String(node.category || ''),
            label: String(node.label || ''),
            hoverLabel: String(node.hoverLabel || ''),
            harmonisedAttribute: String(node.harmonisedAttribute || '')
        };
    };

    // Popup management functions
    const openPopup = (key, currentValue, currentName) => {
        setPopup({ 
            isOpen: true, 
            key: String(key), 
            value: String(currentValue || ""), 
            name: String(currentName || "") 
        });
    };

    const closePopup = () => {
        setPopup({ isOpen: false, key: null, value: "", name: "" });
    };

    const savePopupChanges = (showNotification) => {
        const updatedValue = String(popup.value || '');
        const updatedName = String(popup.name || '');
        
        setGraphData((prev) => {
            // Ensure prev is an object and has nodeDataArray
            if (!prev || !Array.isArray(prev.nodeDataArray)) {
                console.warn('Invalid graph data structure');
                return prev;
            }

            // Create a new array with sanitized nodes
            const updatedNodeDataArray = prev.nodeDataArray.map((node) => 
                node.key === popup.key 
                    ? { 
                        ...sanitizeNodeData(node), 
                        hoverLabel: updatedValue,
                        label: updatedName 
                      }
                    : sanitizeNodeData(node)
            );

            return {
                ...prev,
                nodeDataArray: updatedNodeDataArray
            };
        });
        
        closePopup();
        
        // Show saving indicator
        if (showNotification) {
            showNotification("Changes saved successfully.", "success");
        }
    };

    const handleLabelChange = (event, key) => {
        const updatedValue = String(event.target.value || '');
        
        setGraphData((prev) => {
            // Ensure prev is an object and has nodeDataArray
            if (!prev || !Array.isArray(prev.nodeDataArray)) {
                console.warn('Invalid graph data structure');
                return prev;
            }

            // Create a new array with sanitized nodes
            const updatedNodeDataArray = prev.nodeDataArray.map((node) => 
                node.key === key 
                    ? { 
                        ...sanitizeNodeData(node), 
                        hoverLabel: updatedValue 
                      }
                    : sanitizeNodeData(node)
            );

            return {
                ...prev,
                nodeDataArray: updatedNodeDataArray
            };
        });
    };

    // Confirmation dialog functions
    const showConfirmDialog = (config) => {
        console.log("showConfirmDialog called with config:", config);
        setConfirmDialog({
            isOpen: true,
            title: config.title || "Confirm Action",
            message: config.message || "Are you sure you want to proceed?",
            confirmText: config.confirmText || "Confirm",
            cancelText: config.cancelText || "Cancel",
            onConfirm: config.onConfirm || (() => {
                console.log("Default confirm action");
            }),
        });
        console.log("confirmDialog state set:", {
            isOpen: true,
            title: config.title || "Confirm Action",
            // Log other properties
        });
    };

    const hideConfirmDialog = () => {
        console.log("hideConfirmDialog called");
        setConfirmDialog({ ...confirmDialog, isOpen: false });
    };

    // AI thinking functions
    const startAIProcessing = (initialMessage = "Analyzing data...") => {
        console.log("startAIProcessing called with message:", initialMessage);
        setIsAIThinking(true);
        setAIMessage(initialMessage);
        setAIProgress(0);
        
        return {
            updateProgress: (progress, message) => {
                setAIProgress(progress);
                if (message) setAIMessage(message);
            },
            complete: () => {
                setAIProgress(100);
                setTimeout(() => setIsAIThinking(false), 500);
            }
        };
    };

    // Load attribute descriptions
    const loadAttributeDescriptions = async (isLoading, showNotification) => {
        if (isLoading) return;
        
        showConfirmDialog({
            title: "Generate Attribute Definitions?",
            message: "This will use AI to analyze your attributes and generate meaningful definitions based on relationships and naming patterns.",
            confirmText: "Generate Definitions",
            onConfirm: async () => {
                // Hide confirmation dialog immediately after confirming
                hideConfirmDialog();
                
                // Start AI processing animation
                const aiProcess = startAIProcessing("Analyzing attribute patterns...");
                
                try {
                    // First tell the backend to prepare descriptions
                    await axios.post("http://localhost:8000/load-descriptions/");
                    
                    // Simulate AI progress with different stages
                    const stages = [
                        "Analyzing attribute patterns...",
                        "Extracting semantic meaning from names...",
                        "Correlating with known domain concepts...",
                        "Generating natural language definitions...",
                        "Finalizing harmonized attributes..."
                    ];
                    
                    let currentStage = 0;
                    let progress = 0;
                    
                    const interval = setInterval(() => {
                        progress += 2;
                        
                        // Update message at certain thresholds
                        if (progress % 20 === 0 && currentStage < stages.length - 1) {
                            currentStage++;
                            aiProcess.updateProgress(progress, stages[currentStage]);
                        }
                        
                        if (progress >= 100) {
                            clearInterval(interval);
                            
                            // Call the real API endpoint
                            axios.get("http://localhost:8000/graph-data/")
                                .then(response => {
                                    // Sanitize the received data
                                    const sanitizedData = {
                                        nodeDataArray: (response.data.nodeDataArray || []).map(sanitizeNodeData),
                                        linkDataArray: response.data.linkDataArray || []
                                    };

                                    setGraphData(sanitizedData);
                                    aiProcess.complete();
                                    
                                    if (showNotification) {
                                        showNotification("Definitions generated successfully!", "success");
                                    }
                                })
                                .catch(error => {
                                    console.error("Error generating definitions:", error);
                                    aiProcess.complete();
                                    if (showNotification) {
                                        showNotification("Error generating definitions.", "error");
                                    }
                                });
                        } else {
                            aiProcess.updateProgress(progress);
                        }
                    }, 50);
                } catch (error) {
                    console.error("Error generating definitions:", error);
                    aiProcess.complete();
                    if (showNotification) {
                        showNotification("Error generating definitions.", "error");
                    }
                }
            }
        });
    };

    // Harmonize attributes with similar confirmation and loading screens
    const harmonizeAttributes = async (isLoading, showNotification) => {
        if (isLoading) return;
        
        showConfirmDialog({
            title: "Harmonise Attributes?",
            message: "This will analyze your attributes and generate harmonised versions based on semantic similarities and naming patterns.",
            confirmText: "Harmonise Attributes",
            onConfirm: async () => {
                // Hide confirmation dialog immediately after confirming
                hideConfirmDialog();
                
                // Start AI processing animation
                const aiProcess = startAIProcessing("Analyzing attribute relationships...");
                
                try {
                    // Simulate AI progress with different stages
                    const stages = [
                        "Analyzing attribute relationships...",
                        "Identifying semantic groupings...",
                        "Detecting similar patterns...",
                        "Harmonising attribute names...",
                        "Validating consistency..."
                    ];
                    
                    let currentStage = 0;
                    let progress = 0;
                    
                    const interval = setInterval(async () => {
                        progress += 2;
                        
                        // Update message at certain thresholds
                        if (progress % 20 === 0 && currentStage < stages.length - 1) {
                            currentStage++;
                            aiProcess.updateProgress(progress, stages[currentStage]);
                        }
                        
                        if (progress >= 100) {
                            clearInterval(interval);
                            
                            try {
                                // Mark that harmonization has been performed
                                setHasHarmonisedData(true);
                                
                                // Show the harmonised column
                                setShowHarmonisedColumn(true);
                                
                                // Optionally fetch updated data if your backend modifies it
                                const response = await axios.get("http://localhost:8000/graph-data/");
                                const sanitizedData = {
                                    nodeDataArray: (response.data.nodeDataArray || []).map(sanitizeNodeData),
                                    linkDataArray: response.data.linkDataArray || []
                                };
                                
                                setGraphData(sanitizedData);
                                aiProcess.complete();
                                
                                if (showNotification) {
                                    showNotification("Attributes harmonised successfully!", "success");
                                }
                            } catch (error) {
                                console.error("Error harmonising attributes:", error);
                                aiProcess.complete();
                                
                                // Still mark harmonization as done and show harmonised column
                                setHasHarmonisedData(true);
                                setShowHarmonisedColumn(true);
                                
                                if (showNotification) {
                                    showNotification("Error harmonising attributes, but showing harmonised view.", "warning");
                                }
                            }
                        } else {
                            aiProcess.updateProgress(progress);
                        }
                    }, 50);
                } catch (error) {
                    console.error("Error in harmonisation process:", error);
                    aiProcess.complete();
                    if (showNotification) {
                        showNotification("Error harmonising attributes.", "error");
                    }
                }
            }
        });
    };

    // Generate diagram with confirmation and loading screen
    const generateDiagram = async (isLoading, showNotification) => {
        if (isLoading) return;
        
        if (!graphData) {
            if (showNotification) {
                showNotification("Please upload data first.", "error");
            }
            return;
        }
        
        showConfirmDialog({
            title: "Generate Relationship Diagram?",
            message: "This will analyze your data structure and generate a visual diagram showing relationships between entities.",
            confirmText: "Generate Diagram",
            onConfirm: async () => {
                // Hide confirmation dialog immediately after confirming
                hideConfirmDialog();
                
                // Start AI processing animation
                const aiProcess = startAIProcessing("Analyzing data structure...");
                
                try {
                    // Simulate AI progress with different stages
                    const stages = [
                        "Analyzing data structure...",
                        "Identifying entity relationships...",
                        "Calculating optimal layout...",
                        "Rendering relationship diagram...",
                        "Finalizing visualization..."
                    ];
                    
                    let currentStage = 0;
                    let progress = 0;
                    
                    const interval = setInterval(() => {
                        progress += 2;
                        
                        // Update message at certain thresholds
                        if (progress % 20 === 0 && currentStage < stages.length - 1) {
                            currentStage++;
                            aiProcess.updateProgress(progress, stages[currentStage]);
                        }
                        
                        if (progress >= 100) {
                            clearInterval(interval);
                            
                            try {
                                // Mark that diagram has been generated
                                setHasDiagramData(true);
                                
                                // Show diagram and ensure it's not minimized
                                setShowDiagram(true);
                                setIsDiagramMinimized(false);
                                
                                aiProcess.complete();
                                
                                if (showNotification) {
                                    showNotification("Diagram generated successfully!", "success");
                                }
                            } catch (error) {
                                console.error("Error generating diagram:", error);
                                aiProcess.complete();
                                if (showNotification) {
                                    showNotification("Error generating diagram.", "error");
                                }
                            }
                        } else {
                            aiProcess.updateProgress(progress);
                        }
                    }, 50);
                } catch (error) {
                    console.error("Error in diagram generation:", error);
                    aiProcess.complete();
                    if (showNotification) {
                        showNotification("Error generating diagram.", "error");
                    }
                }
            }
        });
    };

    // Toggle harmonised column visibility
    const toggleHarmonisedColumn = () => {
        // Only allow toggling if harmonisation has been performed
        if (hasHarmonisedData) {
            setShowHarmonisedColumn(prev => !prev);
        }
    };

    // Toggle diagram visibility
    const toggleDiagram = (showNotification) => {
        // Only allow toggling if diagram has been generated
        if (hasDiagramData) {
            setShowDiagram(prev => !prev);
            if (!showDiagram) {
                setIsDiagramMinimized(false); // Ensure it's not minimized when showing
            }
        } else if (showNotification) {
            showNotification("Please generate a diagram first.", "error");
        }
    };

    // Minimize/maximize diagram
    const toggleMinimizeDiagram = () => {
        setIsDiagramMinimized(prev => !prev);
    };

    return {
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
        showConfirmDialog,
        hideConfirmDialog,
        isAIThinking,
        aiProgress,
        aiMessage,
        startAIProcessing,
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
    };
};

export default useAppState;