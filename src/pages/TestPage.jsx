import React, { useState } from "react";

const TestPage = () => {
  const colorPalette = [
    "#000000",
    "#ffffff",
    "#800080",
    "#808080",
    "#ffa500",
    "#ffff00",
    "#a52a2a",
    "#ff0000",
    "#ffc0cb",
    "#008000",
  ];
  const [userColor, setUserColor] = useState("");
  const [suggestedColors, setSuggestedColors] = useState([]);

  const handleColorChange = (event) => {
    console.log(event.target.value);
    setUserColor(event.target.value);
  };

  const suggestColors = () => {
    const similarityScores = colorPalette.map((color) => {
      const similarityScore = calculateSimilarity(userColor, color);
      return { color, similarityScore };
    });

    similarityScores.sort((a, b) => a.similarityScore - b.similarityScore);

    const topSuggestions = similarityScores
      .slice(1, 4)
      .map((entry) => entry.color);

    // If there are no color matches, return white and black
    if (topSuggestions.length === 0) {
      setSuggestedColors(["white", "black"]);
    } else {
      setSuggestedColors(topSuggestions);
    }
  };

  const calculateSimilarity = (color1, color2) => {
    // Convert color1 and color2 to RGB values
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    // Calculate Euclidean distance between the two colors
    const rDiff = Math.abs(rgb2.r - rgb1.r);
    const gDiff = Math.abs(rgb2.g - rgb1.g);
    const bDiff = Math.abs(rgb2.b - rgb1.b);
    const avgDiff = (rDiff + gDiff + bDiff) / 3;
    const distance = Math.sqrt(rDiff ** 2 + gDiff ** 2 + bDiff ** 2);

    return avgDiff;
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  return (
    <div>
      <h2>Color Suggestion Algorithm</h2>
      <label htmlFor="colorInput">Enter your color:</label>
      <input
        type="text"
        id="colorInput"
        value={userColor}
        onChange={handleColorChange}
      />
      <button onClick={suggestColors}>Suggest Colors</button>
      <h3>Suggested Colors:</h3>
      <ul>
        {suggestedColors.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul>
    </div>
  );
};
export default TestPage;
