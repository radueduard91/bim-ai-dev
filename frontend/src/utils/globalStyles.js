import React from "react";

const GlobalStyles = () => {
    return (
        <style>
            {`
                @keyframes slideIn {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes scale-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out forwards;
                }
                
                .animate-scale-in {
                    animation: scale-in 0.2s ease-out forwards;
                }
                
                .animate-pulse {
                    animation: pulse 2s infinite;
                }
                
                .animate-bounce {
                    animation: bounce 1.2s infinite;
                }
                
                @media (max-width: 767px) {
                    .app-container {
                        padding-top: 48px;
                    }
                }
                
                .draggable-item {
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                
                .draggable-item:hover {
                    opacity: 0.95;
                }
                
                .draggable-item.dragging {
                    cursor: grabbing;
                    transform: scale(0.98);
                    opacity: 0.8;
                }
                
                .drop-target {
                    background-color: rgba(59, 130, 246, 0.1) !important;
                    box-shadow: inset 0 0 0 2px #3b82f6;
                    transition: all 0.2s ease;
                }
            `}
        </style>
    );
};

export default GlobalStyles;