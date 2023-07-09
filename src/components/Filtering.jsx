import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedColor, setSelectedSize } from "../redux/ClosetSlice";

// the component thats responsible for filtering options in the garments component the select element
const Filtering = ({ filterType }) => {
  const { filterSelection, itemsTypesObj } = useSelector(
    (state) => state.ClosetData
  );

  const dispatch = useDispatch();

  // geting all our values by types that exist in our data
  const values = Object.keys(itemsTypesObj)
    .filter((key) => filterSelection[key])
    .flatMap((key) => itemsTypesObj[key][filterType + "s"])
    .filter((value, index, self) => self.indexOf(value) === index);

  // handle the change of the selected filter option in garments
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (filterType === "color") {
      dispatch(setSelectedColor(selectedValue));
    } else if (filterType === "size") {
      dispatch(setSelectedSize(selectedValue));
    }
  };

  return (
    <div
      className={`Filtering flex flex-col fon pl-4 border-gray-200 rounded w-[200px] `}
    >
      <label className={`text-base`} htmlFor={filterType}>
        {filterType}
      </label>
      <select
        placeholder={filterType}
        id={filterType}
        className="data-te-select-init bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleSelectChange}
      >
        <option value={""}>{"All"}</option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filtering;
