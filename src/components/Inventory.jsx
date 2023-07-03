import React, { useEffect, useState } from "react";
import data from "../data.json";
import styles from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { shirtIcon, shoesIcon, trousersIcon } from "../assets";

const Inventory = () => {
  const { shirts, pants, shoes } = useSelector((state) => state.ClosetData);

  const [closet, setCloset] = useState({
    shirts: 0,
    pants: 0,
    shoes: 0,
  });
  useEffect(() => {
    setCloset({
      shirts: shirts,
      pants: pants,
      shoes: shoes,
    });
  }, [shirts, pants, shoes]);

  // //   check if local storage has clothig count if not then count the clothes we have
  // useEffect(() => {
  //   const storedCount = JSON.parse(localStorage.getItem("clothingCount"));
  //   if (storedCount && storedCount.lengthOfData === data.length) {
  //     setCount(storedCount);
  //   } else {
  //     countClothingItems();
  //   }
  // }, [data]);

  // useEffect(() => {
  //   localStorage.setItem("clothingCount", JSON.stringify(count));
  // }, [count]);

  // const countClothingItems = () => {
  //   let shirtCount = 0;
  //   let pantCount = 0;
  //   let shoeCount = 0;
  //   let dataLenght = data.length;

  //   data.forEach((item) => {
  //     if (item.type === "shirt") {
  //       shirtCount++;
  //     } else if (item.type === "pants") {
  //       pantCount++;
  //     } else if (item.type === "shoes") {
  //       shoeCount++;
  //     }
  //   });

  // setCount({
  //   shirts: shirtCount,
  //   pants: pantCount,
  //   shoes: shoeCount,
  //   lengthOfData: dataLenght,
  // });
  // };

  return (
    <div className="Inventory flex flex-row justify-between bg-gray-300 pl-12 pr-12 pt-1 pb-1 text-black font-poppins font-semibold ss:text-[30px] text-[25px] ss:leading-[45px] leading-[25px]">
      <div className="container border-r-4 border-black">
        <div className={`${styles.flexCenter}`}>
          <p>{`In the stock`}</p>
        </div>
      </div>
      <div className="container border-r-4 border-black">
        <div className={`${styles.flexCenter} mr-7 space-x-4`}>
          <p> {closet.shirts}</p>
          <img className="w-10 h-10" src={shirtIcon} alt="shirt" />
        </div>
      </div>
      <div className="container border-r-4 border-black">
        <div className={`${styles.flexCenter} mr-7 space-x-4`}>
          <p> {closet.pants}</p>
          <img className="w-10 h-10" src={trousersIcon} alt="shirt" />
        </div>
      </div>
      <div className="container">
        <div className={`${styles.flexCenter} mr-7 space-x-4`}>
          <p> {closet.shoes}</p>
          <img className="w-10 h-10" src={shoesIcon} alt="shirt" />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
