import React from "react";
import { useNavigate } from "react-router-dom";

const AlertSetBuild = () => {
  const navigate = useNavigate();
  return (
    <div className={`ixed inset-0 flex items-center justify-center`}>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-center text-xl font-bold text-gray-800">
          Funny Message!
        </p>
        <p className="text-center text-gray-600">
          You don't have enough clothes, need to go out and buy. 😄
        </p>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          Lets go home, and hten SHOOPING! 😄
        </button>
      </div>
    </div>
  );
};

export default AlertSetBuild;
