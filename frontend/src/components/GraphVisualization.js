import React, { useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';

// Utility function to safely stringify objects for logging
const safeStringify = (obj) => {
  try {
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (value.$$typeof) return '[React Element]';
        return value;
      }
      return value;
    }, 2);
  } catch (error) {
    return 'Unable to stringify object';
  }
};

// Cluster Node Component
const ClusterNode = ({ data }) => {
  // Validate data prop
  if (!data || typeof data !== 'object') {
    console.error('Invalid data prop for ClusterNode:', safeStringify(data));
    return null;
  }

  return (
    <div className="cluster-node" 
      style={{
        padding: '10px',
        borderRadius: '5px',
        background: 'linear-gradient(to bottom, #1E40AF, #3B82F6)',
        color: 'white',
        width: '180px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '2px solid #1E3A8A'
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ 
          width: '16px', 
          height: '16px', 
          borderRadius: '50%', 
          backgroundColor: 'white' 
        }}></div>
        <div style={{
          fontWeight: 'bold',
          fontSize: '14px',
          textAlign: 'center'
        }}>{data.label || 'Unnamed Cluster'}</div>
      </div>
      {data.hoverLabel && (
        <div style={{
          marginTop: '8px',
          fontSize: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '4px',
          borderRadius: '3px'
        }}>{data.hoverLabel}</div>
      )}
    </div>
  );
};

// Object Node as Table Component
const ObjectTableNode = ({ data }) => {
  // Validate data prop
  if (!data || typeof data !== 'object') {
    console.error('Invalid data prop for ObjectTableNode:', safeStringify(data));
    return null;
  }

  // Ensure harmonizedAttributes is an array with safe conversion
  const harmonizedAttributes = Array.isArray(data.harmonizedAttributes) 
    ? data.harmonizedAttributes 
    : [];

  // Validate each attribute
  const validAttributes = harmonizedAttributes.map((attr, index) => {
    // Ensure attr is an object
    if (typeof attr !== 'object' || attr === null) {
      console.warn(`Invalid attribute at index ${index}:`, safeStringify(attr));
      return {
        label: 'Invalid Attribute',
        value: 'N/A'
      };
    }

    return {
      label: typeof attr.label === 'string' ? attr.label : 'Unknown',
      value: typeof attr.value === 'string' ? attr.value : 'N/A'
    };
  });
  
  return (
    <div className="object-table-node"
      style={{
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: 'white',
        color: '#1e293b',
        minWidth: '280px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '2px solid #10B981'
      }}>
      {/* Table Header */}
      <div style={{
        backgroundColor: '#10B981',
        color: 'white',
        padding: '8px 12px',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderBottom: '14px solid white'
        }}></div>
        <div style={{
          fontWeight: 'bold',
          fontSize: '14px'
        }}>{data.label || 'Unnamed Object'}</div>
      </div>
      
      {/* Table Description if available */}
      {data.hoverLabel && (
        <div style={{
          fontSize: '12px',
          padding: '0 8px 8px 8px',
          color: '#64748b',
          borderBottom: '1px solid #e2e8f0'
        }}>{data.hoverLabel}</div>
      )}
      
      {/* Harmonized Attributes Table */}
      <div style={{ marginTop: '8px', maxHeight: '200px', overflowY: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '12px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ 
                padding: '6px 8px', 
                textAlign: 'left', 
                borderBottom: '1px solid #e2e8f0' 
              }}>Attribute</th>
              <th style={{ 
                padding: '6px 8px', 
                textAlign: 'left', 
                borderBottom: '1px solid #e2e8f0' 
              }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {validAttributes.length > 0 ? (
              validAttributes.map((attr, index) => (
                <tr key={index} style={{ 
                  backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc'
                }}>
                  <td style={{ 
                    padding: '6px 8px', 
                    borderBottom: '1px solid #e2e8f0',
                    color: '#8B5CF6',
                    fontWeight: 500
                  }}>{attr.label}</td>
                  <td style={{ 
                    padding: '6px 8px', 
                    borderBottom: '1px solid #e2e8f0'
                  }}>{attr.value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ 
                  padding: '8px', 
                  textAlign: 'center',
                  color: '#94a3b8'
                }}>No attributes available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Define node types
const nodeTypes = {
  cluster: ClusterNode,
  objectTable: ObjectTableNode
};

const GraphVisualization = ({ graphData, dimensions, onInit }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Process graph data to create React Flow nodes and edges
  useEffect(() => {
    // Log the entire graphData for debugging
    console.log('Raw Graph Data:', safeStringify(graphData));

    if (graphData && graphData.nodeDataArray && graphData.linkDataArray) {
      try {
        // Process the data to group harmonized attributes by object
        const processedData = processGraphData(graphData);
        
        // Log processed data for debugging
        console.log('Processed Nodes:', safeStringify(processedData.nodes));
        console.log('Processed Edges:', safeStringify(processedData.edges));
        
        setNodes(processedData.nodes);
        setEdges(processedData.edges);
      } catch (error) {
        console.error('Error processing graph data:', error);
      }
    }
  }, [graphData]);

  // Process graph data to create table view
  const processGraphData = (data) => {
    if (!data || !data.nodeDataArray || !data.linkDataArray) {
      console.error('Invalid graph data structure:', safeStringify(data));
      return { nodes: [], edges: [] };
    }

    const originalNodes = [...data.nodeDataArray];
    const originalLinks = [...data.linkDataArray];
    
    // Extract nodes by type
    const clusters = originalNodes.filter(node => node.category === "system");
    const objects = originalNodes.filter(node => node.category === "object");
    const attributes = originalNodes.filter(node => node.category === "attribute");
    
    // Create a mapping of object keys to their harmonized attributes
    const objectToHarmonizedAttributes = {};
    
    // First, find all links from objects to attributes
    originalLinks.forEach(link => {
      const sourceNode = originalNodes.find(node => node.key === link.from);
      const targetNode = originalNodes.find(node => node.key === link.to);
      
      if (sourceNode && targetNode && 
          sourceNode.category === "object" && 
          targetNode.category === "attribute") {
        
        if (!objectToHarmonizedAttributes[sourceNode.key]) {
          objectToHarmonizedAttributes[sourceNode.key] = [];
        }
        
        // Get the harmonized attribute name
        const harmonizedName = targetNode.harmonisedAttribute || `Harmonised-${targetNode.label}`;
        
        // Add to the object's harmonized attributes if not already present
        const existingAttr = objectToHarmonizedAttributes[sourceNode.key]
          .find(attr => attr.label === harmonizedName);
          
        if (!existingAttr) {
          objectToHarmonizedAttributes[sourceNode.key].push({
            label: harmonizedName || 'Unknown',
            originalAttribute: targetNode.label || 'Unknown',
            hoverLabel: targetNode.hoverLabel || '',
            value: targetNode.hoverLabel || 'Sample Value'
          });
        }
      }
    });
    
    // Create flow nodes
    const flowNodes = [];
    
    // Position variables
    let yPosition = 0;
    const LEVEL_HEIGHT = 300;
    const NODE_WIDTH = 280;
    
    // Add cluster nodes (top level)
    let clusterPositions = {};
    clusters.forEach((cluster, index) => {
      const xPosition = (index * NODE_WIDTH * 1.5) - ((clusters.length - 1) * NODE_WIDTH * 0.75);
      const nodeId = cluster.key;
      
      flowNodes.push({
        id: nodeId,
        type: 'cluster',
        position: { x: xPosition, y: yPosition },
        data: { 
          label: cluster.label || 'Unnamed Cluster',
          hoverLabel: cluster.hoverLabel || ''
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top
      });
      
      clusterPositions[nodeId] = xPosition;
    });
    
    // Move to next level for object tables
    yPosition += LEVEL_HEIGHT;
    
    // First, organize objects by their parent cluster
    const objectsByCluster = {};
    originalLinks.forEach(link => {
      const sourceNode = originalNodes.find(node => node.key === link.from);
      const targetNode = originalNodes.find(node => node.key === link.to);
      
      if (sourceNode && targetNode && 
          sourceNode.category === "system" && 
          targetNode.category === "object") {
        if (!objectsByCluster[sourceNode.key]) {
          objectsByCluster[sourceNode.key] = [];
        }
        objectsByCluster[sourceNode.key].push(targetNode);
      }
    });
    
    // Create flow edges
    const flowEdges = [];
    
    // Add object table nodes (bottom level)
    Object.entries(objectsByCluster).forEach(([clusterId, clusterObjects]) => {
      const clusterXPosition = clusterPositions[clusterId];
      const objectCount = clusterObjects.length;
      
      clusterObjects.forEach((object, index) => {
        // Position objects below their parent cluster, with spacing
        const xOffset = ((index - (objectCount - 1) / 2) * NODE_WIDTH * 1.5);
        const xPosition = clusterXPosition + xOffset;
        const nodeId = object.key;
        
        flowNodes.push({
          id: nodeId,
          type: 'objectTable',
          position: { x: xPosition, y: yPosition },
          data: { 
            label: object.label || 'Unnamed Object',
            hoverLabel: object.hoverLabel || '',
            harmonizedAttributes: objectToHarmonizedAttributes[nodeId] || []
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top
        });
        
        // Add edge from cluster to object
        flowEdges.push({
          id: `${clusterId}-${nodeId}`,
          source: clusterId,
          target: nodeId,
          animated: false,
          style: { stroke: '#555', strokeWidth: 2 },
          type: 'smoothstep'
        });
      });
    });
    
    return { nodes: flowNodes, edges: flowEdges };
  };

  // Handle on init to pass back React Flow instance
  const handleInit = (reactFlowInstance) => {
    if (onInit) {
      onInit(reactFlowInstance);
    }
    
    // Fit view
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.2 });
    }, 100);
  };

  return (
    <div style={{ 
      width: dimensions?.width || '100%', 
      height: dimensions?.height || '600px', 
      border: '1px solid #e2e8f0',
      borderRadius: '8px'
    }}>
      {graphData ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          onInit={handleInit}
          minZoom={0.2}
          maxZoom={2}
        >
          <Controls />
          <MiniMap 
            nodeStrokeWidth={3}
            zoomable
            pannable
            nodeColor={(node) => {
              if (node.type === 'cluster') return '#3B82F6';
              return '#10B981';
            }}
          />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      ) : (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "#64748b",
          fontSize: "16px",
          fontStyle: "italic",
          background: "#f8fafc"
        }}>
          Graph will be displayed here after uploading a file.
        </div>
      )}
    </div>
  );
};

export default GraphVisualization;