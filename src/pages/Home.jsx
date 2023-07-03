import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Inventory from "../components/Inventory";
import Card from "../components/Card";
import { pantsImg, shirtImg, shoesImg } from "../assets";
import styles from "../styles";
import { useNavigate } from "react-router-dom";

function Home() {
  const [select, setSelected] = useState(false);

  const navigate = useNavigate();

  const handleCardSelect = (e) => {
    // console.log(e.target);
  };

  return (
    <div className="Home w-full overflow-hidden">
      <Header />

      <div className="Home__body">
        <div className="pt-7 pb-5 pl-24 pr-24">
          <Inventory />
        </div>
        <h2 className="flex justify-center text-center text-[25px] pb-8">
          <span>choose clothing to start building your set</span>
        </h2>

        {/* div containig the buttons */}
        <div className="Home__buttons flex sm:flex-row flex-col justify-around sm:items-start items-center ">
          <div onClick={handleCardSelect}>
            <Card img={shirtImg} alt="shirt" />
          </div>
          <div onClick={handleCardSelect}>
            <Card img={pantsImg} alt="pants" />
          </div>
          <div onClick={handleCardSelect}>
            <Card img={shoesImg} alt="shoes" />
          </div>
        </div>

        <div className={`Home__continuToSetBuild ${styles.flexCenter}`}>
          <button
            className={`${styles.text}  mt-8 bg-gray-400 rounded-lg text-white px-7 py-2 cursor-pointer hover:bg-slate-500 `}
            onClick={() => navigate("/garments")}
          >
            continue to build your set
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
