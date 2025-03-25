import React from 'react';

const ConfirmationPopup = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1001,
            backdropFilter: "blur(2px)"
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                maxWidth: "400px",
                textAlign: "center"
            }}>
                <h3 style={{ 
                    margin: "0 0 16px 0", 
                    color: "#1e293b", 
                    fontSize: "1.1rem" 
                }}>
                    {title}
                </h3>
                <p style={{ 
                    margin: "0 0 20px 0", 
                    color: "#475569", 
                    fontSize: "0.9rem" 
                }}>
                    {message}
                </p>
                <div style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    gap: "12px" 
                }}>
                    <button 
                        onClick={onConfirm}
                        style={{
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "4px",
                            backgroundColor: "#1e40af",
                            color: "white",
                            fontSize: "0.875rem",
                            cursor: "pointer"
                        }}
                    >
                        Yes, Create Attribute
                    </button>
                    <button 
                        onClick={onCancel}
                        style={{
                            padding: "8px 16px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "4px",
                            backgroundColor: "white",
                            color: "#475569",
                            fontSize: "0.875rem",
                            cursor: "pointer"
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;