import { useState, useEffect, useMemo } from 'react';
import { sortRows, processRowSpans } from '../RowProcessing';
import { calculateCounts } from '../CountCalculators';
import { filterAndSortRows } from '../FilterSortUtils';

/**
 * Custom hook to handle row processing, sorting, filtering, and calculations
 */
export const useRowProcessing = (
    graphData, 
    searchTerm, 
    filterCategory, 
    sortConfig, 
    currentPage,
    ROWS_PER_PAGE
) => {
    // State for processed data
    const [sortedRows, setSortedRows] = useState([]);
    const [rowSpans, setRowSpans] = useState({});
    const [clusterCounts, setClusterCounts] = useState({});
    const [objectCounts, setObjectCounts] = useState({});

    // Process graph data when it changes
    useEffect(() => {
        if (graphData && graphData.nodeDataArray.length > 0) {
            const clusters = graphData.nodeDataArray.filter((node) => node.category === "system");
            const objects = graphData.nodeDataArray.filter((node) => node.category === "object");
            const attributes = graphData.nodeDataArray.filter((node) => node.category === "attribute");

            // Create rows with relationships
            const rows = attributes.map((attr) => {
                const parentObject = objects.find((obj) =>
                    graphData.linkDataArray.some((link) => link.from === obj.key && link.to === attr.key)
                );

                const parentCluster = parentObject
                    ? clusters.find((sys) =>
                        graphData.linkDataArray.some((link) => link.from === sys.key && link.to === parentObject.key)
                    )
                    : null;

                return { attr, parentObject, parentCluster };
            });

            // Sort rows
            const sorted = sortRows(rows);
            setSortedRows(sorted);

            // Process row spans
            const spans = processRowSpans(sorted);
            setRowSpans(spans);

            // Calculate counts
            const { clusterCounts, objectCounts } = calculateCounts(graphData);
            setClusterCounts(clusterCounts);
            setObjectCounts(objectCounts);
        }
    }, [graphData]);

    // Filter and sort the rows
    const filteredAndSortedRows = useMemo(() => 
        filterAndSortRows(sortedRows, searchTerm, filterCategory, sortConfig), 
        [sortedRows, searchTerm, filterCategory, sortConfig]
    );

    // Paginate the rows
    const paginatedRows = useMemo(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        return filteredAndSortedRows.slice(startIndex, startIndex + ROWS_PER_PAGE);
    }, [filteredAndSortedRows, currentPage, ROWS_PER_PAGE]);

    // Calculate total pages
    const totalPages = Math.ceil(filteredAndSortedRows.length / ROWS_PER_PAGE);

    return {
        sortedRows,
        rowSpans,
        clusterCounts,
        objectCounts,
        filteredAndSortedRows,
        paginatedRows,
        totalPages
    };
};