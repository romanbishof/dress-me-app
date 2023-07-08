import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { home } from "../assets";
import { returnHome } from "../redux/ClosetSlice";

const ProfileButton = () => {
  const { sets } = useSelector((state) => state.ClosetData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the current URL path
  const currentPath = window.location.pathname;

  // Check if the current path is the home page
  const isHomePage = currentPath === "/";
  return (
    <div className="ProfileButton relative">
      <div className="flex justify-cente  float-left">
        {isHomePage ? (
          <div className="flex items-center space-x-4">
            <img
              className="w-10 h-10 rounded-full cursor-pointer"
              src="https://tecdn.b-cdn.net/img/new/avatars/5.webp"
              alt=""
              onClick={() => {
                navigate("/my_space");
                dispatch(returnHome());
              }}
            />
            <div className="font-medium dark:text-white">
              <div>Sets build</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 ml-[50%]">
                {sets?.length}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
              dispatch(returnHome());
            }}
          >
            <img src={home} alt="home" className="h-10 w-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileButton;
