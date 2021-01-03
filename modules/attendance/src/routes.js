import React from "react";

const AttendanceHome = React.lazy(() => import("./pages/AttendanceHome"));
const MarkAttendance = React.lazy(() => import("./pages/MarkAttendance"));

const routes = [
  {
    path: "/attendance",
    exact: true,
    component: AttendanceHome,
  },
  {
    path: "/attendance/mark",
    component: MarkAttendance,
  },
];

export default routes;