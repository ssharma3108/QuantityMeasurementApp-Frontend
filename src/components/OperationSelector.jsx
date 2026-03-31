
import React from "react";
function OperationSelector({
  availableOperations,
  selectedOperation,
  onSelectOperation,
}) {
  return (
    <div className="operation-container">
      {availableOperations.map((operation) => (
        <button
          key={operation.id}
          className={`operation-btn ${
            selectedOperation === operation.id ? "active-operation" : ""
          }`}
          onClick={() => onSelectOperation(operation.id)}
        >
          {operation.label}
        </button>
      ))}
    </div>
  );
}

export default OperationSelector;