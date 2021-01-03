import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Nav from '../src/components/Nav';

import dashboardRoutes from 'dashboard/routes';
import attendanceRoutes from 'attendance/routes';

const routes = [
  ...dashboardRoutes,
  ...attendanceRoutes
];

const App = () => {
  console.log(routes);
  return (
    <Router>
      <div>
        <h1>Typescript</h1>
        <h2>App 1</h2>
        <Nav />
        <Suspense fallback="Loading">
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
};

export default App;
