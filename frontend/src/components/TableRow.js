import React from 'react';
import ClusterCell from './ClusterCell';
import ObjectCell from './ObjectCell';
import AttributeCell from './AttributeCell';
import HarmonisedAttributeCell from './HarmonisedAttributeCell';

const TableRow = ({
    row,
    index,
    rowSpans,
    clusterCounts,
    objectCounts,
    hoveredRow,
    hoveredCell,
    setHoveredRow,
    setHoveredCell,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    openPopup,
    handleClickInput,
    handleLabelChange,
    setInputRef,
    getDisplayText,
    getCellColor,
    getCellBorderStyle,
    showHarmonisedColumn
}) => {
    return (
        <tr 
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
            style={{
                backgroundColor: hoveredRow === index ? "#f8fafc" : "white",
                transition: "background-color 0.2s ease"
            }}
        >
            {/* Cluster Cell */}
            {rowSpans[index]?.clusterSpan > 0 ? (
                <ClusterCell 
                    row={row}
                    index={index}
                    rowSpan={rowSpans[index].clusterSpan}
                    clusterCount={clusterCounts[row.parentCluster?.key] || 0}
                    isHovered={hoveredCell === `cluster-${index}`}
                    onMouseEnter={() => setHoveredCell(`cluster-${index}`)}
                    onMouseLeave={() => setHoveredCell(null)}
                    onDragOver={(e) => {
                        handleDragOver(e);
                        setHoveredCell(`cluster-${index}`);
                    }}
                    onDragLeave={(e) => {
                        handleDragLeave(e);
                        setHoveredCell(null);
                    }}
                    onDrop={(e) => handleDrop(e, row.parentCluster?.key, "system")}
                    onDragStart={(e) => handleDragStart(e, row.parentCluster?.key, "system")}
                    onDragEnd={handleDragEnd}
                    openPopup={openPopup}
                    handleClickInput={handleClickInput}
                    handleLabelChange={handleLabelChange}
                    setInputRef={setInputRef}
                    getDisplayText={getDisplayText}
                    getCellColor={getCellColor}
                    getCellBorderStyle={getCellBorderStyle}
                />
            ) : null}
            
            {/* Object Cell */}
            {rowSpans[index]?.objectSpan > 0 ? (
                <ObjectCell 
                    row={row}
                    index={index}
                    rowSpan={rowSpans[index].objectSpan}
                    objectCount={objectCounts[row.parentObject?.key] || 0}
                    isHovered={hoveredCell === `object-${index}`}
                    onMouseEnter={() => setHoveredCell(`object-${index}`)}
                    onMouseLeave={() => setHoveredCell(null)}
                    onDragOver={(e) => {
                        handleDragOver(e);
                        setHoveredCell(`object-${index}`);
                    }}
                    onDragLeave={(e) => {
                        handleDragLeave(e);
                        setHoveredCell(null);
                    }}
                    onDrop={(e) => handleDrop(e, row.parentObject?.key, "object")}
                    onDragStart={(e) => handleDragStart(e, row.parentObject?.key, "object")}
                    onDragEnd={handleDragEnd}
                    openPopup={openPopup}
                    handleClickInput={handleClickInput}
                    handleLabelChange={handleLabelChange}
                    setInputRef={setInputRef}
                    getDisplayText={getDisplayText}
                    getCellColor={getCellColor}
                    getCellBorderStyle={getCellBorderStyle}
                />
            ) : null}
            
            {/* Attribute Cell */}
            <AttributeCell 
                row={row}
                index={index}
                isHovered={hoveredCell === `attr-${index}`}
                onMouseEnter={() => setHoveredCell(`attr-${index}`)}
                onMouseLeave={() => setHoveredCell(null)}
                onDragOver={(e) => {
                    handleDragOver(e);
                    setHoveredCell(`attr-${index}`);
                }}
                onDragLeave={(e) => {
                    handleDragLeave(e);
                    setHoveredCell(null);
                }}
                onDrop={(e) => handleDrop(e, row.attr.key, "attribute")}
                onDragStart={(e) => handleDragStart(e, row.attr.key, "attribute")}
                onDragEnd={handleDragEnd}
                openPopup={openPopup}
                handleClickInput={handleClickInput}
                handleLabelChange={handleLabelChange}
                setInputRef={setInputRef}
                getDisplayText={getDisplayText}
                getCellColor={getCellColor}
                getCellBorderStyle={getCellBorderStyle}
            />
            
            {/* Harmonised Attribute Cell - Only shown when toggled */}
            {showHarmonisedColumn && (
                <HarmonisedAttributeCell
                    row={row}
                    index={index}
                    isHovered={hoveredCell === `harmonised-${index}`}
                    onMouseEnter={() => setHoveredCell(`harmonised-${index}`)}
                    onMouseLeave={() => setHoveredCell(null)}
                    onDragOver={(e) => {
                        handleDragOver(e);
                        setHoveredCell(`harmonised-${index}`);
                    }}
                    onDragLeave={(e) => {
                        handleDragLeave(e);
                        setHoveredCell(null);
                    }}
                    onDrop={(e) => handleDrop(e, `harmonised_${row.attr.key}`, "harmonised")}
                    openPopup={openPopup}
                    handleClickInput={handleClickInput}
                    handleLabelChange={handleLabelChange}
                    setInputRef={setInputRef}
                    getDisplayText={getDisplayText}
                    getCellColor={getCellColor}
                    getCellBorderStyle={getCellBorderStyle}
                />
            )}
        </tr>
    );
};

export default TableRow;