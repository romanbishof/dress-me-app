import React from "react";
import { useNavigate } from "react-router-dom";

// message alert for when we build the set and save it in our sets
const SuccesSetBuild = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center items-center bg-green-200 text-green-800 text-sm p-4 rounded ease-in ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2 stroke-current"
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
      <span>Yay, we built a set! Let's go see it</span>
      <button
        className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => {
          navigate("/my_space");
        }}
      >
        Go
      </button>
    </div>
  );
};

export default SuccesSetBuild;
