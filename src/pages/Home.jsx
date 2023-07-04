import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Inventory from "../components/Inventory";
import Card from "../components/Card";
import { pantsImg, shirtImg, shoesImg } from "../assets";
import styles from "../styles";
import { useNavigate } from "react-router-dom";
import { filterSelectionFromHome } from "../redux/ClosetSlice";

function Home() {
  const [select, setSelected] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardSelect = (e) => {
    dispatch(filterSelectionFromHome(e.target.alt));
  };

  return (
    <div className="Home w-full overflow-hidden">
      <Header />

      <div className="Home__body">
        <div className="sm:px-24 px-5 py-5 ">
          <Inventory />
        </div>
        <h2 className="flex justify-center text-center text-[25px] pb-8">
          <span>choose clothing to start building your set</span>
        </h2>

        {/* div containig the buttons */}
        <div className="Home__buttons flex md:flex-row flex-col justify-around  md:items-start items-center ">
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

        <div className={`Home__continuToSetBuild ${styles.flexCenter} pb-10`}>
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
