import React from "react";
function QuantityTypeCard({ type, selectedType, onSelectType }) {
  return (
    <div
      className={`type-card ${selectedType === type.id ? "selected-card" : ""}`}
      onClick={() => onSelectType(type.id)}
    >
      <div className="type-icon">{type.icon}</div>
      <p>{type.label}</p>
    </div>
  );
}

export default QuantityTypeCard;