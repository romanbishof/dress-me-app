import React, { useState } from "react";
import ColorThief from "colorthief/dist/color-thief.min.js";
import {
  closest,
  furthest,
  diff,
  mapPalette,
  paletteMapKey,
  rgbaToLab,
  mapPaletteLab,
  labPaletteMapKey,
} from "color-diff";
import { colorWheel } from "../assets";

const TestPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [colors, setColors] = useState([]);
  const [matchingColors, setMatchingColors] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleColorInputChange = (event) => {
    const colorList = event.target.value.split(",");
    setColors(colorList.map((color) => color.trim()));
  };

  const generateMatchingColors = async () => {
    if (imageFile && colors.length > 0) {
      const colorPalette = await extractColorPalette(imageFile);
      const matchingColors = matchColorsToPalette(colors, colorPalette);
      setMatchingColors(matchingColors);
    }
  };

  const extractColorPalette = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.src = url;

        img.onload = () => {
          const colorThief = new ColorThief();
          const colorPalette = colorThief.getPalette(img, 8); // Adjust the number of colors extracted as per your preference
          resolve(colorPalette);
          URL.revokeObjectURL(url);
        };

        img.onerror = (error) => {
          reject(error);
        };
      };

      reader.readAsDataURL(file);
    });
  };

  const matchColorsToPalette = (closetColors, colorPalette) => {
    const matchingColors = [];

    for (let i = 0; i < closetColors.length; i++) {
      const currentColor = closetColors[i];
      const closestMatch = findClosestMatch(currentColor, colorPalette);
      if (closestMatch) {
        matchingColors.push(currentColor, closestMatch);
      }
    }

    return matchingColors;
  };

  const findClosestMatch = (color, colorPalette) => {
    const colorLab = colorDiff.rgb_to_lab(colorDiff.css_to_rgb(color));

    let closestMatch = null;
    let minDiff = Number.MAX_VALUE;

    for (let i = 0; i < colorPalette.length; i++) {
      const paletteColor = colorPalette[i];
      const paletteLab = colorDiff.rgb_to_lab(paletteColor);

      const diff = colorDiff.diff(colorLab, paletteLab);
      if (diff < minDiff) {
        minDiff = diff;
        closestMatch = paletteColor;
      }
    }

    return closestMatch;
  };

  return (
    <div>
      <h1>Color Matching App</h1>
      <div>
        <label htmlFor="image-upload">Upload an Image:</label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <div>
        <label htmlFor="color-input">Enter colors:</label>
        <input
          type="text"
          id="color-input"
          placeholder=" black, pink, red, white, green, gray, blue, purple, orange"
          onChange={handleColorInputChange}
        />
      </div>
      <button onClick={generateMatchingColors}>Generate Matching Colors</button>
      {matchingColors.length > 0 && (
        <div>
          <h2>Matching Colors:</h2>
          {matchingColors.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color,
                width: "50px",
                height: "50px",
                display: "inline-block",
                margin: "5px",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default TestPage;
