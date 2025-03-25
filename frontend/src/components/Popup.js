import React, { useRef, useEffect, useCallback } from "react";

const Popup = ({ isOpen, nodeName, label, onChangeName, onChangeLabel, onSave, onClose }) => {
  const popupRef = useRef(null);
  const nameInputRef = useRef(null);
  const labelInputRef = useRef(null);
  const overlayRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [popupRef]);

  const handleClickInside = useCallback((event) => {
    if (popupRef.current && event.target !== nameInputRef.current && event.target !== labelInputRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [popupRef, nameInputRef, labelInputRef]);

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside, true);
      
      // Focus the name input when popup opens
      if (nameInputRef.current) {
        setTimeout(() => {
          nameInputRef.current.focus();
        }, 100);
      }
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
          backdropFilter: "blur(2px)",
          animation: "fadeIn 0.2s ease-out"
        }}
        onClick={onClose}
      />
      
      {/* Popup */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          padding: "24px",
          zIndex: 1000,
          width: "90%",
          maxWidth: "500px",
          overflow: "hidden",
          animation: "scaleIn 0.2s ease-out"
        }}
        ref={popupRef}
        onMouseDown={handleClickInside}
      >
        <h3 style={{ 
          margin: "0 0 16px 0", 
          color: "#1e293b", 
          fontSize: "1.25rem",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "12px"
        }}>
          Edit Node
        </h3>
        
        <div style={{ marginBottom: "16px" }}>
          <label 
            htmlFor="nodeName" 
            style={{ 
              display: "block", 
              marginBottom: "6px", 
              color: "#475569",
              fontSize: "0.875rem",
              fontWeight: "500"
            }}
          >
            Node Name:
          </label>
          <input
            type="text"
            id="nodeName"
            ref={nameInputRef}
            value={nodeName || ""}
            onChange={onChangeName}
            style={{ 
              width: "100%", 
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              transition: "border-color 0.2s ease",
              outline: "none",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label 
            htmlFor="nodeLabel" 
            style={{ 
              display: "block", 
              marginBottom: "6px", 
              color: "#475569",
              fontSize: "0.875rem",
              fontWeight: "500"
            }}
          >
            Description / Notes:
          </label>
          <textarea
            rows="6"
            id="nodeLabel"
            ref={labelInputRef}
            value={label || ""}
            onChange={onChangeLabel}
            style={{ 
              width: "100%", 
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              resize: "vertical",
              transition: "border-color 0.2s ease",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
            placeholder="Add description or additional information here..."
          />
        </div>
        
        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end",
          gap: "8px",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "16px"
        }}>
          <button 
            onClick={onClose} 
            style={{ 
              padding: "8px 16px",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              backgroundColor: "white",
              color: "#1e293b",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#f8fafc"}
            onMouseOut={(e) => e.target.style.backgroundColor = "white"}
          >
            Cancel
          </button>
          <button 
            onClick={onSave}
            style={{ 
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#1e40af",
              color: "white",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#1e3a8a"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#1e40af"}
          >
            Save Changes
          </button>
        </div>
        
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "none",
            border: "none",
            fontSize: "1.25rem",
            color: "#64748b",
            cursor: "pointer",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            padding: 0
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#f1f5f9"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          ✕
        </button>
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from { 
              opacity: 0; 
              transform: translate(-50%, -50%) scale(0.95);
            }
            to { 
              opacity: 1; 
              transform: translate(-50%, -50%) scale(1);
            }
          }
        `}
      </style>
    </>
  );
};

export default Popup;