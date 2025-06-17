import React from "react";
import ReactDom from "react-dom/client";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore"

const App = () => {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
};

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<App />);
