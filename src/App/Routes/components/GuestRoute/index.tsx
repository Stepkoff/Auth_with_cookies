import React from "react";
import {useAuth} from "../../../../Modules/AuthUser";
import {Navigate, useLocation} from "react-router-dom";

interface GuestRouteProps {
  children: JSX.Element,
}
export const GuestRoute = ({children}: GuestRouteProps) => {
  const auth = useAuth();
  const location = useLocation();
  const url = new URLSearchParams(location.search.slice(1));
  return auth.currentUser ? <Navigate to={url.get('redirect') || '/'}/> : children;
}