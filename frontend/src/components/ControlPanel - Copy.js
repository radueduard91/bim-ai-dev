import React from "react";
import FileUpload from "./FileUpload";
import { buttonStyle } from "../utils/styles";

/**
 * ControlPanel component with file upload and visualization controls
 */
const ControlPanel = ({
    isLoading,
    handleFileChange,
    handleFileUpload,
    loadAttributeDescriptions,
    harmonizeAttributes,
    generateDiagram,
    toggleHarmonisedColumn,
    toggleDiagram,
    showHarmonisedColumn,
    showDiagram,
    hasHarmonisedData, // New prop to track if harmonization was done
    hasDiagramData, // New prop to track if diagram was generated
}) => {
    return (
        <div style={{
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
        }}>
            {/* Left-aligned action buttons */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap"
            }}>
                <FileUpload
                    isLoading={isLoading}
                    handleFileChange={handleFileChange}
                    handleFileUpload={handleFileUpload}
                />
                
                <button
                    onClick={loadAttributeDescriptions}
                    disabled={isLoading}
                    style={{
                        ...buttonStyle(isLoading),
                        backgroundColor: "#8b5cf6",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                    </svg>
                    Generate Definitions
                </button>
                
                {/* Harmonise Attributes Button */}
                <button
                    onClick={harmonizeAttributes}
                    disabled={isLoading}
                    style={{
                        ...buttonStyle(isLoading),
                        backgroundColor: "#06b6d4",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    Harmonise Attributes
                </button>
                
                {/* Generate Diagram Button */}
                <button
                    onClick={generateDiagram}
                    disabled={isLoading}
                    style={{
                        ...buttonStyle(isLoading),
                        backgroundColor: "#3b82f6",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path
                            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                        ></path>
                    </svg>
                    Generate Diagram
                </button>
            </div>
            
            {/* Right-aligned toggle buttons */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginLeft: "auto" // This ensures right alignment
            }}>
                {/* Show Harmonised Button - Icon only */}
                <button
                    onClick={toggleHarmonisedColumn}
                    disabled={isLoading || !hasHarmonisedData}
                    style={{
                        ...buttonStyle(isLoading || !hasHarmonisedData),
                        backgroundColor: hasHarmonisedData ? (showHarmonisedColumn ? "#06b6d4" : "#475569") : "#cbd5e1",
                        width: "40px",
                        minWidth: "40px",
                        justifyContent: "center",
                        padding: "0",
                    }}
                    title={showHarmonisedColumn ? "Hide Harmonised" : "Show Harmonised"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                
                {/* Show Diagram Button - Icon only */}
                <button
                    onClick={toggleDiagram}
                    disabled={isLoading || !hasDiagramData}
                    style={{
                        ...buttonStyle(isLoading || !hasDiagramData),
                        backgroundColor: hasDiagramData ? (showDiagram ? "#3b82f6" : "#475569") : "#cbd5e1",
                        width: "40px",
                        minWidth: "40px",
                        justifyContent: "center",
                        padding: "0",
                    }}
                    title={showDiagram ? "Hide Diagram" : "Show Diagram"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path
                            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;