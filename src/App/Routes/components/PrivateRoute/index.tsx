import React from "react";
import {useAuth} from "../../../../Modules/AuthUser";
import {Navigate, useLocation} from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element
}
export const PrivateRoute = ({children}:PrivateRouteProps) => {
  const auth = useAuth();
  const location = useLocation();
  const url = new URLSearchParams();
  url.set('redirect', location.pathname + location.search)
  return auth.currentUser ? children : <Navigate to={{pathname: '/signIn', search: url.toString()}}/>
}