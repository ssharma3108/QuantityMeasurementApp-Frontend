import React, { useState } from "react";
import {useEffect}  from "react";

function InputSection({ selectedType, selectedOperation, unitsMap }) {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [unit1, setUnit1] = useState("CENTIMETER");
  const [unit2, setUnit2] = useState("CENTIMETER");
  const [result, setResult] = useState("");
  const unitMap = {
    Centimetre: "CENTIMETER",
    Yard: "YARDS",
    Inch: "INCH",
    Foot: "FEET"
  };
  const typeMap = {
    length: "LENGTH",
    weight: "WEIGHT",
    volume: "VOLUME",
    temperature: "TEMPERATURE"
  };
  useEffect(() => {
    const units = unitsMap[selectedType];

    if (units && units.length > 0) {
      const firstUnit = unitMap[units[0]] || units[0].toUpperCase();

      setUnit1(firstUnit);
      setUnit2(firstUnit);
      setValue1("");
      setValue2("");
      setResult("");
    }
  }, [selectedType]);

  const handleCompare = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/measurements/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value1: Number(value1),
          value2: Number(value2),
          unit1,
          unit2,
          measurementType: typeMap[selectedType],
        }),
      });

      const data = await res.json();
      setResult(data.data.equal ? "Equal" : "Not Equal");

    } catch (err) {
      alert("Compare failed");
    }
  };

  const handleConvert = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/measurements/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value: Number(value1),
          sourceUnit: unit1,
          targetUnit: unit2,
          measurementType: typeMap[selectedType],
        }),
      });

      const data = await res.json();

      setValue2(data.data.result.split(" ")[0]); // only number
      setResult(data.data.result);
    } catch (err) {
      alert("Conversion failed");
    }
  };
  const handleArithmetic = async (type) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8080/measurements/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value1: Number(value1),
          value2: Number(value2),
          unit1,
          unit2,
          measurementType: typeMap[selectedType],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();

      setResult(data.data.result);

    } catch (err) {
      alert(type + " failed: " + err.message);
    }
  };

  const handleAction = () => {
    switch (selectedOperation) {
      case "comparison":
        handleCompare();
        break;

      case "conversion":
        handleConvert();
        break;

      case "addition":
        handleArithmetic("add");
        break;

      case "subtraction":
        handleArithmetic("subtract");
        break;

      case "division":
        handleArithmetic("divide");
        break;

      default:
        alert("Invalid operation");
    }
  };

  return (
      <div className="input-section">
        <div className="input-box">
          <label>VALUE 1</label>
          <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
          />
          <select value={unit1} onChange={(e) => setUnit1(e.target.value)}>
            {unitsMap[selectedType].map((unit) => (
                <option key={unit} value={unitMap[unit] || unit.toUpperCase()}>
                  {unit}
                </option>
            ))}
          </select>
        </div>

        <div className="input-box">
          <label>VALUE 2</label>
          <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              disabled={selectedOperation === "conversion"}
          />
          <select value={unit2} onChange={(e) => setUnit2(e.target.value)}>
            {unitsMap[selectedType].map((unit) => (
                <option key={unit} value={unitMap[unit] || unit.toUpperCase()}>
                  {unit}
                </option>
            ))}
          </select>
        </div>

        <div className="input-box full-width">
          <label>RESULT</label>
          <input type="text" value={result || ""} readOnly/>
        </div>

        <button className="compare-btn" onClick={handleAction}>
          {selectedOperation === "comparison" && "Compare"}
          {selectedOperation === "conversion" && "Convert"}
          {selectedOperation === "addition" && "Add"}
          {selectedOperation === "subtraction" && "Subtract"}
          {selectedOperation === "division" && "Divide"}
        </button>
      </div>
  );
}

export default InputSection;