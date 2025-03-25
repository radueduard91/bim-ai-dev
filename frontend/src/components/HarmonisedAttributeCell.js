import React from 'react';

const HarmonisedAttributeCell = ({
    row,
    index,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    onDragOver,
    onDragLeave,
    onDrop,
    openPopup,
    handleClickInput,
    handleLabelChange,
    setInputRef,
    getDisplayText,
    getCellColor,
    getCellBorderStyle
}) => {
    // For the initial implementation, we'll use the attribute name as the harmonised attribute
    // In a real implementation, this would be populated from a different source or calculation
    const harmonisedValue = row.attr.harmonisedAttribute || `Harmonised-${row.attr.label}`;

    return (
        <td
            style={{
                padding: "8px",
                position: "relative",
                backgroundColor: getCellColor("attribute", isHovered),
                transition: "background-color 0.2s ease",
                ...getCellBorderStyle(index, false, true)
            }}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
            }}>
                {/* Left border indicator */}
                <div style={{
                    width: "4px",
                    alignSelf: "stretch",
                    backgroundColor: "#9333ea", // Purple color for harmonised attribute
                    borderRadius: "2px",
                    marginRight: "4px"
                }} />
                
                <div
                    style={{ 
                        display: "flex", 
                        flexDirection: "column",
                        width: "100%"
                    }}
                >
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "4px" 
                    }}>
                        <span style={{ 
                            fontWeight: "500",
                            color: "#1e293b",
                            fontSize: "0.9rem"
                        }}>
                            {harmonisedValue}
                        </span>
                        
                        <button 
                            onClick={() => openPopup(
                                `harmonised_${row.attr.key}`, 
                                "", 
                                harmonisedValue
                            )}
                            style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                padding: "2px",
                                borderRadius: "4px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#64748b"
                            }}
                            title="Edit harmonised attribute"
                        >
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
                            >
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Hidden input for label changes */}
                    <input
                        type="text"
                        value={harmonisedValue}
                        onChange={(e) => handleLabelChange(e, `harmonised_${row.attr.key}`)}
                        style={{ display: "none" }}
                        ref={setInputRef(`harmonised_${row.attr.key}`)}
                    />
                </div>
            </div>
        </td>
    );
};

export default HarmonisedAttributeCell;