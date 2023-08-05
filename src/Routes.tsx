import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

const RoutesComponets = () => {
  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RoutesComponets;
