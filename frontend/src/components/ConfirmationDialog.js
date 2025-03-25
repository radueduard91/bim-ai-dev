import React from 'react';

const ConfirmationDialog = ({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel }) => {
  console.log("ConfirmationDialog rendering with props:", { isOpen, title, message });
  
  if (!isOpen) {
    console.log("Dialog not open, returning null");
    return null;
  }
  
  console.log("Dialog is open, rendering content");
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        maxWidth: '500px',
        width: '100%',
        animation: 'scaleIn 0.2s ease-out'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '8px'
        }}>{title}</h3>
        
        <p style={{
          color: '#4b5563',
          marginBottom: '24px'
        }}>{message}</p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button 
            onClick={() => {
              console.log("Cancel button clicked");
              if (typeof onCancel === 'function') {
                onCancel();
              }
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e5e7eb',
              color: '#1f2937',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {cancelText || "Cancel"}
          </button>
          
          <button 
            onClick={() => {
              console.log("Confirm button clicked");
              if (typeof onConfirm === 'function') {
                onConfirm();
              }
            }}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(to right, #e11d48, #ef4444)',
              color: 'white',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {confirmText || "Confirm"}
          </button>
        </div>
      </div>
      <style>
        {`
          @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default ConfirmationDialog;