import React, { useState } from "react";
import { genericShirtImg } from "../assets";
import styles from "../styles";
import { useDispatch } from "react-redux";
import { buildSet } from "../redux/ClosetSlice";

const ClothesCard = ({ clothesItem }) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(false);

  const handleSelectItem = (clothesItem) => {
    dispatch(buildSet(clothesItem));
    setSelected(!selected);
  };
  return (
    <div className={`ClothesCard `}>
      <div className="px-8 pt-6">
        <img className="h-[200px]" src={genericShirtImg} alt="" />
      </div>
      <div className={` ${styles.flexCenter} pb-3 `}>
        <div className={`flex flex-col`}>
          <div
            className={`ClothesCard-info flex flex-col items-center font-poppins font-semibold text-[15px] ss:leading-[25px] leading-[15px]`}
          >
            <span>{clothesItem.brand}</span>
            <span>{clothesItem.size}</span>
            <span>{clothesItem.color}</span>
          </div>
          <button
            type="button"
            className={`${styles.button}`}
            onClick={() => handleSelectItem(clothesItem)}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClothesCard;
