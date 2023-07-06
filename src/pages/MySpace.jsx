import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import SetCard from "../components/SetCard";

const MySpace = () => {
  const { sets } = useSelector((state) => state.ClosetData);
  return (
    <div className="MySpace">
      <Header title={"My Space"} />
      {sets?.map((item) => {
        return (
          <div key={item.id + "q"}>
            <SetCard set={item} />
          </div>
        );
      })}
    </div>
  );
};

export default MySpace;
