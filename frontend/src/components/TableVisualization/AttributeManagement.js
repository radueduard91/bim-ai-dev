import React from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const addNewAttribute = async (
    graphData, 
    setGraphData, 
    fetchGraphData, 
    setConfirmPopup,
    showNotification
) => {
    setConfirmPopup({ isOpen: false });
    
    if (!graphData || !graphData.nodeDataArray) {
        if (showNotification) {
            showNotification("No data available. Please upload a file first.", "error");
        }
        return;
    }
    
    try {
        // Generate a new unique ID for the attribute
        const newAttributeKey = uuidv4();
        
        // Create new attribute object
        const newAttribute = {
            key: newAttributeKey,
            category: "attribute",
            label: "New Attribute",
            hoverLabel: "New Attribute Description",
            harmonisedAttribute: "Harmonised-New-Attribute"
        };
        
        // Create a new updated graph data object
        const updatedGraphData = {
            nodeDataArray: [...graphData.nodeDataArray, newAttribute],
            linkDataArray: [...graphData.linkDataArray]
        };
        
        // Update local state
        setGraphData(updatedGraphData);
        
        // For debugging
        console.log("Added new attribute:", newAttribute);
        console.log("Updated graph data:", updatedGraphData);
        
        // Show success notification
        if (showNotification) {
            showNotification("New attribute created successfully", "success");
        }
        
    } catch (error) {
        console.error("Error adding new Attribute:", error);
        if (showNotification) {
            showNotification("Error creating new attribute", "error");
        }
    }
};

export const handleClickInput = (inputRefs, openPopup, key, currentLabel, currentName) => {
    openPopup(key, currentLabel, currentName);
    if (inputRefs.current[key] && inputRefs.current[key].current) {
        inputRefs.current[key].current.focus();
    }
};

export const setInputRef = (inputRefs) => {
    return (key) => {
        if (!inputRefs.current[key]) {
            inputRefs.current[key] = React.createRef();
        }
        return inputRefs.current[key];
    };
};