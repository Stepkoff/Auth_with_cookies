import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout";
import HomePage from "../../Pages/HomePage";
import ProfilePage from "../../Pages/ProfilePage";
import {PrivateRoute} from "./components/PrivateRoute";
import {GuestRoute} from "./components/GuestRoute";
import SignInPage from "../../Pages/SignInPage";
import SignUpPage from "../../Pages/SignUpPage";
import ErrorPage from "../../Pages/ErrorPge";

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        element: <HomePage/>,
        index: true
      },
      {
        path: '/profile',
        element: <PrivateRoute>
          <ProfilePage/>
        </PrivateRoute>
      },
      {
        path: '/signIn',
        element: <GuestRoute>
          <SignInPage/>
        </GuestRoute>
      },
      {
        path: '/signUp',
        element: <GuestRoute>
          <SignUpPage/>
        </GuestRoute>
      },
      {
        path: '*',
        element: <ErrorPage/>
      }
    ]
  }
])