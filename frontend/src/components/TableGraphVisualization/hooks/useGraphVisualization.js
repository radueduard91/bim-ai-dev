import { useState, useEffect, useMemo } from 'react';
import { 
  organizeDataForVisualization, 
  organizeDataForAIRearrangement 
} from '../utils/dataOrganizer';

/**
 * Custom hook to manage graph visualization state and data processing
 */
const useGraphVisualization = (graphData) => {
  // State for view modes and data
  const [processedData, setProcessedData] = useState([]);
  const [aiProcessedData, setAIProcessedData] = useState([]);
  const [show3NFStatus, setShow3NFStatus] = useState(false);
  const [showAIRearrangement, setShowAIRearrangement] = useState(false);
  const [expandedAttributes, setExpandedAttributes] = useState({});
  const [showDefinitions, setShowDefinitions] = useState(false);

  // Process graph data when it changes
  useEffect(() => {
    if (graphData && graphData.nodeDataArray && graphData.linkDataArray) {
      try {
        // Process original data organization
        const organized = organizeDataForVisualization(graphData);
        setProcessedData(organized);
        
        // Process AI-rearranged data
        const aiOrganized = organizeDataForAIRearrangement(graphData);
        setAIProcessedData(aiOrganized);
        
        // Reset expanded state when data changes
        setExpandedAttributes({});
      } catch (error) {
        console.error('Error processing graph data:', error);
        setProcessedData([]);
        setAIProcessedData([]);
      }
    }
  }, [graphData]);

  // Toggle 3NF compliance check display
  const toggle3NFCheck = () => {
    setShow3NFStatus(prev => !prev);
  };
  
  // Toggle AI rearrangement display
  const toggleAIRearrangement = () => {
    setShowAIRearrangement(prev => !prev);
    
    // Reset expanded state when switching views
    if (!showAIRearrangement) {
      setExpandedAttributes({});
    }
  };

  // Toggle show definitions
  const toggleShowDefinitions = () => {
    setShowDefinitions(prev => !prev);
  };

  // Toggle expand/collapse for an attribute
  const toggleExpand = (objectKey, attrName) => {
    setExpandedAttributes(prev => {
      const key = `${objectKey}-${attrName}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  // Check if an attribute is expanded
  const isExpanded = (objectKey, attrName) => {
    const key = `${objectKey}-${attrName}`;
    return !!expandedAttributes[key];
  };
  
  // Download VP Template function
  const handleDownloadTemplate = () => {
    try {
      // API endpoint URL
      const templateUrl = 'http://localhost:8000/api/templates/ai_template.xlsx';
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = templateUrl;
      link.download = 'AI VP Template.xlsx'; // File name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Template download initiated');
    } catch (error) {
      console.error('Error downloading template:', error);
      // Fallback method if direct download doesn't work
      window.open('http://localhost:8000/api/templates/ai_template.xlsx', '_blank');
    }
  };

  return {
    processedData,
    aiProcessedData,
    show3NFStatus,
    showAIRearrangement,
    showDefinitions,
    toggleAIRearrangement,
    toggle3NFCheck,
    toggleShowDefinitions,
    isExpanded,
    toggleExpand,
    handleDownloadTemplate
  };
};

export default useGraphVisualization;