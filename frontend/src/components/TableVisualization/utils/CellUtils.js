/**
 * Utility functions for cell rendering and styling
 */

// Function to get cell color based on category and hover state
export const getCellColor = (category, isHovered) => {
    if (isHovered) {
        switch (category) {
            case "system": return "#dbeafe"; // Light blue
            case "object": return "#dcfce7"; // Light green
            case "attribute": return "#fce7f3"; // Light pink
            case "harmonised": return "#f3e8ff"; // Light purple
            default: return "#f8fafc"; // Light gray
        }
    }
    
    return "transparent";
};

// Function to get cell border style
export const getCellBorderStyle = (rowIndex, isFirst = false, isLast = false) => {
    return {
        borderBottom: "1px solid #e2e8f0",
        borderRight: "1px solid #e2e8f0", 
        borderLeft: isFirst ? "1px solid #e2e8f0" : "none",
        borderTop: rowIndex === 0 ? "1px solid #e2e8f0" : "none"
    };
};