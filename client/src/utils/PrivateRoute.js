import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem("token") ? <Component /> : <Redirect to='/' />
      }
    />
  );
};

export default PrivateRoute;
