import React, { useEffect } from "react";
import TableGraphVisualization from "./TableGraphVisualization";
import { buttonStyle } from "../utils/styles";

/**
 * DiagramPopup Component
 * Renders a popup window with the diagram visualization
 */
const DiagramPopup = ({
    graphData,
    dimensions,
    setDimensions,
    isDiagramMinimized,
    toggleMinimizeDiagram,
    toggleDiagram,
    hideControlButtons = false
}) => {
    // Set full screen dimensions when component mounts
    useEffect(() => {
        // Set dimensions to full screen (minus margins)
        setDimensions({
            width: `${window.innerWidth - 40}px`,
            height: `${window.innerHeight - 40}px`
        });
    }, []);

    // Resize handler for the diagram
    const handleResize = (direction, value) => {
        if (direction === "width") {
            setDimensions({ ...dimensions, width: `${value}px` });
        } else if (direction === "height") {
            setDimensions({ ...dimensions, height: `${value}px` });
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: "20px",
                left: "20px",
                right: "20px",
                bottom: "20px",
                width: isDiagramMinimized ? "280px" : "auto",
                height: isDiagramMinimized ? "40px" : "auto",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                zIndex: 100,
            }}
        >
            {/* Diagram Header */}
            <div
                style={{
                    padding: "8px 12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: isDiagramMinimized ? "none" : "1px solid #e2e8f0",
                    backgroundColor: "#1e40af",
                    color: "white",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "500",
                        fontSize: "14px",
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
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Relationship Diagram
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                    {/* Minimize/Maximize Button */}
                    <button
                        onClick={toggleMinimizeDiagram}
                        style={{
                            ...buttonStyle(false),
                            padding: "4px",
                            minWidth: "24px",
                            height: "24px",
                            backgroundColor: "transparent",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
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
                            {isDiagramMinimized ? (
                                <>
                                    <polyline points="6 15 12 9 18 15"></polyline>
                                </>
                            ) : (
                                <>
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </>
                            )}
                        </svg>
                    </button>
                    {/* Close Button */}
                    <button
                        onClick={toggleDiagram}
                        style={{
                            ...buttonStyle(false),
                            padding: "4px",
                            minWidth: "24px",
                            height: "24px",
                            backgroundColor: "transparent",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
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
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Diagram Content */}
            {!isDiagramMinimized && (
                <div
                    style={{
                        flex: "1",
                        overflow: "auto",
                        position: "relative",
                    }}
                >
                    <TableGraphVisualization
                        graphData={graphData}
                        dimensions={{
                            width: "100%",
                            height: "100%",
                        }}
                        hideControlButtons={hideControlButtons} // Pass the prop to hide control buttons
                    />
                </div>
            )}

            {/* Resize Handle */}
            {!isDiagramMinimized && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        width: "20px",
                        height: "20px",
                        cursor: "nwse-resize",
                        background: "transparent",
                    }}
                    onMouseDown={(e) => {
                        const startX = e.clientX;
                        const startY = e.clientY;
                        const startWidth = parseInt(dimensions.width);
                        const startHeight = parseInt(dimensions.height);

                        const onMouseMove = (e) => {
                            const newWidth = startWidth + e.clientX - startX;
                            const newHeight = startHeight + e.clientY - startY;
                            handleResize("width", Math.max(400, newWidth)); // Min width 400px
                            handleResize("height", Math.max(300, newHeight)); // Min height 300px
                        };

                        const onMouseUp = () => {
                            document.removeEventListener("mousemove", onMouseMove);
                            document.removeEventListener("mouseup", onMouseUp);
                        };

                        document.addEventListener("mousemove", onMouseMove);
                        document.addEventListener("mouseup", onMouseUp);
                    }}
                />
            )}
        </div>
    );
};

export default DiagramPopup;