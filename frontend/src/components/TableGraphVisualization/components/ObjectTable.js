import React from 'react';
import AttributeRow from './AttributeRow';

/**
 * Renders an individual object table with its harmonized attributes
 * Enhanced to support parent-child visualization
 */
const ObjectTable = ({ 
  object, 
  show3NFStatus, 
  showAIRearrangement,
  isExpanded,
  toggleExpand,
  isParent = false,
  isChild = false
}) => {
  // Determine border color and style based on parent/child status
  const getBorderStyle = () => {
    if (isParent) {
      return {
        border: '2px solid #2563eb',
        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
      };
    } else if (isChild) {
      return {
        border: '2px solid #60a5fa',
        boxShadow: '0 4px 8px rgba(96, 165, 250, 0.2)'
      };
    }
    return {
      border: showAIRearrangement ? '1px solid #0ea5e9' : '1px solid #e2e8f0'
    };
  };

  // Get background color for table header
  const getHeaderBackground = () => {
    if (isParent) {
      return '#2563eb'; // Darker blue for parent
    } else if (isChild) {
      return '#60a5fa'; // Lighter blue for child
    }
    return showAIRearrangement ? '#0ea5e9' : '#10B981'; // Default colors
  };

  // Get table badge based on parent/child status
  const getTableBadge = () => {
    if (isParent) {
      return (
        <div style={{
          fontSize: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '2px 6px',
          borderRadius: '4px',
          fontWeight: 'normal'
        }}>
          Parent
        </div>
      );
    } else if (isChild) {
      return (
        <div style={{
          fontSize: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '2px 6px',
          borderRadius: '4px',
          fontWeight: 'normal'
        }}>
          Child
        </div>
      );
    } else if (showAIRearrangement) {
      return (
        <div style={{
          fontSize: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '2px 6px',
          borderRadius: '4px',
          fontWeight: 'normal'
        }}>
          AI Created
        </div>
      );
    }
    return null;
  };

  // Set table width based on parent/child status
  const getTableWidth = () => {
    if (isParent) {
      return '350px'; // Wider table for parent
    }
    return '280px'; // Default width for others
  };

  return (
    <div 
      style={{
        width: getTableWidth(),
        overflow: 'hidden',
        borderRadius: '6px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        ...getBorderStyle(),
        maxHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        position: 'relative'
      }}
    >
      {/* Table Header */}
      <div style={{
        background: getHeaderBackground(),
        color: 'white',
        padding: '8px 12px',
        fontWeight: 'bold',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'space-between'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '0',
            height: '0',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '12px solid white'
          }} />
          {object.label || 'Unnamed Object'}
        </div>
        
        {/* Show badge based on parent/child status */}
        {getTableBadge()}
      </div>
      
      {/* Object Description */}
      {object.hoverLabel && (
        <div style={{
          padding: '6px 12px',
          fontSize: '12px',
          color: '#64748b',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          {object.hoverLabel}
        </div>
      )}
      
      {/* Harmonized Attributes with 3NF status */}
      <div style={{
        maxHeight: '400px',
        overflowY: 'auto',
        flex: '1'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '12px'
        }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{
                padding: '10px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #e2e8f0',
                color: '#334155',
                position: 'sticky',
                top: 0,
                background: '#f1f5f9',
                zIndex: 1
              }}>
                Harmonized Attribute
              </th>
              {show3NFStatus && (
                <th style={{
                  padding: '10px 16px',
                  textAlign: 'center',
                  borderBottom: '1px solid #e2e8f0',
                  color: '#334155',
                  position: 'sticky',
                  top: 0,
                  background: '#f1f5f9',
                  zIndex: 1,
                  width: '80px'
                }}>
                  3NF
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {object.harmonizedAttributes && object.harmonizedAttributes.length > 0 ? (
              object.harmonizedAttributes.map((attr, attrIndex) => (
                <AttributeRow 
                  key={`attr-${attrIndex}-${attr.name}`}
                  attr={attr}
                  objectKey={object.key}
                  attrIndex={attrIndex}
                  show3NFStatus={show3NFStatus}
                  showAIRearrangement={showAIRearrangement}
                  isExpanded={isExpanded}
                  toggleExpand={toggleExpand}
                />
              ))
            ) : (
              <tr>
                <td 
                  colSpan={show3NFStatus ? 2 : 1}
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    color: '#94a3b8'
                  }}
                >
                  No harmonized attributes available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ObjectTable;