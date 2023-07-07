import React, { useState } from "react";
import { clothesAddIcon, genericShirtImg } from "../assets";
import styles from "../styles";
import { useDispatch } from "react-redux";
import { buildSet, filterGarmentsSelection } from "../redux/ClosetSlice";

const ClothesCard = ({ clothesItem }) => {
  const dispatch = useDispatch();

  const handleSelectItem = (clothesItem) => {
    dispatch(filterGarmentsSelection(clothesItem));
    dispatch(buildSet(clothesItem));
  };
  return (
    <div className={`ClothesCard `}>
      {/* <div className="px-8 pt-6">
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
      </div> */}
      <div className="wrapper">
        <div className="w-full h-full">
          <div className="top">
            <img src={genericShirtImg} alt="" />
          </div>
          <div className="bottom w-[200%] h-[20%] transition duration-500">
            <div className="left  w-[50%] relative float-left h-full">
              <div className="details ml-3 float-left w-calc-70-minus-40">
                <h4>{clothesItem.brand}</h4>
                <h4>{clothesItem.size}</h4>
                <h4>{clothesItem.color}</h4>
              </div>
              <div
                className="buy cursor-pointer float-right w-calc-30-minus-2 hover:bg-addCloth h-full border-l border-solid border-gray-300 transition duration-500"
                onClick={() => {
                  handleSelectItem(clothesItem);
                }}
              >
                <img src={clothesAddIcon} alt="" className="p-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothesCard;
