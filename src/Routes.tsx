import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

const RoutesComponets = () => {
  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RoutesComponets;
