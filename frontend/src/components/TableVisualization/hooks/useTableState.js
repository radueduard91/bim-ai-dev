import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook to manage the state for the TableVisualization component
 */
export const useTableState = () => {
    // Pagination and sorting state
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const ROWS_PER_PAGE = 50;

    // UI interaction state
    const [draggedItem, setDraggedItem] = useState(null);
    const [confirmPopup, setConfirmPopup] = useState({ isOpen: false });
    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredCell, setHoveredCell] = useState(null);
    
    // Refs for inputs
    const inputRefs = useRef({});

    // Reset page when filter/search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterCategory]);

    // Handle sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Pagination handlers
    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    return {
        // State
        searchTerm, 
        setSearchTerm,
        filterCategory, 
        setFilterCategory,
        sortConfig, 
        setSortConfig,
        currentPage, 
        setCurrentPage,
        draggedItem, 
        setDraggedItem,
        confirmPopup, 
        setConfirmPopup,
        hoveredRow, 
        setHoveredRow,
        hoveredCell, 
        setHoveredCell,
        inputRefs,
        
        // Handlers
        handleSort,
        handleNextPage,
        handlePrevPage,
        
        // Constants
        ROWS_PER_PAGE
    };
};