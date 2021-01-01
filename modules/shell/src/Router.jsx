

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";

const Landing = React.lazy(() => import("landing/Landing"));
const Checkout = React.lazy(() => import("checkout/Checkout"));
const Cart = React.lazy(() => import("checkout/Cart"));

const LandingRoute = () => (
  <React.Suspense fallback={<div />}>
    <Landing />
  </React.Suspense>
);
const CheckoutRoute = () => (
  <React.Suspense fallback={<div />}>
    <Checkout />
  </React.Suspense>
);

const NavLinks = ({location}) => {
  return (
    <div className="links">
      <Link to="/">
        Landing page
      </Link>
      { location.pathname !== '/checkout' && (
      <Link to="/checkout" >
        Checkout
      </Link>
      )}
    </div>
  )
}

const LinksWrapper = withRouter(NavLinks)

const Routes = () => {
  return (
  <Router>
      <nav>
        <LinksWrapper />
        <div>
        <React.Suspense fallback={<div />}>
          <Cart />
        </React.Suspense>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact>
          <LandingRoute />
        </Route>
        <Route path="/checkout">
          <CheckoutRoute />
        </Route>
      </Switch>
  </Router>)}

export default Routes;
