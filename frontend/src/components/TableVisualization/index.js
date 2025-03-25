import React from "react";
import { useTableState } from "./hooks/useTableState";
import { useRowProcessing } from "./hooks/useRowProcessing";
import TableFilters from "./components/TableFilters";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import Pagination from "./components/Pagination";
import ConfirmationPopup from "../ConfirmationPopup";
import { addNewAttribute } from "./AttributeManagement";

// Main TableVisualization component
const TableVisualization = ({ 
    graphData, 
    handleLabelChange, 
    openPopup, 
    setGraphData, 
    fetchGraphData,
    showHarmonisedColumn,
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    processDragDrop,
    showNotification
}) => {
    // Use custom hooks for state management and data processing
    const {
        searchTerm, setSearchTerm,
        filterCategory, setFilterCategory,
        sortConfig, setSortConfig,
        currentPage, setCurrentPage,
        confirmPopup, setConfirmPopup,
        hoveredRow, setHoveredRow,
        hoveredCell, setHoveredCell,
        inputRefs,
        handleSort,
        handleNextPage,
        handlePrevPage,
        ROWS_PER_PAGE
    } = useTableState();

    // Use hook for row processing and data calculations
    const {
        sortedRows,
        rowSpans,
        clusterCounts,
        objectCounts,
        filteredAndSortedRows,
        paginatedRows,
        totalPages
    } = useRowProcessing(
        graphData, 
        searchTerm, 
        filterCategory, 
        sortConfig, 
        currentPage,
        ROWS_PER_PAGE
    );

    // No data fallback
    if (!graphData || graphData.nodeDataArray.length === 0) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                color: '#666'
            }}>
                No data available. Please upload a file.
            </div>
        );
    }

    // Handle attribute creation
    const handleAddAttribute = () => {
        addNewAttribute(
            graphData, 
            setGraphData, 
            fetchGraphData, 
            setConfirmPopup,
            showNotification
        );
    };

    // Render the component
    return (
        <div className="table-container">
            {/* Search and filter controls */}
            <TableFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                sortedRows={sortedRows}
            />

            {/* Confirmation popup for adding attributes */}
            {confirmPopup.isOpen && (
                <ConfirmationPopup 
                    onConfirm={handleAddAttribute}
                    onCancel={() => setConfirmPopup({ isOpen: false })}
                    title="Add New Attribute"
                    message="An unlinked attribute will be created at the top of the table. Would you like to proceed?"
                />
            )}

            {/* Table container */}
            <div style={{ 
                overflowX: "auto", 
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
                borderRadius: "8px" 
            }}>
                <table style={{ 
                    width: "100%", 
                    borderCollapse: "collapse",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    overflow: "hidden"
                }}>
                    {/* Table header */}
                    <TableHeader 
                        sortConfig={sortConfig}
                        handleSort={handleSort}
                        setConfirmPopup={setConfirmPopup}
                        showHarmonisedColumn={showHarmonisedColumn}
                        showNotification={showNotification}
                    />

                    {/* Table body */}
                    <TableBody 
                        paginatedRows={paginatedRows}
                        rowSpans={rowSpans}
                        clusterCounts={clusterCounts}
                        objectCounts={objectCounts}
                        hoveredRow={hoveredRow}
                        hoveredCell={hoveredCell}
                        setHoveredRow={setHoveredRow}
                        setHoveredCell={setHoveredCell}
                        graphData={graphData}
                        setGraphData={setGraphData}
                        fetchGraphData={fetchGraphData}
                        openPopup={openPopup}
                        handleLabelChange={handleLabelChange}
                        inputRefs={inputRefs}
                        showHarmonisedColumn={showHarmonisedColumn}
                        draggedItem={draggedItem}
                        handleDragStart={handleDragStart}
                        handleDragEnd={handleDragEnd}
                        handleDragOver={handleDragOver}
                        handleDragLeave={handleDragLeave}
                        processDragDrop={processDragDrop}
                    />
                </table>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            )}

            {/* Styles for drag and drop */}
            <style>
                {`
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
                    
                    @keyframes pulse {
                        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
                        70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                    }
                `}
            </style>
        </div>
    );
};

export default TableVisualization;