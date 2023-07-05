import React, { useState } from "react";
import styles from "../styles";

const Card = ({ img, alt }) => {
  const [selected, setSelected] = useState(false);

  const handleCardClick = () => {
    setSelected(!selected);
  };

  return (
    <div className="Card pb-10">
      <div
        className={`Card-conteiner bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-slate-100 cursor-pointer ${
          selected ? "shadow-green-400" : ""
        }`}
        onClick={handleCardClick}
      >
        <div className="Card-container_image">
          <img className="h-[400px]" src={img} alt={alt} />
        </div>
        <div
          className={`Card-container_select ${styles.flexCenter} p-3 ${
            selected ? "bg-green-400" : ""
          }`}
          alt={alt}
        >
          <div
            className={`$ inline-flex items-center px-12 text-center text-black ${styles.text}`}
            alt={alt}
          >
            Select
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
