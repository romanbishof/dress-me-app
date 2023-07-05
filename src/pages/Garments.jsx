import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles";
import { genericShirtImg } from "../assets";
import Filtering from "../components/Filtering";
import { filterSelectionFrom } from "../redux/ClosetSlice";

const Garments = () => {
  const { data, filterSelection, garmentsPage, selectedColor, selectedSize } =
    useSelector((state) => state.ClosetData);

  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    shoes: filterSelection.shoes,
    shirt: filterSelection.shirt,
    pants: filterSelection.pants,
  });

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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
    dispatch(filterSelectionFrom(event.target.name));
  };

  const allFiltersUnchecked = Object.values(filters).every((value) => !value);

  const filterItemType = data?.filter((item) => {
    if (allFiltersUnchecked) {
      return true; // Render all data when no checkboxes are checked
    } else {
      return filters[item.type];
    }
  });

  // scroll to begenning of page on page render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredBySize = filterBySize(filterItemType);
  const filteredByColor = filterByColor(filteredBySize);

  return (
    <div className="Garments">
      <Header />
      <div className="Garments-body flex flex-col ">
        <div
          className={`Garments-filterOption ${styles.text} ${styles.flexCenter} flex-row`}
        >
          <div className={`flex flex-row ${garmentsPage ? "hidden" : "block"}`}>
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
          </div>

          <Filtering filterType={"color"} />

          <Filtering filterType={"size"} />
        </div>

        <div className="Garments-showroom flex flex-wrap justify-center">
          {filteredByColor.map((item) => {
            return (
              <div key={item.id}>
                <div className="px-8 pt-6">
                  <img className="h-[200px]" src={genericShirtImg} alt="" />
                </div>
                <div className={` ${styles.flexCenter} pb-3 `}>
                  <div
                    className={`flex flex-col items-center  text-center text-black font-poppins font-semibold text-[15px] ss:leading-[25px] leading-[15px] `}
                  >
                    <span>{item.brand}</span>
                    <span>{item.size}</span>
                    <span>{item.color}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Garments;
