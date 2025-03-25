/**
 * Organizes graph data into a hierarchical structure for visualization
 * @param {Object} data - The raw graph data
 * @returns {Array} - Array of organized cluster objects
 */
export function organizeDataForVisualization(data) {
  if (!data || !data.nodeDataArray || !data.linkDataArray) {
    return [];
  }
  
  const { nodeDataArray: nodes, linkDataArray: links } = data;
  
  // Extract nodes by category
  const clusters = nodes.filter(node => node.category === "system");
  const objects = nodes.filter(node => node.category === "object");
  const attributes = nodes.filter(node => node.category === "attribute");
  
  // Build the cluster hierarchy
  return clusters
    .map(cluster => {
      // Find objects linked to this cluster
      const linkedObjectKeys = links
        .filter(link => link.from === cluster.key)
        .map(link => link.to);
        
      const clusterObjects = objects
        .filter(obj => linkedObjectKeys.includes(obj.key))
        .map(obj => {
          // Find attributes linked to this object
          const linkedAttrKeys = links
            .filter(link => link.from === obj.key)
            .map(link => link.to);
            
          const objectAttributes = attributes
            .filter(attr => linkedAttrKeys.includes(attr.key));
          
          // Get harmonized attributes and check 3NF compliance
          const harmonizedAttributeMap = processHarmonizedAttributes(objectAttributes);
          
          // Convert map to array and sort alphabetically
          const harmonizedAttributes = Object.values(harmonizedAttributeMap)
            .sort((a, b) => a.name.localeCompare(b.name));
          
          return {
            ...obj,
            attributes: objectAttributes,
            harmonizedAttributes: harmonizedAttributes
          };
        })
        .sort((a, b) => (a.label || '').localeCompare(b.label || ''));
      
      return {
        ...cluster,
        objects: clusterObjects
      };
    })
    .sort((a, b) => (a.label || '').localeCompare(b.label || ''));
}

/**
 * Process harmonized attributes with 3NF compliance check
 * @param {Array} objectAttributes - Attributes to process
 * @returns {Object} Mapped harmonized attributes
 */
function processHarmonizedAttributes(objectAttributes) {
  const harmonizedAttributeMap = {};
  
  objectAttributes.forEach(attr => {
    // Get the harmonized attribute name
    const harmonizedName = attr.harmonisedAttribute || `Harmonised-${attr.label}`;
    
    // Check if this attribute is 3NF compliant (from the 3nf_marker field)
    const is3NFCompliant = attr.hasOwnProperty('3nf_marker') 
      ? attr['3nf_marker'] === 'yes'
      : Math.random() > 0.5; // Simulate for demo if field is missing
    
    if (!harmonizedAttributeMap[harmonizedName]) {
      harmonizedAttributeMap[harmonizedName] = {
        name: harmonizedName,
        count: 1,
        originalAttributes: [attr.label || 'Unknown'],
        is3NF: is3NFCompliant
      };
    } else {
      const existingEntry = harmonizedAttributeMap[harmonizedName];
      
      existingEntry.count += 1;
      
      // Add unique original attributes
      if (!existingEntry.originalAttributes.includes(attr.label || 'Unknown')) {
        existingEntry.originalAttributes.push(attr.label || 'Unknown');
      }
      
      // Update 3NF status if any attribute is not compliant
      if (!is3NFCompliant) {
        existingEntry.is3NF = false;
      }
    }
  });
  
  return harmonizedAttributeMap;
}

/**
 * Reorganizes the graph data based on the specified harmonized attribute mappings
 * with parent-child hierarchy
 * @param {Object} data - The raw graph data
 * @returns {Array} - Array of reorganized objects
 */
export function organizeDataForAIRearrangement(data) {
  if (!data || !data.nodeDataArray || !data.linkDataArray) {
    console.log("No data available for AI rearrangement");
    return [];
  }
  
  const { nodeDataArray: nodes, linkDataArray: links } = data;
  const attributes = nodes.filter(node => node.category === "attribute");
  
  console.log(`Total number of attributes: ${attributes.length}`);

  // Create the parent and child objects with proper relationships
  const parentKey = "new-object-transformator";
  
  // Create a map of new objects based on your requirements
  const newObjectsMap = {
    "Transformator": {
      key: parentKey,
      label: "Transformator",
      hoverLabel: "Main transformator object (parent)",
      category: "object",
      isParent: true,
      harmonizedAttributes: []
    },
    "Olgekuhlte": {
      key: "new-object-olgekuhlte",
      label: "Olgekuhlte",
      hoverLabel: "Oil-cooled transformator properties (child)",
      category: "object",
      parentKey: parentKey,  // Reference to parent
      isChild: true,
      harmonizedAttributes: []
    },
    "Mechanische Eigenschaften": {
      key: "new-object-mechanische",
      label: "Mechanische Eigenschaften",
      hoverLabel: "Mechanical properties of transformators (child)",
      category: "object",
      parentKey: parentKey,  // Reference to parent
      isChild: true,
      harmonizedAttributes: []
    },
    "Funktionale Transformatoren": {
      key: "new-object-funktionale",
      label: "Funktionale Transformatoren",
      hoverLabel: "Functional transformator properties (child)",
      category: "object",
      parentKey: parentKey,  // Reference to parent
      isChild: true,
      harmonizedAttributes: []
    }
  };

  // Map harmonized attributes to specific target objects exactly as specified
  const harmonizedAttributeToObjectMap = {
    "Absturzsicherungsart": "Transformator",
    "Anschluss": "Transformator",
    "Anstrichfläche": "Transformator",
    "Anzahl Stufen": "Transformator",
    "Art der Luftentfeuchtung": "Olgekuhlte",
    "Ausführung Ölausdehnungsgefäß": "Olgekuhlte",
    "Aushebevorrichtung": "Mechanische Eigenschaften",
    "Bem.-Leistung": "Transformator",
    "Bem.-strom": "Transformator",
    "Gefährdungsstufe": "Funktionale Transformatoren",
    "Gewicht Aktivteil": "Mechanische Eigenschaften",
    "Gewicht Al/Cu": "Mechanische Eigenschaften"
  };

  // Process each attribute using our exact mapping
  attributes.forEach(attr => {
    // Get the harmonized attribute name for this attribute
    const harmonizedName = attr.harmonisedAttribute || `Harmonised-${attr.label}`;
    
    // Find original object the attribute belonged to
    const originalObjectKey = links
      .filter(link => link.to === attr.key)
      .map(link => link.from)[0];
    
    const originalObjects = nodes.filter(node => node.category === "object");
    const originalObject = originalObjectKey ? 
      originalObjects.find(obj => obj.key === originalObjectKey) : null;
    
    // Determine the target object based on harmonized attribute name
    let targetObjectName = "Transformator"; // Default
    
    if (harmonizedAttributeToObjectMap[harmonizedName]) {
      targetObjectName = harmonizedAttributeToObjectMap[harmonizedName];
    }
    
    // Add to the appropriate target object
    const targetObject = newObjectsMap[targetObjectName];
    
    if (targetObject) {
      addAttributeToNewObject(
        targetObject,
        attr,
        harmonizedName,
        originalObject?.label || "Unknown"
      );
    }
  });
  
  // Convert objects map to array and filter out empty objects
  const objectsArray = Object.values(newObjectsMap)
    .filter(obj => obj.harmonizedAttributes.length > 0);
  
  // Sort objects to put parent first, then children alphabetically
  objectsArray.sort((a, b) => {
    // Put parent (Transformator) first
    if (a.isParent) return -1;
    if (b.isParent) return 1;
    // Then sort children alphabetically
    return a.label.localeCompare(b.label);
  });
  
  // Sort harmonized attributes within each object
  objectsArray.forEach(obj => {
    obj.harmonizedAttributes.sort((a, b) => a.name.localeCompare(b.name));
  });
  
  // Create links between parent and child objects
  const parentChildLinks = [];
  objectsArray.forEach(obj => {
    if (obj.isChild && obj.parentKey) {
      parentChildLinks.push({
        from: obj.parentKey,
        to: obj.key,
        relationship: "parent-child"
      });
    }
  });
  
  // Create a single cluster containing all new objects
  const aiGeneratedCluster = {
    key: "ai-generated-cluster",
    label: "AI-Generated Structure",
    category: "system",
    hoverLabel: "",
    objects: objectsArray,
    // Include the parent-child relationships
    relationships: parentChildLinks
  };
  
  return objectsArray.length > 0 ? [aiGeneratedCluster] : [];
}

/**
 * Helper function to add an attribute to a new object
 * @param {Object} targetObject - The object to add the attribute to
 * @param {Object} attribute - The attribute to add
 * @param {string} harmonizedName - The harmonized name of the attribute
 * @param {string} originalObjectName - The name of the original object
 */
function addAttributeToNewObject(targetObject, attribute, harmonizedName, originalObjectName) {
  // Check if this harmonized attribute is already in the target object
  const existingAttr = targetObject.harmonizedAttributes.find(attr => 
    attr.name === harmonizedName
  );
  
  // Check if this attribute is 3NF compliant
  const is3NFCompliant = attribute.hasOwnProperty('3nf_marker') 
    ? attribute['3nf_marker'] === 'yes'
    : Math.random() > 0.5; // Simulate for demo if field is missing
  
  if (existingAttr) {
    // Add the original attribute name if not already present
    if (!existingAttr.originalAttributes.includes(attribute.label)) {
      existingAttr.originalAttributes.push(attribute.label);
    }
    
    // If any attribute is not 3NF compliant, mark the harmonized attribute as not 3NF
    if (!is3NFCompliant) {
      existingAttr.is3NF = false;
    }
    
    // Make sure we track that this was moved from its original object
    existingAttr.moved = true;
    
    // Keep track of original object if not already set
    if (!existingAttr.originalObject) {
      existingAttr.originalObject = originalObjectName;
    }
  } else {
    // Create a new harmonized attribute entry
    targetObject.harmonizedAttributes.push({
      name: harmonizedName,
      count: 1,
      originalAttributes: [attribute.label],
      is3NF: is3NFCompliant,
      moved: true,
      originalObject: originalObjectName
    });
  }
}