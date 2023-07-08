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
      <div className="rounded-3xl drop-shadow-shadowCard ">
        <div className={`${styles.cardTop} pb-3 flex flex-col  items-center`}>
          <span className="inline-block text-4xl font-extrabold mt-2 opacity-30 ">
            My Set
          </span>
          <div className="product-detail flex flex-col mt-1 items-center">
            <h2 className="text-sm text-white tracking-widest uppercase">{`${set.date}`}</h2>
            <h2 className="text-xs text-white tracking-widest uppercase">{`elapsed time: ${set.elapsedTime}`}</h2>
          </div>
        </div>
        <div className="card-body h-[200px] rounded-b-3xl bg-white flex flex-col items-center">
          <div className="product-desc flex flex-row space-x-3 h-[200px] mt-2 border-b-2 ">
            <div className={`flex flex-col items-center w-full `}>
              <img src={shirtIcon} alt="" className="w-6 h-6" />
              <span className="text-xs pt-5 w-full ml-3">
                <h4>{`${set.shirt.brand}`}</h4>
                <h4>{`Size: ${set.shirt.size}`}</h4>
                <h4>{`Color: ${set.shirt.color}`}</h4>
              </span>
            </div>
            <div className={`border-r-2 border-gray-200 `}></div>
            <div className={`flex flex-col items-center w-full`}>
              <img src={trousersIcon} alt="" className="w-6 h-6" />
              <span className="text-xs pt-5 w-full ml-3">
                <h4>{`${set.pants.brand}`}</h4>
                <h4>{`Size: ${set.pants.size}`}</h4>
                <h4>{`Color: ${set.pants.color}`}</h4>
              </span>
            </div>
            <div className={`border-r-2 border-gray-200 `}></div>
            <div className={`flex flex-col items-center w-full`}>
              <img src={shoesIcon} alt="" className="w-6 h-6" />
              <span className="text-xs pt-5 w-[full] ml-1">
                <h4>{`${set.shoes.brand}`}</h4>
                <h4>{`Size: ${set.shoes.size}`}</h4>
                <h4>{`Color: ${set.shoes.color}`}</h4>
              </span>
            </div>
          </div>
          <div
            className="cursor-pointer flex justify-center items-center w-full py-2 hover:bg-addCloth rounded-3xl rounded-t-none  "
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
