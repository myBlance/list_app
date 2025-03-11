import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ListApp from "./ListApp.tsx";
import reportWebVitals from "./reportWebVitals.tsx";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ListApp />
  </React.StrictMode>
);

reportWebVitals();
