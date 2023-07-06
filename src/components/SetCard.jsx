import React from "react";
import { shirtIcon, shoesIcon, trousersIcon } from "../assets";
import styles from "../styles";
import { useDispatch } from "react-redux";
import { deleteSet } from "../redux/ClosetSlice";

const SetCard = ({ set }) => {
  const dispatch = useDispatch();
  const handleDeletSet = (_set) => {
    dispatch(deleteSet(_set.id));
  };

  return (
    <div className="Container">
      <div className="card">
        <div className="card-head"></div>
        <div className="card-body h-[230px] rounded-b-3xl bg-white flex flex-col items-center">
          <div className="product-desc flex flex-row space-x-3 h-[200px] mt-2 border-b-2 ">
            <div className={`flex flex-col items-center w-full `}>
              <img src={shirtIcon} alt="" className="w-9 h-9" />
              <span className="text-xs pt-5 w-full ">
                <h4>{`${set.shirt.brand}`}</h4>
                <h4>{`Size: ${set.shirt.size}`}</h4>
                <h4>{`Color: ${set.shirt.color}`}</h4>
              </span>
            </div>
            <div className={`border-r-2 border-gray-200 `}></div>
            <div className={`flex flex-col items-center w-full`}>
              <img src={trousersIcon} alt="" className="w-9 h-9" />
              <span className="text-xs pt-5 w-full">
                <h4>{`${set.pants.brand}`}</h4>
                <h4>{`Size: ${set.pants.size}`}</h4>
                <h4>{`Color: ${set.pants.color}`}</h4>
              </span>
            </div>
            <div className={`border-r-2 border-gray-200 `}></div>
            <div className={`flex flex-col items-center w-full`}>
              <img src={shoesIcon} alt="" className="w-9 h-9" />
              <span className="text-xs pt-5 w-full">
                <h4>{`${set.shoes.brand}`}</h4>
                <h4>{`Size: ${set.shoes.size}`}</h4>
                <h4>{`Color: ${set.shoes.color}`}</h4>
              </span>
            </div>

            {/* <span className="product-caption">Basket Ball Collection</span> */}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleDeletSet(set);
            }}
          >
            {"Delete"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetCard;
