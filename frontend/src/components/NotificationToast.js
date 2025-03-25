import React from "react";

const NotificationToast = ({ notification, showDiagram, isDiagramMinimized }) => {
    const getBackgroundColor = (type) => {
        switch (type) {
            case "error": return "#ef4444";
            case "success": return "#10b981";
            default: return "#3b82f6";
        }
    };
    
    return (
        <div style={{
            position: "fixed",
            bottom: "20px",
            right: showDiagram && !isDiagramMinimized ? "840px" : "20px",
            padding: "12px 20px",
            backgroundColor: getBackgroundColor(notification.type),
            color: "white",
            borderRadius: "6px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            maxWidth: "400px",
            animation: "slideIn 0.3s ease-out"
        }}>
            {notification.message}
        </div>
    );
};

export default NotificationToast;