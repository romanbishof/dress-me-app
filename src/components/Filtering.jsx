import React from "react";
import { useSelector } from "react-redux";

const Filtering = ({ filterType }) => {
  const { filterSelection, itemsTypesObj } = useSelector(
    (state) => state.ClosetData
  );

  const values = Object.keys(itemsTypesObj)
    .filter((key) => filterSelection[key])
    .flatMap((key) => itemsTypesObj[key][filterType + "s"])
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="Filtering flex items-center pl-4 border-gray-200 rounded w-[200px]">
      <select
        id={filterType}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue={filterType}>{filterType}</option>
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
