import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import SetCard from "../components/SetCard";

const MySpace = () => {
  const { sets } = useSelector((state) => state.ClosetData);

  // scroll to begenning of page on page render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="MySpace">
      <Header title={"My Space"} />
      <div className="MySpace-body flex flex-wrap justify-center p-0">
        {sets?.map((item) => {
          return (
            <div className="MySpace-body__card px-5" key={item.id + "q"}>
              <SetCard set={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MySpace;
