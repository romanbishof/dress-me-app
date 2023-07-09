import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { navigateToGarments, returnHome } from "../redux/ClosetSlice";

// sidebar component
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className=" z-30 flex items-center cursor-pointer right-10 top-9"
          fill="#000000"
          viewBox="0 0 100 80"
          width="30"
          height="30"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <div
        className={`flex flex-col ss:items-start items-center  top-0 right-0 ss:w-[300px] w-full bg-blue-600 pl-5 pt-8 text-white fixed h-full z-40  ease-in-out duration-300 space-y-5 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <span
          className="p-2 w-[60%] mr-5 border rounded-2xl font-poppins cursor-pointer hover:opacity-70"
          onClick={() => {
            navigate("/");
            dispatch(returnHome());
          }}
        >
          Home
        </span>
        <span
          className="p-2 w-[60%] mr-5 border rounded-2xl font-poppins cursor-pointer hover:opacity-70"
          onClick={() => {
            navigate("/garments");
            dispatch(navigateToGarments());
          }}
        >
          Garmements
        </span>
        <span
          className="p-2 w-[60%] mr-5 border rounded-2xl font-poppins cursor-pointer hover:opacity-70"
          onClick={() => {
            navigate("/my_space");
          }}
        >
          My Space
        </span>
      </div>
    </>
  );
};

export default Sidebar;
