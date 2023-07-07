import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles";
import Filtering from "../components/Filtering";
import { filterSelectionFrom } from "../redux/ClosetSlice";
import ClothesCard from "../components/ClothesCard";
import { useNavigate } from "react-router-dom";

const Garments = () => {
  const { data, filterSelection, garmentsPage, selectedColor, selectedSize } =
    useSelector((state) => state.ClosetData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    shoes: filterSelection.shoes,
    shirt: filterSelection.shirt,
    pants: filterSelection.pants,
  });

  //#region arrays
  const [shirts, setShirts] = useState(
    data?.filter((item) => item.type === "shirt")
  );
  // console.log(shirts);
  const [pants, setPants] = useState(
    data?.filter((item) => item.type === "pants")
  );
  // console.log(pants);
  const [shoes, setShoes] = useState(
    data?.filter((item) => item.type === "shoes")
  );
  // console.log(shoes);
  // #endregion

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

  // const filterItemType = data?.filter((item) => {
  //   if (allFiltersUnchecked) {
  //     return true; // Render all data when no checkboxes are checked
  //   } else {
  //     return filters[item.type];
  //   }
  // });

  // scroll to begenning of page on page render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (filterSelection.shirt) {
      setSelectedShirt(true);
    }
    if (filterSelection.pants) {
      setSelectedPants(true);
    }
    if (filterSelection.shoes) {
      setSelectedShoes(true);
    }
    if (selectedShirt && selectedPants && selectedShoes) {
      // All items are selected, trigger the redirection
      navigate("/my_space");
    }
  }, [filterSelection.shirt, filterSelection.pants, filterSelection.shoes]);

  // const filteredBySize = filterBySize(filterItemType);
  // const filteredByColor = filterByColor(filteredBySize);

  const filterShirtBySize = filterBySize(shirts);
  const filterpantsBySize = filterBySize(pants);
  const filterShoesBySize = filterBySize(shoes);

  const filterShirtByColor = filterByColor(filterShirtBySize);
  const filterpantsByColor = filterByColor(filterpantsBySize);
  const filterShoesByColor = filterByColor(filterShoesBySize);

  return (
    <div className="Garments">
      <Header title={"Garments"} />
      <div className="Garments-body flex flex-col sm:px-10">
        <div
          className={`Garments-filterOption ${styles.text} ${styles.flexCenter} flex-row`}
        >
          {/* <div className={`flex flex-row ${garmentsPage ? "hidden" : "block"}`}>
            <div
              className={`flex items-center pl-4 border border-gray-200 rounded w-[100px] `}
            >
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 hover:cursor-pointer"
                type="checkbox"
                name="shirt"
                id="shirt"
                value={"shirt"}
                checked={filters.shirt}
                onChange={handleCheckboxChange}
              />
              <label
                className="w-full py-4 ml-2 text-sm  text-gray-900 hover:cursor-pointer"
                htmlFor="shirt"
              >
                Shirts
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded w-[100px]">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 hover:cursor-pointer"
                type="checkbox"
                name="pants"
                id="pants"
                value={"pants"}
                checked={filters.pants}
                onChange={handleCheckboxChange}
              />
              <label
                className="w-full py-4 ml-2 text-sm  text-gray-900 hover:cursor-pointer"
                htmlFor="pants"
              >
                Pants
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded w-[100px]">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 hover:cursor-pointer"
                type="checkbox"
                name="shoes"
                id="shoes"
                value={"shoes"}
                checked={filters.shoes}
                onChange={handleCheckboxChange}
              />
              <label
                className="w-full py-4 ml-2 text-sm  text-gray-900 hover:cursor-pointer"
                htmlFor="shoes"
              >
                Shoes
              </label>
            </div>
          </div> */}

          <Filtering filterType={"color"} />

          <Filtering filterType={"size"} />
        </div>

        {filterSelection.shirt && (
          <div className="Garments-showroom flex flex-row flex-wrap justify-between ">
            {filterShirtByColor.map((item) => (
              <div className="mr-5" key={item.id}>
                <ClothesCard clothesItem={item} />
              </div>
            ))}
          </div>
        )}

        {filterSelection.pants && (
          <div className="Garments-showroom flex flex-wrap ">
            {filterpantsByColor.map((item) => (
              <div key={item.id}>
                <ClothesCard clothesItem={item} />
              </div>
            ))}
          </div>
        )}

        {filterSelection.shoes && (
          <div className="Garments-showroom flex flex-wrap ">
            {filterShoesByColor.map((item) => (
              <div key={item.id}>
                <ClothesCard clothesItem={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Garments;
