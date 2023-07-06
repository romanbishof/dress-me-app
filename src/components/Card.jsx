import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterSelectionFrom, navigateToGarments } from "../redux/ClosetSlice";

const Card = ({ img, alt }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardSelect = (itemType) => {
    dispatch(filterSelectionFrom(itemType));
    navigate("/garments");
  };

  return (
    <div className="Card">
      <div className="imgBox">
        <img src={img} alt={alt} className="clothesItem" />
      </div>

      <div className="contentBox">
        <h3>{`Start with ${alt}`}</h3>

        <div
          className="start cursor-pointer"
          onClick={() => {
            handleCardSelect(alt);
            dispatch(navigateToGarments());
          }}
        >
          Build Set
        </div>
      </div>
    </div>
  );
};

export default Card;
