import React from 'react';

/**
 * Placeholder component when no graph data is available
 */
const NoDataPlaceholder = ({ containerStyle }) => {
  return (
    <div style={{
      ...containerStyle,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontStyle: "italic",
      color: "#64748b",
      textAlign: "center"
    }}>
      <div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="64" 
          height="64" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ 
            margin: '0 auto 16px',
            display: 'block',
            color: '#94a3b8'
          }}
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        Upload data to visualize tables and their relationships.
      </div>
    </div>
  );
};

export default NoDataPlaceholder;