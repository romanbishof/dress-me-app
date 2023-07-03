import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import styles from "../styles";
import { genericShirtImg } from "../assets";

const Garments = () => {
  const { data } = useSelector((state) => state.ClosetData);

  const [filters, setFilters] = useState({
    shoes: false,
    shirt: false,
    pants: false,
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
      <div className="Garments-body flex">
        <div className={`Garments-filterOption ${styles.text}`}>
          <div
            className={`flex items-center pl-4 border border-gray-200 rounded w-[250px] `}
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
          <div className="flex items-center pl-4 border border-gray-200 rounded">
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
          <div className="flex items-center pl-4 border border-gray-200 rounded">
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

        <div className="Garments-showroom flex flex-wrap ">
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
                    <img className="h-[400px]" src={genericShirtImg} alt="" />
                  </div>
                  <div className={` ${styles.flexCenter} pb-3 `}>
                    <div
                      className={`flex flex-col items-center px-12 text-center text-black font-poppins font-semibold ss:text-[30px] text-[20px] ss:leading-[35px] leading-[15px] `}
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
