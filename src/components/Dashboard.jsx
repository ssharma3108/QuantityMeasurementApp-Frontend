import { useState } from "react";
import { quantityTypes, operationOptions, unitsMap } from "../data/quantityData";
import QuantityTypeCard from "./QuantityTypeCard";
import OperationSelector from "./OperationSelector";
import InputSection from "./InputSection";
import React from "react";
import { useNavigate } from "react-router-dom";
function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("length");
  const [selectedOperation, setSelectedOperation] = useState("conversion");

  const availableOperations =
    selectedType === "temperature"
      ? operationOptions.filter((operation) => operation.id === "conversion")
      : operationOptions;

  const handleTypeChange = (type) => {
    setSelectedType(type);

    if (type === "temperature") {
      setSelectedOperation("conversion");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-wrapper">
        <header className="top-bar">
          <div className="top-bar-left">
            <div className="app-logo">⚙️</div>
            <h2>Welcome To Quantity Measurement</h2>
          </div>

          <div style={{display: "flex", gap: "10px"}}>
            <button
                className="history-btn"
                onClick={() => navigate("/history")}
            >
              History
            </button>

            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <h3 className="section-title">CHOOSE TYPE</h3>

          <div className="type-card-container">
            {quantityTypes.map((type) => (
                <QuantityTypeCard
                    key={type.id}
                type={type}
                selectedType={selectedType}
                onSelectType={handleTypeChange}
              />
            ))}
          </div>

          <h3 className="section-title">CHOOSE OPERATION</h3>

          <OperationSelector
            availableOperations={availableOperations}
            selectedOperation={selectedOperation}
            onSelectOperation={setSelectedOperation}
          />

          <InputSection
            selectedType={selectedType}
            selectedOperation={selectedOperation}
            unitsMap={unitsMap}
          />

          {selectedType === "temperature" && (
            <p className="note-text">Temperature supports conversion only.</p>
          )}


        </div>
      </div>
    </div>
  );
}

export default Dashboard;