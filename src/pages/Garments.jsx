import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles";
import Filtering from "../components/Filtering";
import ClothesCard from "../components/ClothesCard";
import { useNavigate } from "react-router-dom";
import { setBuild } from "../redux/ClosetSlice";

const Garments = () => {
  const { data, filterSelection, selectedColor, selectedSize } = useSelector(
    (state) => state.ClosetData
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    shoes: filterSelection.shoes,
    shirt: filterSelection.shirt,
    pants: filterSelection.pants,
  });

  const [firstOptionSelected, setFirstOptionSelected] = useState(false);
  const colorPalette = [
    "white",
    "black",
    "purple",
    "gray",
    "orange",
    "yellow",
    "brown",
    "red",
    "pink",
    "green",
  ];
  const [userColor, setUserColor] = useState("");
  // const [suggestedColors, setSuggestedColors] = useState([]);
  // console.log(suggestedColors);

  const handleColorChange = (item) => {
    setUserColor(item.color);
  };

  const suggestColors = (itemColor) => {
    const similarityScores = colorPalette.map((color) => {
      const similarityScore = calculateSimilarity(itemColor, color);
      return { color, similarityScore };
    });

    similarityScores.sort((a, b) => a.similarityScore - b.similarityScore);

    const topSuggestions = similarityScores
      .slice(1, 4)
      .map((entry) => entry.color);

    // If there are no color matches, return white and black
    if (topSuggestions.length === 0) {
      // setSuggestedColors(["white", "black"]);
      return ["white", "black"];
    } else {
      // setSuggestedColors(topSuggestions);
      return topSuggestions;
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

  //#region arrays
  const [shirts, setShirts] = useState(
    data?.filter((item) => item.type === "shirt")
  );

  const [pants, setPants] = useState(
    data?.filter((item) => item.type === "pants")
  );

  const [shoes, setShoes] = useState(
    data?.filter((item) => item.type === "shoes")
  );

  // #endregion

  // #region phase1

  const [selectedShirt, setSelectedShirt] = useState(filterSelection.shirt);
  const [selectedPants, setSelectedPants] = useState(filterSelection.pants);
  const [selectedShoes, setSelectedShoes] = useState(filterSelection.shoes);

  // Function to filter by size
  const filterBySize = (items) => {
    if (selectedSize === "") {
      return items; // No size selected, return all items
    } else {
      return items.filter((item) => item.size === selectedSize);
    }
  };

  // Function to filter by color
  const filterByColor = (items) => {
    if (selectedColor === "") {
      return items; // No color selected, return all items
    } else {
      return items.filter((item) => item.color === selectedColor);
    }
  };

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [name]: checked,
  //   }));
  //   dispatch(filterSelectionFrom(event.target.name));
  // };

  const allFiltersUnchecked = Object.values(filters).every((value) => !value);

  //#region useEffect scroll to begenning of page on page render and
  //upon select 3 item from each category go to next page
  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.setItem("startTime", JSON.stringify(new Date().getTime()));
  }, []);

  useEffect(() => {
    if (selectedShirt && selectedPants && selectedShoes) {
      dispatch(setBuild(true));
      // All items are selected, trigger the redirection
      navigate("/my_space");
      localStorage.setItem("startTime", JSON.stringify(""));
    }
  }, [filterSelection.shirt, filterSelection.pants, filterSelection.shoes]);
  //#endregion

  const handleItemSelected = (item) => {
    switch (item.type) {
      case "shirt":
        {
          setSelectedShirt(true);
          setFirstOptionSelected(true);
        }
        break;
      case "pants":
        {
          setSelectedPants(true);
          setFirstOptionSelected(true);
        }
        break;
      case "shoes":
        {
          setSelectedShoes(true);
          setFirstOptionSelected(true);
        }
        break;

      default:
        break;
    }
  };

  //#region filtering
  const filterShirtBySize = filterBySize(shirts);
  const filterpantsBySize = filterBySize(pants);
  const filterShoesBySize = filterBySize(shoes);

  const filterShirtByColor = filterByColor(filterShirtBySize);
  const filterpantsByColor = filterByColor(filterpantsBySize);
  const filterShoesByColor = filterByColor(filterShoesBySize);
  // #endregion

  const handleSuggestItemsBySize = (selectedItem) => {
    // Determine the person's size category based on the selected item's size
    let sizeCategory;
    const selectedType = selectedItem.type;
    const selectedSize = selectedItem.size;

    let suggestedColors = suggestColors(selectedItem.color);
    console.log(suggestedColors);

    if (selectedType === "shirt") {
      if (selectedSize === "S") {
        sizeCategory = "small";
      } else if (selectedSize === "M" || selectedSize === "L") {
        sizeCategory = "average";
      } else {
        sizeCategory = "large";
      }
    } else if (selectedType === "shoes" || selectedType === "pants") {
      if (selectedSize < 38) {
        sizeCategory = "small";
      } else if (selectedSize >= 38 && selectedSize <= 42) {
        sizeCategory = "average";
      } else {
        sizeCategory = "large";
      }
    } else {
      // Invalid type selected
      return [];
    }

    // Filter the data based on the size category and suggest relevant items
    const suggestedItems = data?.filter((item) => {
      if (item.type !== selectedItem.type) {
        if (sizeCategory === "small") {
          return (
            (item.type === "shirt" &&
              (item.size === "S" || item.size === "M")) ||
            (item.type === "pants" && item.size < 38) ||
            (item.type === "shoes" && item.size < 38)
          );
        } else if (sizeCategory === "average") {
          return (
            (item.type === "shirt" &&
              (item.size === "M" || item.size === "L")) ||
            (item.type === "pants" && item.size >= 38 && item.size <= 42) ||
            (item.type === "shoes" && item.size >= 38 && item.size <= 42)
          );
        } else {
          return (
            (item.type === "shirt" &&
              (item.size === "XL" || item.size === "XXL")) ||
            (item.type === "pants" && item.size > 42) ||
            (item.type === "shoes" && item.size > 42)
          );
        }
      }
      return false;
    });
    setShirts(suggestedItems.filter((item) => item.type === "shirt"));
    setPants(suggestedItems.filter((item) => item.type === "pants"));
    setShoes(suggestedItems.filter((item) => item.type === "shoes"));
  };
  //#endregion

  return (
    <div className="Garments">
      <Header title={"Garments"} />
      <div className="Garments-body flex flex-col">
        <div
          className={`Garments-body__filterOption ${styles.text} ${styles.flexCenter} flex-row`}
        >
          <Filtering filterType={"color"} />

          <Filtering filterType={"size"} />
        </div>
        <div className="Garments-body__Card p-10">
          {allFiltersUnchecked && !firstOptionSelected && (
            <div className="Garments-showroom  flex flex-row flex-wrap justify-center ">
              {data?.map((item) => (
                <div className="Garments-body__showroom mr-10" key={item.id}>
                  <ClothesCard
                    clothesItem={item}
                    onItemSelected={handleItemSelected}
                    suggestItems={handleSuggestItemsBySize}
                  />
                </div>
              ))}
            </div>
          )}

          {filterSelection.shirt && (
            <div className="Garments-showroom flex flex-row flex-wrap justify-center ">
              {filterShirtByColor.map((item) => (
                <div className="Garments-body__showroom mr-10" key={item.id}>
                  <ClothesCard
                    clothesItem={item}
                    onItemSelected={handleItemSelected}
                    suggestItems={handleSuggestItemsBySize}
                  />{" "}
                </div>
              ))}
            </div>
          )}

          {filterSelection.pants && (
            <div className="Garments-showroom flex flex-row flex-wrap justify-center ">
              {filterpantsByColor.map((item) => (
                <div className="Garments-body__showroom mr-10" key={item.id}>
                  <ClothesCard
                    clothesItem={item}
                    onItemSelected={handleItemSelected}
                    suggestItems={handleSuggestItemsBySize}
                  />{" "}
                </div>
              ))}
            </div>
          )}

          {filterSelection.shoes && (
            <div className="Garments-showroom flex flex-row flex-wrap  justify-center">
              {filterShoesByColor.map((item) => (
                <div className="Garments-body__showroom mr-10" key={item.id}>
                  <ClothesCard
                    clothesItem={item}
                    onItemSelected={handleItemSelected}
                    suggestItems={handleSuggestItemsBySize}
                  />{" "}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Garments;
