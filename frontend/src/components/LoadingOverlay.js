import React from "react";

const LoadingOverlay = () => {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1001
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center"
            }}>
                <div style={{
                    border: "4px solid #f3f4f6",
                    borderTopColor: "#3b82f6",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    margin: "0 auto 12px auto",
                    animation: "spin 1s linear infinite"
                }}></div>
                <p style={{ margin: 0, color: "#1e293b" }}>Loading...</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;