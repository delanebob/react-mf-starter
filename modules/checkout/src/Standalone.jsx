import React from "react";
import { connect } from "react-redux";
import 'shell/BaseStyles';
import "./styles/index.css";

import { products } from 'landing/MockedProducts'

const Standalone = () => {
  return (
    <div className="site">
      <div className="checkoutPage">
        <h2>Checkout (standalone)</h2>
        <div className="checkoutList">
        {
        products.map((item, index) => {
          return (
            <div className="checkoutProduct" key={item.name}>
              <div className="checkoutTitle">{item.name}</div>
          <div className="checkoutDescription">{item.description}</div>
              <div className="checkoutPrice">${item.price}</div>
            </div>
            )
        })
        }
        <div className="checkoutTotal">{products.reduce((a, b) => (a + b.price), 0)}</div>
        </div>
      </div>
    </div>
  )
};

const mapStateToPros = state => ({
  items: state.items
})

export default connect(mapStateToPros)(Standalone);