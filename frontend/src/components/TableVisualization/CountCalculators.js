export const calculateCounts = (graphData) => {
    const clusters = graphData.nodeDataArray.filter((node) => node.category === "system");
    const objects = graphData.nodeDataArray.filter((node) => node.category === "object");
    const attributes = graphData.nodeDataArray.filter((node) => node.category === "attribute");

    const clusterCounts = {};
    const objectCounts = {};

    clusters.forEach(cluster => {
        const linkedObjects = objects.filter(obj =>
            graphData.linkDataArray.some(link => link.from === cluster.key && link.to === obj.key)
        );
        clusterCounts[cluster.key] = linkedObjects.length;
    });

    objects.forEach(obj => {
        const linkedAttributes = attributes.filter(attr =>
            graphData.linkDataArray.some(link => link.from === obj.key && link.to === attr.key)
        );
        objectCounts[obj.key] = linkedAttributes.length;
    });

    return { clusterCounts, objectCounts };
};