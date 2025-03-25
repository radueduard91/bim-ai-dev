import React from 'react';

/**
 * Renders an individual attribute row with expansion capabilities
 */
const AttributeRow = ({ 
  attr, 
  objectKey, 
  attrIndex, 
  show3NFStatus, 
  showAIRearrangement,
  isExpanded,
  toggleExpand 
}) => {
  // Determine if this attribute is expanded
  const expanded = isExpanded(objectKey, attr.name);

  return (
    <>
      <tr 
        style={{
          background: attrIndex % 2 === 0 ? 'white' : '#f8fafc',
          cursor: 'pointer'
        }}
        onClick={() => toggleExpand(objectKey, attr.name)}
      >
        <td style={{
          padding: '8px 16px',
          borderBottom: '1px solid #e2e8f0',
          color: showAIRearrangement ? '#0c4a6e' : '#9333ea',
          fontWeight: '500',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '3px',
                height: '14px',
                background: showAIRearrangement ? '#0ea5e9' : '#9333ea',
                borderRadius: '1px'
              }} />
              {attr.name}
              
              {/* If rearranged, show this is moved */}
              {showAIRearrangement && attr.moved && (
                <div style={{
                  fontSize: '9px',
                  backgroundColor: 'rgba(14, 165, 233, 0.1)',
                  color: '#0284c7',
                  padding: '1px 4px',
                  borderRadius: '2px',
                  marginLeft: '4px'
                }}>
                  Moved
                </div>
              )}
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ 
                transition: 'transform 0.2s ease',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                opacity: 0.6
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </td>
        {show3NFStatus && (
          <td style={{
            padding: '8px 16px',
            borderBottom: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            {attr.is3NF ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                color: '#10b981'
              }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                color: '#ef4444'
              }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            )}
          </td>
        )}
      </tr>
      
      {/* Expanded details showing original attributes */}
      {expanded && (
        <tr>
          <td colSpan={show3NFStatus ? 2 : 1} style={{
            padding: '0',
            backgroundColor: showAIRearrangement 
              ? 'rgba(14, 165, 233, 0.05)' 
              : 'rgba(147, 51, 234, 0.05)',
            border: showAIRearrangement 
              ? '1px solid rgba(14, 165, 233, 0.1)' 
              : '1px solid rgba(147, 51, 234, 0.1)',
            borderTop: 'none'
          }}>
            <div style={{
              padding: '8px 12px 8px 28px'
            }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 'bold',
                color: showAIRearrangement ? '#0284c7' : '#9333ea',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>Original Attributes ({attr.originalAttributes.length})</div>
                {show3NFStatus && (
                  <div style={{
                    backgroundColor: attr.is3NF ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: attr.is3NF ? '#059669' : '#b91c1c',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '9px',
                    marginRight: '8px'
                  }}>
                    {attr.is3NF ? '3NF Compliant' : 'Not 3NF Compliant'}
                  </div>
                )}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#64748b'
              }}>
                <ul style={{
                  margin: '0',
                  paddingLeft: '16px'
                }}>
                  {attr.originalAttributes.map((original, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      {original}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Show original location if moved */}
              {showAIRearrangement && attr.originalObject && (
                <div style={{
                  marginTop: '8px',
                  padding: '6px 8px',
                  backgroundColor: 'rgba(14, 165, 233, 0.1)',
                  borderRadius: '4px',
                  fontSize: '10px',
                  color: '#0284c7'
                }}>
                  <strong>Moved From:</strong> {attr.originalObject}
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default AttributeRow;