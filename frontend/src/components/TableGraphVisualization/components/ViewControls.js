import React from 'react';

/**
 * ViewControls component for managing 3NF and AI Rearrangement views
 */
const ViewControls = ({ 
  show3NFStatus, 
  showAIRearrangement, 
  toggle3NFCheck, 
  toggleAIRearrangement,
  handleDownloadTemplate 
}) => {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      padding: '10px',
      background: '#f8fafc',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      flexWrap: 'wrap'
    }}>
      {/* 3NF Check Button */}
      <button
        onClick={toggle3NFCheck}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: show3NFStatus ? '#8b5cf6' : '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease'
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
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        {show3NFStatus ? 'Hide 3NF Analysis' : 'Show 3NF Analysis'}
      </button>
      
      {/* AI Rearrangement Button */}
      <button
        onClick={toggleAIRearrangement}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: showAIRearrangement ? '#0ea5e9' : '#0284c7',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease'
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
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="12" y1="16" x2="12" y2="8" />
        </svg>
        {showAIRearrangement ? 'Show Original Structure' : 'Apply AI Rearrangement'}
      </button>
      
      {/* Download VP Template Button */}
      <button
        onClick={handleDownloadTemplate}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: '#10b981', // Green color
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease'
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download VP Template
      </button>
    </div>
  );
};

export default ViewControls;