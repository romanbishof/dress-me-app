import React, { useEffect } from "react";
import Sidebar from "./SideBar";

import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { setBuild } from "../redux/ClosetSlice";

const Header = ({ title }) => {
  const { checkSetBuild } = useSelector((state) => state.ClosetData);
  const dispatch = useDispatch();
  useEffect(() => {
    setInterval(() => {
      dispatch(setBuild(false));
    }, 6000);
  }, [checkSetBuild]);
  return (
    <div className="Header px-3 w-full max-h-[70px] border-b-2 border-yellow-200">
      <div
        className={`Header-container relative flex items-center justify-between `}
      >
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
      {checkSetBuild && (
        <div className="absolute z-50 mt-4 w-full bg-green-500 text-white font-bold py-2 px-4 rounded flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{`Congratulations!!! You'r set is complete ;)`} </span>
        </div>
      )}
    </div>
  );
};

export default Header;
