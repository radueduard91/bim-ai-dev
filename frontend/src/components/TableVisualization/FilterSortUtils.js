export const filterAndSortRows = (
    sortedRows, 
    searchTerm, 
    filterCategory, 
    sortConfig
) => {
    let result = [...sortedRows];

    // Search filter (expanded to include more fields)
    if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        result = result.filter(row => {
            // Search across multiple fields
            const attributeNameMatch = row.attr.label.toLowerCase().includes(searchTermLower);
            const attributeDescriptionMatch = row.attr.hoverLabel?.toLowerCase().includes(searchTermLower);
            const objectNameMatch = row.parentObject?.label?.toLowerCase().includes(searchTermLower);
            const objectDescriptionMatch = row.parentObject?.hoverLabel?.toLowerCase().includes(searchTermLower);
            const clusterNameMatch = row.parentCluster?.label?.toLowerCase().includes(searchTermLower);
            const clusterDescriptionMatch = row.parentCluster?.hoverLabel?.toLowerCase().includes(searchTermLower);

            // Return true if any field matches the search term
            return attributeNameMatch || 
                   attributeDescriptionMatch || 
                   objectNameMatch || 
                   objectDescriptionMatch || 
                   clusterNameMatch || 
                   clusterDescriptionMatch;
        });
    }

    // Rest of the existing filtering and sorting logic remains the same
    // (Category filter and sorting code)
    if (filterCategory !== "all") {
        result = result.filter(row => {
            if (filterCategory === "unlinked") {
                return !row.parentCluster && !row.parentObject;
            }
            return row.parentCluster?.label === filterCategory || 
                   row.parentObject?.label === filterCategory;
        });
    }

    // Sorting logic
    if (sortConfig.key) {
        result.sort((a, b) => {
            let aValue, bValue;
            switch (sortConfig.key) {
                case 'cluster':
                    aValue = a.parentCluster?.label || 'Unlinked';
                    bValue = b.parentCluster?.label || 'Unlinked';
                    break;
                case 'object':
                    aValue = a.parentObject?.label || 'Unlinked';
                    bValue = b.parentObject?.label || 'Unlinked';
                    break;
                case 'attribute':
                    aValue = a.attr.label;
                    bValue = b.attr.label;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    return result;
};

// Unique Categories Extraction
export const getUniqueCategories = (sortedRows) => {
    const clusters = new Set();
    const objects = new Set();

    sortedRows.forEach(row => {
        if (row.parentCluster) {
            clusters.add(row.parentCluster.label);
        }
        if (row.parentObject) {
            objects.add(row.parentObject.label);
        }
    });

    return {
        clusters: Array.from(clusters),
        objects: Array.from(objects)
    };
};

// Cell Color Utility
export const getCellColor = (category, isHovered) => {
    if (isHovered) {
        switch (category) {
            case "system": return "#dbeafe"; // Light blue
            case "object": return "#dcfce7"; // Light green
            case "attribute": return "#fce7f3"; // Light pink
            default: return "#f8fafc"; // Light gray
        }
    }
    
    return "transparent";
};

// Cell Border Style Utility
export const getCellBorderStyle = (rowIndex, isFirst = false, isLast = false) => {
    return {
        borderBottom: "1px solid #e2e8f0",
        borderRight: "1px solid #e2e8f0", 
        borderLeft: isFirst ? "1px solid #e2e8f0" : "none",
        borderTop: rowIndex === 0 ? "1px solid #e2e8f0" : "none"
    };
};