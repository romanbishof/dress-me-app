import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getClosetDataAsync } from "./redux/ClosetSlice";
import Home from "./pages/Home";
import Garments from "./pages/Garments";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClosetDataAsync());
  });

  return (
    <div className="App-home w-full overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/garments" element={<Garments />} />
      </Routes>
    </div>
  );
}

export default App;
