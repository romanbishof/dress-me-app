import Header from "../components/Header";
import Inventory from "../components/Inventory";
import Card from "../components/Card";
import { pantsImg, shirtImg, shoesImg } from "../assets";

function Home() {
  return (
    <div className="Home w-full overflow-hidden">
      <Header title={"home"} />

      <div className="Home__body">
        <div className="sm:px-24 px-5 py-5 ">
          <Inventory />
        </div>
        <h2 className="flex justify-center text-center text-[25px] pb-8">
          <span>choose clothing to start building your set</span>
        </h2>

        {/* div containig the buttons */}
        <div className="Home__buttons sm:p-7 flex md:flex-row flex-col justify-around  md:items-start items-center ">
          <Card img={shirtImg} alt="shirt" />

          <Card img={pantsImg} alt="pants" />

          <Card img={shoesImg} alt="shoes" />
        </div>
      </div>
    </div>
  );
}

export default Home;
