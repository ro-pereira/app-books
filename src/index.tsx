import React from "react";
import ReactDOM from "react-dom/client";
import RoutesComponets from "./Routes";
import "./globalStyle.sass";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RoutesComponets />
  </React.StrictMode>
);
