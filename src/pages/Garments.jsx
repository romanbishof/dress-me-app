import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles";
import Filtering from "../components/Filtering";
import ClothesCard from "../components/ClothesCard";
import SuccesSetBuild from "../components/SuccesSetBuild";
import { buildSet } from "../redux/ClosetSlice";

// the component that renders our "main" component where user selects the items he wants to build the sets,
// and the app suggest relevent clothing items
const Garments = () => {
  const {
    data,
    filterSelection,
    selectedColor,
    selectedSize,
    shirtsArray,
    pantsArray,
    shoesArray,
  } = useSelector((state) => state.ClosetData);

  const dispatch = useDispatch();

  //#region arrays local state variables
  const [filters, setFilters] = useState({
    shoes: filterSelection.shoes,
    shirt: filterSelection.shirt,
    pants: filterSelection.pants,
  });
  const [firstOptionSelected, setFirstOptionSelected] = useState(false);
  const [shirtsArr, setShirtsArr] = useState(shirtsArray);
  const [pantsArr, setPantsArr] = useState(pantsArray);
  const [shoesArr, setShoesArr] = useState(shoesArray);
  const [selectedShirt, setSelectedShirt] = useState(filterSelection.shirt);
  const [selectedPants, setSelectedPants] = useState(filterSelection.pants);
  const [selectedShoes, setSelectedShoes] = useState(filterSelection.shoes);
  const [succesMsg, setSuccesMsg] = useState(false);
  // #endregion

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

  const allFiltersUnchecked = Object.values(filters).every((value) => !value);

  //#region useEffect scroll to begenning of page on page render next page
  //upon select 3 item from each category go to next page
  useEffect(() => {
    window.scrollTo(0, 0);
    // on page reload start building the set from start
    localStorage.setItem("startTime", JSON.stringify(new Date().getTime()));
    localStorage.setItem(
      "set",
      JSON.stringify({
        shirt: {},
        pants: {},
        shoes: {},
      })
    );
    setSuccesMsg(false);
  }, []);

  useEffect(() => {
    // once all items selectd trigger msg and save in state and localy
    if (selectedShirt && selectedPants && selectedShoes) {
      setSuccesMsg(true);
      dispatch(buildSet(JSON.parse(localStorage.getItem("set"))));
      localStorage.setItem("startTime", JSON.stringify(""));
    }
  }, [filterSelection.shirt, filterSelection.pants, filterSelection.shoes]);
  //#endregion

  // logic to check wich item still need to be selected
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
  const filterShirtBySize = filterBySize(shirtsArr);
  const filterpantsBySize = filterBySize(pantsArr);
  const filterShoesBySize = filterBySize(shoesArr);

  const filterShirtByColor = filterByColor(filterShirtBySize);
  const filterpantsByColor = filterByColor(filterpantsBySize);
  const filterShoesByColor = filterByColor(filterShoesBySize);
  // #endregion

  // algorithem to sugest clothes by size and color -> but the color is commented out
  const handleSuggestItems = (selectedItem) => {
    // Determine the person's size category based on the selected item's size
    let sizeCategory;
    const selectedType = selectedItem.type;
    const selectedSize = selectedItem.size;
    //define the persons size
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
    //This part responsible for filterig the color by our rules
    // but the lack of diverseti in colors and small data base makes it hard to build sets
    // ===> not inoth items :P

    // ?.filter((item) => {
    //   if (selectedColor === "black" || selectedColor === "white") {
    //     return true; // Allow any color for black or white selection
    //   } else if (selectedColor === "pink") {
    //     return item.color === "pink" || item.color === "green";
    //   } else if (selectedColor === "green") {
    //     return item.color === "green" || item.color === "pink" || item.color === "red";
    //   } else if (selectedColor === "red") {
    //     return item.color === "green" || item.color === "red";
    //   }
    //   return false;
    // });
    setShirtsArr(suggestedItems.filter((item) => item.type === "shirt"));
    setPantsArr(suggestedItems.filter((item) => item.type === "pants"));
    setShoesArr(suggestedItems.filter((item) => item.type === "shoes"));
  };

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
        {!succesMsg ? (
          <div className="Garments-body__Card p-10 flex flex-row  flex-wrap items-center justify-center">
            {allFiltersUnchecked &&
              !firstOptionSelected &&
              data?.map((item) => (
                <div className="Garments-body__showroom " key={item.id}>
                  <ClothesCard
                    clothesItem={item}
                    onItemSelected={handleItemSelected}
                    suggestItems={handleSuggestItems}
                  />
                </div>
              ))}

            {filterSelection.shirt &&
              filterShirtByColor.map((item) => (
                <div className="Garments-body__showroom " key={item.id}>
                  <ClothesCard
                    clothesItem={item}
                    onItemSelected={handleItemSelected}
                    suggestItems={handleSuggestItems}
                  />{" "}
                </div>
              ))}

            {filterSelection.pants &&
              filterpantsByColor.map((item) => (
                <div className="Garments-body__showroom " key={item.id}>
                  <ClothesCard
                    clothesItem={item}
                    onItemSelected={handleItemSelected}
                    suggestItems={handleSuggestItems}
                  />{" "}
                </div>
              ))}

            {filterSelection.shoes &&
              filterShoesByColor.map((item) => (
                <div className="Garments-body__showroom " key={item.id}>
                  <ClothesCard
                    clothesItem={item}
                    onItemSelected={handleItemSelected}
                    suggestItems={handleSuggestItems}
                  />{" "}
                </div>
              ))}
          </div>
        ) : (
          <div className="mt-4">
            <SuccesSetBuild />
          </div>
        )}
      </div>
    </div>
  );
};

export default Garments;
