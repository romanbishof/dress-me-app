import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
      <div className="flex flex-row flex-wrap sm:px-10">
        {sets?.map((item) => {
          return (
            <div className="mr-10" key={item.id + "q"}>
              <SetCard set={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MySpace;
