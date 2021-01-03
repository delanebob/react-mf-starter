import React from "react";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const routes = [
  {
    path: "/",
    exact: true,
    component: Dashboard,
  },
];

export default routes;