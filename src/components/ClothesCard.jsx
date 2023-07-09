import React, { useEffect, useState } from "react";
import {
  clothesAddIcon,
  genericPantstImg,
  genericShirtImg,
  genericShoesImg,
} from "../assets";

import { useDispatch } from "react-redux";
import { buildSet, filterGarmentsSelection } from "../redux/ClosetSlice";
import styles from "../styles";

const ClothesCard = ({ clothesItem, onItemSelected, suggestItems }) => {
  const dispatch = useDispatch();
  const [imageOfProduct, setImageOfProduct] = useState("");

  const handleSelectItem = (clothesItem) => {
    dispatch(filterGarmentsSelection(clothesItem));
    buildSetFunction(clothesItem);
    onItemSelected(clothesItem);
    suggestItems(clothesItem);
  };

  const buildSetFunction = (clothesItem) => {
    switch (clothesItem.type) {
      case "shirt":
        {
          let setObj = JSON.parse(localStorage.getItem("set"));
          setObj.shirt = clothesItem;
          localStorage.setItem("set", JSON.stringify(setObj));
        }
        break;
      case "pants":
        {
          let setObj = JSON.parse(localStorage.getItem("set"));
          setObj.pants = clothesItem;
          localStorage.setItem("set", JSON.stringify(setObj));
        }
        break;
      case "shoes":
        {
          let setObj = JSON.parse(localStorage.getItem("set"));
          setObj.shoes = clothesItem;
          localStorage.setItem("set", JSON.stringify(setObj));
        }
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    switch (clothesItem.type) {
      case "shirt":
        setImageOfProduct(genericShirtImg);
        break;
      case "pants":
        setImageOfProduct(genericPantstImg);

        break;
      case "shoes":
        setImageOfProduct(genericShoesImg);

        break;

      default:
        break;
    }
  });

  return (
    <div className={`ClothesCard drop-shadow-shadowCard pb-4 px-7`}>
      <div className="w-[230px]  bg-white m-auto relative overflow-hidden rounded-2xl shadow-none transform scale-95 transition-shadow transition-transform duration-500 sm:hover:scale-100 sm:hover:shadow-lg">
        <div className="w-full h-full">
          <div className={`${styles.cardTop} bg-none`}>
            <span className="inline-block text-xl font-extrabold mt-2 opacity-30 ml-2">
              {clothesItem.brand}
            </span>
            <div className="product-detail  flex flex-col mt-1 items-center">
              <img
                className="h-60 w-full"
                src={imageOfProduct}
                alt={clothesItem.type}
              />
            </div>
          </div>
          <div className="bottom w-[200%] h-[20%] transition duration-500">
            <div className="left  w-[50%] relative float-left h-full">
              <div className="details ml-3 float-left w-calc-70-minus-40 mt-2">
                <h4>{clothesItem.size}</h4>
                <h4>{clothesItem.color}</h4>
              </div>
              <div
                className="buy cursor-pointer float-right w-calc-30-minus-2 hover:bg-addCloth h-full border-l border-solid border-gray-300 transition duration-500"
                onClick={() => {
                  handleSelectItem(clothesItem);
                }}
              >
                <img src={clothesAddIcon} alt="button add" className="p-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothesCard;
