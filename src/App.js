import React from "react";
import ReactDom from "react-dom/client";
import Body from "./components/Body";

const App = () => {
    return <Body />
}

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<App />);