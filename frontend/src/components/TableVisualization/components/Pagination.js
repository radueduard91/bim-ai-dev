import React from 'react';

/**
 * Component for rendering pagination controls
 */
const Pagination = ({ 
    currentPage, 
    totalPages, 
    handlePrevPage, 
    handleNextPage 
}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '16px',
            gap: '12px'
        }}>
            <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                style={{
                    padding: '8px 16px',
                    backgroundColor: currentPage === 1 ? '#e2e8f0' : '#1e40af',
                    color: currentPage === 1 ? '#64748b' : 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={{
                    padding: '8px 16px',
                    backgroundColor: currentPage === totalPages ? '#e2e8f0' : '#1e40af',
                    color: currentPage === totalPages ? '#64748b' : 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;