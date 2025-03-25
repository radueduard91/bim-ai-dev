import React from 'react';

/**
 * Component for rendering the table header with sortable columns
 */
const TableHeader = ({ 
    sortConfig, 
    handleSort, 
    setConfirmPopup, 
    showHarmonisedColumn,
    showNotification 
}) => {
    return (
        <thead>
            <tr style={{ backgroundColor: "#f1f5f9" }}>
                {/* Cluster Column Header */}
                <th 
                    style={{ 
                        padding: "12px 8px", 
                        textAlign: "left", 
                        borderBottom: "2px solid #e2e8f0", 
                        color: "#1e293b",
                        fontWeight: "600",
                        width: showHarmonisedColumn ? "20%" : "30%",
                        cursor: "pointer"
                    }}
                    onClick={() => handleSort('cluster')}
                >
                    Cluster 
                    {sortConfig.key === 'cluster' && (
                        <span style={{ marginLeft: '4px' }}>
                            {sortConfig.direction === 'asc' ? '▲' : '▼'}
                        </span>
                    )}
                </th>

                {/* Object Column Header */}
                <th 
                    style={{ 
                        padding: "12px 8px", 
                        textAlign: "left", 
                        borderBottom: "2px solid #e2e8f0", 
                        color: "#1e293b",
                        fontWeight: "600",
                        width: showHarmonisedColumn ? "20%" : "30%",
                        cursor: "pointer"
                    }}
                    onClick={() => handleSort('object')}
                >
                    Object 
                    {sortConfig.key === 'object' && (
                        <span style={{ marginLeft: '4px' }}>
                            {sortConfig.direction === 'asc' ? '▲' : '▼'}
                        </span>
                    )}
                </th>

                {/* Attribute Column Header */}
                <th 
                    style={{ 
                        padding: "12px 8px", 
                        textAlign: "left", 
                        borderBottom: "2px solid #e2e8f0", 
                        color: "#1e293b",
                        fontWeight: "600",
                        width: showHarmonisedColumn ? "30%" : "40%",
                        cursor: "pointer",
                        position: "relative"
                    }}
                    onClick={() => handleSort('attribute')}
                >
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center" 
                    }}>
                        <span>
                            Attribute 
                            {sortConfig.key === 'attribute' && (
                                <span style={{ marginLeft: '4px' }}>
                                    {sortConfig.direction === 'asc' ? '▲' : '▼'}
                                </span>
                            )}
                        </span>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setConfirmPopup({ isOpen: true, showNotification });
                            }} 
                            title="Add new attribute"
                            style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: "#1e40af",
                                color: "white",
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.1rem",
                                lineHeight: 1,
                                cursor: "pointer",
                                marginLeft: "8px"
                            }}
                        >
                            +
                        </button>
                    </div>
                </th>
                
                {/* Harmonised Attribute Column Header - Only shown when toggled */}
                {showHarmonisedColumn && (
                    <th 
                        style={{ 
                            padding: "12px 8px", 
                            textAlign: "left", 
                            borderBottom: "2px solid #e2e8f0", 
                            color: "#1e293b",
                            fontWeight: "600",
                            width: "30%",
                            cursor: "pointer"
                        }}
                        onClick={() => handleSort('harmonisedAttribute')}
                    >
                        Harmonised Attribute
                        {sortConfig.key === 'harmonisedAttribute' && (
                            <span style={{ marginLeft: '4px' }}>
                                {sortConfig.direction === 'asc' ? '▲' : '▼'}
                            </span>
                        )}
                    </th>
                )}
            </tr>
        </thead>
    );
};

export default TableHeader;