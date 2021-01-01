import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import "./../styles/index.css";

const BuyButton = ({ payload, addToCart, children }) => (
<button className="checkoutButton" onClick={() => addToCart(payload)}>{children}</button>
);

function buyItem(payload) {
  return { type: 'cart/add', payload }
}

export default connect(null, (dispatch) => ({
  addToCart: (payload) => dispatch(buyItem(payload))
}))(BuyButton);