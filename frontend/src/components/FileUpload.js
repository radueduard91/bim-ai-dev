import React from "react";
import { buttonStyle } from "../utils/styles";

const FileUpload = ({ isLoading, handleFileChange, handleFileUpload }) => {
  // Create a ref for the file input element
  const fileInputRef = React.useRef(null);

  // Function to handle file input changes and call the parent component's handler
  const handleFileInputChange = (e) => {
    // Call the parent component's handler
    handleFileChange(e);
  };

  // Function to programmatically click the file input
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        accept=".csv,.xlsx,.xls"
      />

      {/* Button to trigger file selection */}
      <button
        onClick={triggerFileSelect}
        disabled={isLoading}
        style={{
          ...buttonStyle(isLoading),
          backgroundColor: "#64748b",
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        Select File
      </button>

      {/* Button to upload the selected file */}
      <button
        onClick={handleFileUpload}
        disabled={isLoading}
        style={{
          ...buttonStyle(isLoading),
          backgroundColor: "#0f766e",
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;