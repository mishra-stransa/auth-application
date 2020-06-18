import React from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = (props) => {
  const Component = props.component;
  const { token } = React.useContext(AuthContext);

  return token ? <Component /> : <Redirect to={{ pathname: "/login" }} />;
};

export default ProtectedRoute;
