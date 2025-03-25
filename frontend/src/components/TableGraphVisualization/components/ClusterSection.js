import React from 'react';
import ObjectTable from './ObjectTable';

/**
 * Renders a single cluster section with its objects
 * Enhanced to support parent-child relationships between objects
 */
const ClusterSection = ({ 
  cluster, 
  show3NFStatus, 
  showAIRearrangement,
  isExpanded,
  toggleExpand 
}) => {
  // Find parent and child objects
  const parentObject = cluster.objects?.find(obj => obj.isParent) || null;
  const childObjects = cluster.objects?.filter(obj => obj.isChild) || [];
  const regularObjects = cluster.objects?.filter(obj => !obj.isParent && !obj.isChild) || [];
  
  // Get parent-child relationships if they exist
  const relationships = cluster.relationships || [];

  return (
    <div 
      key={`cluster-${cluster.key}`}
      style={{
        marginBottom: '30px'
      }}
    >
      {/* Cluster Header */}
      <div
        style={{
          background: showAIRearrangement 
            ? 'linear-gradient(to right, #0369a1, #0ea5e9)' 
            : 'linear-gradient(to right, #1E40AF, #3B82F6)',
          color: 'white',
          padding: '10px 15px',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          fontWeight: 'bold',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{
          width: '12px',
          height: '12px',
          backgroundColor: 'white',
          borderRadius: '50%',
          marginRight: '10px'
        }} />
        {cluster.label || 'Unnamed Cluster'}
        
        {/* If AI view, show suggested badge */}
        {showAIRearrangement && (
          <div style={{
            marginLeft: '12px',
            fontSize: '11px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '2px 8px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            AI Suggested
          </div>
        )}
      </div>
      
      {/* Description if available */}
      {cluster.hoverLabel && (
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '8px 15px',
          color: '#334155',
          fontSize: '14px',
          borderLeft: '1px solid #e2e8f0',
          borderRight: '1px solid #e2e8f0'
        }}>
          {cluster.hoverLabel}
        </div>
      )}
      
      {/* Parent-Child Hierarchy Container */}
      <div style={{ 
        padding: '20px',
        background: 'white',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        borderLeft: '1px solid #e2e8f0',
        borderRight: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        {parentObject ? (
          <div>
            {/* Parent Object - removed text header */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ObjectTable 
                  key={`parent-${parentObject.key}`}
                  object={parentObject}
                  show3NFStatus={show3NFStatus}
                  showAIRearrangement={showAIRearrangement}
                  isExpanded={isExpanded}
                  toggleExpand={toggleExpand}
                  isParent={true}
                />
              </div>
            </div>
            
            {/* Relationship Connector Line */}
            {childObjects.length > 0 && (
              <div style={{
                position: 'relative',
                height: '40px',
                margin: '10px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '2px',
                  height: '100%',
                  backgroundColor: '#60a5fa',
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: '2px',
                  backgroundColor: '#60a5fa'
                }}></div>
              </div>
            )}
            
            {/* Child Objects - removed text header */}
            {childObjects.length > 0 && (
              <div>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '20px',
                  justifyContent: 'center',
                  marginTop: '20px'
                }}>
                  {childObjects.map((object, objIndex) => (
                    <div key={`child-container-${object.key}`} style={{ position: 'relative' }}>
                      {/* Connector line from top */}
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '2px',
                        height: '20px',
                        backgroundColor: '#60a5fa'
                      }}></div>
                      
                      <ObjectTable 
                        key={`child-${object.key}`}
                        object={object}
                        show3NFStatus={show3NFStatus}
                        showAIRearrangement={showAIRearrangement}
                        isExpanded={isExpanded}
                        toggleExpand={toggleExpand}
                        isChild={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Regular objects (no parent-child hierarchy)
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '20px',
            justifyContent: 'center'
          }}>
            {cluster.objects.length > 0 ? (
              cluster.objects.map((object, objIndex) => (
                <ObjectTable 
                  key={`object-${objIndex}-${object.key}`}
                  object={object}
                  show3NFStatus={show3NFStatus}
                  showAIRearrangement={showAIRearrangement}
                  isExpanded={isExpanded}
                  toggleExpand={toggleExpand}
                />
              ))
            ) : (
              <div style={{
                padding: '15px',
                color: '#94a3b8',
                fontStyle: 'italic',
                textAlign: 'center',
                width: '100%'
              }}>
                No objects in this cluster
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClusterSection;