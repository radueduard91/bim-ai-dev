import React, { useState } from "react";
import Popup from "./Popup";

const LabelEditor = ({ graphData, setGraphData }) => {
  const [popup, setPopup] = useState({ isOpen: false, key: null, value: "" });

  const openPopup = (key, currentValue) => {
    setPopup({ isOpen: true, key, value: currentValue });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, key: null, value: "" });
  };

  const savePopupChanges = () => {
    const updatedValue = popup.value;
    setGraphData((prev) => ({
      ...prev,
      nodeDataArray: prev.nodeDataArray.map((node) =>
        node.key === popup.key ? { ...node, hoverLabel: updatedValue } : node
      ),
    }));
    closePopup();
  };

  return (
    <>
      <Popup
        isOpen={popup.isOpen}
        value={popup.value}
        onChange={(e) => setPopup({ ...popup, value: e.target.value })}
        onSave={savePopupChanges}
        onClose={closePopup}
      />
    </>
  );
};

export default LabelEditor;