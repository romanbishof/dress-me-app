import React, { useEffect, useState } from "react";
import styles from "../styles";
import { useSelector } from "react-redux";
import { shirtIcon, shoesIcon, trousersIcon } from "../assets";

const Inventory = () => {
  const { shirts, pants, shoes } = useSelector((state) => state.ClosetData);

  const [closet, setCloset] = useState({
    shirts: shirts,
    pants: pants,
    shoes: shoes,
  });
  console.log(closet);
  useEffect(() => {
    setCloset({
      shirts: shirts,
      pants: pants,
      shoes: shoes,
    });
  }, [shirts, pants, shoes]);

  return (
    <div className="Inventory flex flex-row bg-gray-300 rounded-2xl sm:px-0 px-0 py-1 text-black font-poppins font-semibold sm:text-[30px] text-[25px] sm:leading-[45px] leading-[25px]">
      <div className="container border-r-4 border-black md:block hidden ">
        <div className={`${styles.flexCenter}`}>
          <p>{`In the stock`}</p>
        </div>
      </div>
      <div className="container border-r-4 border-black">
        <div className={`${styles.flexCenter}  space-x-4`}>
          <p> {closet.shirts}</p>
          <img className="w-10 h-10" src={shirtIcon} alt="shirt" />
        </div>
      </div>
      <div className="container border-r-4 border-black">
        <div className={`${styles.flexCenter}  space-x-4`}>
          <p> {closet.pants}</p>
          <img className="w-10 h-10" src={trousersIcon} alt="shirt" />
        </div>
      </div>
      <div className="container">
        <div className={`${styles.flexCenter}  space-x-4`}>
          <p> {closet.shoes}</p>
          <img className="w-10 h-10" src={shoesIcon} alt="shirt" />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
