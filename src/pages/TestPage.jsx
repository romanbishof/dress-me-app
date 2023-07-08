import React, { useEffect, useState } from "react";
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

import colorNameList from "color-name-list";
import * as ColorDiff from "color-diff";
import color from "color";
import { convert } from "color-convert";
const TestPage = () => {
  const [closetColors, setClosetColors] = useState([]);
  const [colorPalette, setColorPalette] = useState([]);
  const [closestMatches, setClosestMatches] = useState([]);

  useEffect(() => {
    // Set the closet colors
    const closetColors = ["red", "green", "blue", "pink", "black"];
    setClosetColors(closetColors);

    // Load the color palette image
    const image = new Image();
    image.src = colorWheel;
    image.addEventListener("load", () => {
      setColorPalette(getColorPaletteFromImage(image));
    });
  }, []);

  useEffect(() => {
    if (closetColors.length > 0 && colorPalette.length > 0) {
      findClosestMatches();
    }
  }, [closetColors, colorPalette]);

  const getColorPaletteFromImage = (image) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the canvas dimensions to match the image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image onto the canvas
    context.drawImage(image, 0, 0);

    // Get the image data
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const colorSet = new Set();

    // Iterate through the pixels and extract unique colors
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Create a unique color key using RGB values
      const colorKey = `${r}-${g}-${b}`;

      // Add the color key to the color set
      colorSet.add(colorKey);
    }

    // Convert the color set to an array
    const colorPalette = Array.from(colorSet).map((colorKey) => {
      const [r, g, b] = colorKey.split("-").map(Number);
      return { r, g, b };
    });

    return colorPalette;
  };

  const findClosestMatches = () => {
    const closestMatches = [];

    for (let i = 0; i < closetColors.length; i++) {
      const colorName = closetColors[i];
      const color = getColorFromName(colorName);
      const closestMatch = ColorDiff.closest(color, colorPalette);
      closestMatches.push(closestMatch);
    }

    setClosestMatches(closestMatches);
  };

  //   const getColorFromName = (colorName) => {
  //     switch (colorName) {
  //       case "red":
  //         return { r: 255, g: 0, b: 0 };
  //       case "green":
  //         return { r: 0, g: 255, b: 0 };
  //       case "blue":
  //         return { r: 0, g: 0, b: 255 };
  //       // Add more color mappings as needed
  //       default:
  //         return { r: 0, g: 0, b: 0 }; // Default to black if the color name is not recognized
  //     }
  //   };
  const colorNameToHex = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
    // Add more color name to hexadecimal code mappings as needed
  };

  const getColorFromName = (colorName) => {
    const lowercaseColorName = colorName.toLowerCase();

    const colorObject = colorNameList.find(
      (color) => color.name.toLowerCase() === lowercaseColorName
    );

    if (colorObject) {
      return colorObject.hex;
    }

    return ""; // Return an empty string for unrecognized color names
  };

  return (
    <div>
      <h1>Color Matching Results</h1>
      {closestMatches.map((match, index) => (
        <div key={index}>
          <div
            style={{
              backgroundColor: `rgb(${match.r}, ${match.g}, ${match.b})`,
              width: "50px",
              height: "50px",
              margin: "5px",
            }}
          ></div>
          <p>
            Closest Match: rgb({match.r}, {match.g}, {match.b})
          </p>
        </div>
      ))}
    </div>
  );
};
export default TestPage;
