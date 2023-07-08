import React from "react";
import Sidebar from "./SideBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { returnHome } from "../redux/ClosetSlice";
import ProfileButton from "./ProfileButton";

const Header = ({ title }) => {
  return (
    <div className="Header px-3 py-2 w-full max-h-20 border-b-2 border-yellow-200">
      <div className={`Header-container flex items-center justify-between `}>
        <div className="Header-sideBar ">
          <ProfileButton />
        </div>
        <h1 className="App-home_title flex justify-center font-poppins font-semibold ss:text-[42px] text-[42px] text-black ">
          <span>{title}</span>
        </h1>
        <div className="Header-sideBar ">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Header;
