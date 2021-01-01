import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles/index.css";

import Standalone from "./Standalone";
import store from "shell/Store";

const CheckoutStandalone = () => (
  <Provider store={store}>
    <Standalone  />
  </Provider>
);

ReactDOM.render(<CheckoutStandalone />, document.getElementById("app"));



