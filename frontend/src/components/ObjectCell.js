import React from 'react';

const ObjectCell = ({
    row,
    index,
    rowSpan,
    objectCount,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragStart,
    onDragEnd,
    openPopup,
    handleClickInput,
    handleLabelChange,
    setInputRef,
    getDisplayText,
    getCellColor,
    getCellBorderStyle
}) => {
    return (
        <td
            rowSpan={rowSpan}
            style={{
                padding: "8px",
                position: "relative",
                backgroundColor: getCellColor("object", isHovered),
                transition: "background-color 0.2s ease",
                ...getCellBorderStyle(index)
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
                    backgroundColor: "#10b981",
                    borderRadius: "2px",
                    marginRight: "4px"
                }} />
                
                <div
                    draggable={!!row.parentObject}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    style={{ 
                        display: "flex", 
                        flexDirection: "column",
                        width: "100%", 
                        cursor: row.parentObject ? "grab" : "default" 
                    }}
                    className="draggable-item"
                >
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "4px" 
                    }}>
                        <span style={{ 
                            fontWeight: row.parentObject ? "500" : "400",
                            color: row.parentObject ? "#1e293b" : "#94a3b8",
                            fontSize: "0.9rem"
                        }}>
                            {row.parentObject?.label || "Unlinked"} 
                            {row.parentObject && (
                                <span style={{ 
                                    color: "#64748b", 
                                    fontSize: "0.8rem", 
                                    marginLeft: "4px" 
                                }}>
                                    ({objectCount})
                                </span>
                            )}
                        </span>
                        
                        {row.parentObject && (
                            <button 
                                onClick={() => openPopup(
                                    row.parentObject?.key, 
                                    row.parentObject?.hoverLabel || "", 
                                    row.parentObject?.label || ""
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
                                title="Edit object"
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
                        )}
                    </div>
                    
                    {row.parentObject?.hoverLabel && (
                        <div
                            onClick={() => handleClickInput(
                                row.parentObject?.key, 
                                row.parentObject?.hoverLabel || "", 
                                row.parentObject?.label || ""
                            )}
                            style={{ 
                                border: "1px solid #e2e8f0", 
                                borderRadius: "4px", 
                                padding: "6px", 
                                backgroundColor: "#f8fafc",
                                fontSize: "0.8rem",
                                color: "#475569",
                                cursor: "pointer",
                                minHeight: "24px"
                            }}
                        >
                            {getDisplayText(row.parentObject?.hoverLabel)}
                        </div>
                    )}
                    
                    {/* Hidden input for label changes */}
                    <input
                        type="text"
                        value={row.parentObject?.hoverLabel || ""}
                        onChange={(e) => handleLabelChange(e, row.parentObject?.key)}
                        style={{ display: "none" }}
                        ref={setInputRef(row.parentObject?.key)}
                    />
                </div>
            </div>
        </td>
    );
};

export default ObjectCell;