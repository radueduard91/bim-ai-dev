import React from 'react';
import TableRow from '../../TableRow';
import { handleClickInput, setInputRef } from '../AttributeManagement';
import { getCellColor, getCellBorderStyle } from '../utils/CellUtils';

/**
 * Safely renders display text with ellipsis
 * Fixes the "Objects are not valid as React child" error
 */
const SafeDisplayText = ({ text }) => {
  if (!text) return null;
  
  // Safely convert to string and handle line breaks
  const safeText = String(text);
  const lines = safeText.split('\n');
  const firstTwoLines = lines.slice(0, 2).join('\n');
  const truncatedText = firstTwoLines.substring(0, 100);
  
  return (
    <div style={{ position: 'relative', display: 'inline-block', width: "100%" }}>
      <div 
        style={{ 
          overflow: 'hidden', 
          whiteSpace: 'pre-line', 
          maxWidth: "calc(100% - 20px)", 
          marginRight: "2px",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical"
        }}
      >
        {/* Render text directly instead of using dangerouslySetInnerHTML */}
        {truncatedText}
      </div>
      {safeText.length > 100 && (
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
          style={{ 
            position: 'absolute', 
            bottom: '2px', 
            right: '2px', 
            cursor: "pointer",
            color: "#64748b"
          }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      )}
    </div>
  );
};

/**
 * Component for rendering the table body with rows
 * Fixed version that prevents React object rendering issues
 */
const TableBody = ({ 
    paginatedRows,
    rowSpans,
    clusterCounts,
    objectCounts,
    hoveredRow,
    hoveredCell,
    setHoveredRow,
    setHoveredCell,
    graphData,
    setGraphData,
    fetchGraphData,
    openPopup,
    handleLabelChange,
    inputRefs,
    showHarmonisedColumn,
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    processDragDrop
}) => {
  // Function to handle display text - now implemented as a component
  const getDisplayText = (text) => {
    return <SafeDisplayText text={text} />;
  };

  // Defend against null/undefined inputs
  const safeRows = Array.isArray(paginatedRows) ? paginatedRows : [];
  const safeRowSpans = rowSpans || {};
  const safeClusterCounts = clusterCounts || {};
  const safeObjectCounts = objectCounts || {};

  return (
    <tbody>
      {safeRows.map((row, index) => {
        // Ensure row has all required properties
        if (!row || !row.attr) {
          console.warn(`Invalid row at index ${index}:`, row);
          return null;
        }

        return (
          <TableRow 
            key={`row-${row.attr.key || index}`}
            row={row}
            index={index}
            rowSpans={safeRowSpans}
            clusterCounts={safeClusterCounts}
            objectCounts={safeObjectCounts}
            hoveredRow={hoveredRow}
            hoveredCell={hoveredCell}
            setHoveredRow={setHoveredRow}
            setHoveredCell={setHoveredCell}
            handleDragStart={(event, key, category) => 
              handleDragStart(event, key, category)
            }
            handleDragEnd={handleDragEnd}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={(event, targetKey, targetCategory) => 
              processDragDrop(event, targetKey, targetCategory)
            }
            openPopup={openPopup}
            handleClickInput={(key, currentLabel, currentName) => 
              handleClickInput(
                inputRefs, 
                openPopup, 
                key, 
                currentLabel, 
                currentName
              )
            }
            handleLabelChange={handleLabelChange}
            setInputRef={setInputRef(inputRefs)}
            getDisplayText={getDisplayText}
            getCellColor={getCellColor}
            getCellBorderStyle={getCellBorderStyle}
            showHarmonisedColumn={showHarmonisedColumn}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;