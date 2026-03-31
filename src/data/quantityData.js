export const quantityTypes = [
  { id: "length", label: "Length", icon: "📏" },
  { id: "weight", label: "Weight", icon: "⚖️" },
  { id: "volume", label: "Volume", icon: "🧪" },
  { id: "temperature", label: "Temperature", icon: "🌡️" },
];

export const operationOptions = [
  { id: "comparison", label: "Comparison"},
  { id: "conversion", label: "Conversion" },
  { id: "addition", label: "Addition" },
  { id: "subtraction", label: "Subtraction" },
  { id: "division", label: "Division" },
];

export const unitsMap = {
  length: ["Centimeter", "Yard", "Inch", "Foot"],
  weight: ["Gram", "Kilogram","Pound"],
  volume: ["Millilitre", "Litre", "Gallon"],
  temperature: ["Celsius", "Fahrenheit"],
};