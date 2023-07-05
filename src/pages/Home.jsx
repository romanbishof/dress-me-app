import { useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Inventory from "../components/Inventory";
import Card from "../components/Card";
import { pantsImg, shirtImg, shoesImg } from "../assets";
import styles from "../styles";
import { useNavigate } from "react-router-dom";
import { filterSelectionFrom, navigateToGarments } from "../redux/ClosetSlice";

function Home() {
  const [select, setSelected] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardSelect = (e) => {
    dispatch(filterSelectionFrom(e.target.alt));
    // navigate("/garments");
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
            <a href="#nextPage">
              <Card img={shirtImg} alt="shirt" />
            </a>
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
            id="nextPage"
            className={`${styles.button}  `}
            onClick={() => {
              navigate("/garments");
              dispatch(navigateToGarments());
            }}
          >
            continue to build your set
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
