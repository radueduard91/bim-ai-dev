import React from 'react';

/**
 * Enhanced AI Thinking Overlay Component
 * Provides improved visual feedback during AI processing tasks
 */
const AIThinkingOverlay = ({ isOpen, message, progress }) => {
  if (!isOpen) return null;
  
  // Calculate dynamic width for progress bar
  const width = `${Math.max(5, Math.min(progress, 100))}%`;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        width: '90%',
        maxWidth: '450px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top blue stripe for visual flair */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(to right, #2563eb, #3b82f6, #60a5fa)'
        }} />
        
        {/* AI Icon */}
        <div style={{
          marginBottom: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563eb, #60a5fa)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          animation: 'pulse 2s infinite'
        }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="30" 
            height="30" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
            <path d="M7 12a5 5 0 0 0 10 0"/>
          </svg>
        </div>
        
        {/* Message */}
        <h3 style={{
          margin: '0 0 24px 0',
          color: '#1e293b',
          fontWeight: '600',
          textAlign: 'center',
          fontSize: '18px'
        }}>
          {message}
        </h3>
        
        {/* Progress Track */}
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#f1f5f9',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '16px'
        }}>
          {/* Animated Progress Bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: width,
            background: 'linear-gradient(to right, #2563eb, #60a5fa)',
            borderRadius: '4px',
            transition: 'width 0.4s ease'
          }} />
        </div>
        
        {/* Percentage Text */}
        <div style={{
          color: '#64748b',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {`${Math.round(progress)}% Complete`}
        </div>
        
        {/* Information Text */}
        <p style={{
          marginTop: '16px',
          fontSize: '13px',
          color: '#94a3b8',
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          AI is generating definitions based on attribute relationships and naming patterns
        </p>
      </div>
    </div>
  );
};

export default AIThinkingOverlay;