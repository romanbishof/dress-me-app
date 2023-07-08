import React, { useEffect, useState } from "react";
import {
  clothesAddIcon,
  genericPantstImg,
  genericShirtImg,
  genericShoesImg,
} from "../assets";

import { useDispatch } from "react-redux";
import { buildSet, filterGarmentsSelection } from "../redux/ClosetSlice";

const ClothesCard = ({ clothesItem, onItemSelected }) => {
  const dispatch = useDispatch();
  const [imageOfProduct, setImageOfProduct] = useState("");

  const handleSelectItem = (clothesItem) => {
    dispatch(filterGarmentsSelection(clothesItem));
    dispatch(buildSet(clothesItem));
    onItemSelected(clothesItem);
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
    <div className={`ClothesCard `}>
      <div className="w-[230px] h-[380px] bg-white m-auto relative overflow-hidden rounded-lg shadow-none transform scale-95 transition-shadow transition-transform duration-500 sm:hover:scale-100 sm:hover:shadow-lg">
        <div className="w-full h-full">
          <div className="top">
            <img src={imageOfProduct} alt={clothesItem.type} />
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
