import React from 'react';
import { getUniqueCategories } from '../FilterSortUtils';

/**
 * Component for rendering search and filter controls
 */
const TableFilters = ({ 
    searchTerm, 
    setSearchTerm, 
    filterCategory, 
    setFilterCategory, 
    sortedRows
}) => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '16px',
            gap: '16px'
        }}>
            {/* Search Input */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                flex: 1 
            }}>
                <input 
                    type="text"
                    placeholder="Search nodes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                    }}
                />
            </div>

            {/* Category Filter */}
            <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{
                    padding: '8px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                }}
            >
                <option value="all">All Categories</option>
                <option value="unlinked">Unlinked</option>
                {getUniqueCategories(sortedRows).clusters.map(cluster => (
                    <option key={`cluster-${cluster}`} value={cluster}>
                        Cluster: {cluster}
                    </option>
                ))}
                {getUniqueCategories(sortedRows).objects.map(object => (
                    <option key={`object-${object}`} value={object}>
                        Object: {object}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TableFilters;