import React from "react";
import Sidebar from "./SideBar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="Header">
      <div className={`Header-container flex border-b-2 justify-between`}>
        {/* if home page ?  personal zone : or back   */}
        <div className="flex justify-center bg-slate-400 w-[60px]">
          <button onClick={() => navigate("/")}>{`Home`}</button>
        </div>
        <h1 className="App-home_title flex font-poppins font-semibold ss:text-[42px] text-[42px] text-black ss:leading-[100.8px] leading-[75px]">
          <span>{`header title`}</span>
        </h1>
        <div className="Header-sideBar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Header;
