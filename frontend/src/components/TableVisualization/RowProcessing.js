export const sortRows = (rows) => {
    const unlinkedAttributes = rows.filter(row => !row.parentCluster && !row.parentObject);
    const linkedRows = rows.filter(row => row.parentCluster || row.parentObject);

    const sortedLinkedRows = [...linkedRows].sort((a, b) => {
        const clusterA = a.parentCluster?.label || "Unlinked";
        const clusterB = b.parentCluster?.label || "Unlinked";
        const objectA = a.parentObject?.label || "Unlinked";
        const objectB = b.parentObject?.label || "Unlinked";
        const attributeA = a.attr.label;
        const attributeB = b.attr.label;

        const compareClusters = clusterA.localeCompare(clusterB);
        if (compareClusters !== 0) return compareClusters;

        const compareObjects = objectA.localeCompare(objectB);
        if (compareObjects !== 0) return compareObjects;

        return attributeA.localeCompare(attributeB);
    });
    
    return [...unlinkedAttributes, ...sortedLinkedRows];
};

export const processRowSpans = (sorted) => {
    const spans = {};
    let prevCluster = null;
    let prevObject = null;
    let clusterSpan = 1;
    let objectSpan = 1;

    sorted.forEach((row, index) => {
        const currentCluster = row.parentCluster?.label || "Unlinked";
        const currentObject = row.parentObject?.label || "Unlinked";

        if (currentCluster === prevCluster) {
            clusterSpan++;
            spans[index] = { ...spans[index], clusterSpan: 0 };
        } else {
            spans[index - clusterSpan] = { ...spans[index - clusterSpan], clusterSpan };
            clusterSpan = 1;
        }

        if (currentObject === prevObject) {
            objectSpan++;
            spans[index] = { ...spans[index], objectSpan: 0 };
        } else {
            spans[index - objectSpan] = { ...spans[index - objectSpan], objectSpan };
            objectSpan = 1;
        }

        prevCluster = currentCluster;
        prevObject = currentObject;
    });

    // Handle the last group
    spans[sorted.length - clusterSpan] = { 
        ...spans[sorted.length - clusterSpan], 
        clusterSpan 
    };
    spans[sorted.length - objectSpan] = { 
        ...spans[sorted.length - objectSpan], 
        objectSpan 
    };

    return spans;
};