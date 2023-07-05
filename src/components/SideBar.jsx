import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

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
          className="fixed  z-30 flex items-center cursor-pointer right-10 top-9"
          fill="#000000"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <div
        className={`flex flex-col top-0 right-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>
        <span className="cursor-pointer" onClick={() => navigate("/garments")}>
          Garmements
        </span>
      </div>
    </>
  );
};

export default Sidebar;
