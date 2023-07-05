import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import styles from "../styles";
import { genericShirtImg } from "../assets";

const Garments = () => {
  const { data, filterSelection, itemsTypesObj } = useSelector(
    (state) => state.ClosetData
  );

  const [selected, setSelected] = useState({});

  const [filters, setFilters] = useState({
    shoes: filterSelection.shoes,
    shirt: filterSelection.shirt,
    pants: filterSelection.pants,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const allFiltersUnchecked = Object.values(filters).every((value) => !value);

  return (
    <div className="Garments">
      <Header />
      <div className="Garments-body flex flex-col">
        <div
          className={`Garments-filterOption ${styles.text} ${styles.flexCenter} flex-row`}
        >
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
          <div className="flex items-center pl-4  border-gray-200 rounded w-[200px]">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={"Color"}>Color</option>
              {Array.from(
                new Set(
                  Object.keys(itemsTypesObj)
                    .filter((key) => filters[key])
                    .flatMap((key) => itemsTypesObj[key].colors)
                )
              ).map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center pl-4  border-gray-200 rounded w-[200px]">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={"Size"}>Size</option>
              {Array.from(
                new Set(
                  Object.keys(itemsTypesObj)
                    .filter((key) => filters[key])
                    .flatMap((key) => itemsTypesObj[key].sizes)
                )
              ).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="Garments-showroom flex flex-wrap justify-center">
          {data
            ?.filter((item) => {
              if (allFiltersUnchecked) {
                return true; // Render all data when no checkboxes are checked
              } else {
                return filters[item.type];
              }
            })
            .map((item) => {
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
