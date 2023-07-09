import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterSelectionFrom, navigateToGarments } from "../redux/ClosetSlice";

// Home Card component
const Card = ({ img, alt }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardSelect = (itemType) => {
    dispatch(filterSelectionFrom(itemType));
    dispatch(navigateToGarments());
    navigate("/garments");
  };

  return (
    <div className="Card rounded-3xl drop-shadow-shadowCard mb-10">
      <div className="imgBox">
        <img src={img} alt={alt} className="clothesItem" />
      </div>

      <div className="Card-body contentBox relative p-5 flex flex-col justify-center items-center ">
        <h3>{`Start with ${alt}`}</h3>

        <div
          className="Card-action start cursor-pointer"
          onClick={() => {
            handleCardSelect(alt);
          }}
        >
          Build Set
        </div>
      </div>
    </div>
  );
};

export default Card;
