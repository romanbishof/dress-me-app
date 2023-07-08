import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getClosetDataAsync } from "./redux/ClosetSlice";
import Home from "./pages/Home";
import Garments from "./pages/Garments";
import MySpace from "./pages/MySpace";
// import TestPage from "./pages/TestPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClosetDataAsync());
  });

  return (
    <div className="App-home w-full overflow-hidden pb-5">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/garments" element={<Garments />} />
        <Route path="/my_space" element={<MySpace />} />
        {/* <Route path="/test-page" element={<TestPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
