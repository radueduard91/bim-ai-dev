import React from 'react';
import useGraphVisualization from './hooks/useGraphVisualization';
import ViewControls from './components/ViewControls';
import ClusterSection from './components/ClusterSection';
import NoDataPlaceholder from './components/NoDataPlaceholder';

/**
 * TableGraphVisualization - A component that visualizes graph data as tables
 * with 3NF compliance checks and AI-powered attribute rearrangement
 */
const TableGraphVisualization = ({ graphData, dimensions }) => {
  const {
    processedData,
    aiProcessedData,
    show3NFStatus,
    showAIRearrangement,
    toggleAIRearrangement,
    toggle3NFCheck,
    isExpanded,
    toggleExpand,
    handleDownloadTemplate
  } = useGraphVisualization(graphData);

  // Calculate container styles based on dimensions
  const containerStyle = {
    width: dimensions?.width || '100%', 
    height: dimensions?.height || '600px',
    padding: '10px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    overflow: 'auto',
    maxHeight: dimensions?.height || '600px',
    position: 'relative',
    boxSizing: 'border-box'
  };

  // Determine which data to display
  const activeData = showAIRearrangement ? aiProcessedData : processedData;

  // No data scenario
  if (!graphData || !processedData.length) {
    return <NoDataPlaceholder containerStyle={containerStyle} />;
  }

  return (
    <div style={containerStyle}>
      {/* View Controls */}
      <ViewControls 
        show3NFStatus={show3NFStatus}
        showAIRearrangement={showAIRearrangement}
        toggle3NFCheck={toggle3NFCheck}
        toggleAIRearrangement={toggleAIRearrangement}
        handleDownloadTemplate={handleDownloadTemplate}
      />

      {/* Clusters and Objects Rendering */}
      {activeData.map((cluster, index) => (
        <ClusterSection 
          key={`cluster-${index}-${cluster.key}`}
          cluster={cluster}
          show3NFStatus={show3NFStatus}
          showAIRearrangement={showAIRearrangement}
          isExpanded={isExpanded}
          toggleExpand={toggleExpand}
        />
      ))}
    </div>
  );
};

export default TableGraphVisualization;