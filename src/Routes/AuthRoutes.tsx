import { Navigate } from "react-router-dom";
import  Login  from "../pages/auth/Login";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { IModuleRouter } from "./index";
import SignUp from "../pages/auth/SignUp";
import AuthLayout from "../pages/auth/layout/AuthLayout";

export const AuthRouter: IModuleRouter = {
  key: "auth",
  guard: (loggedIn) => !loggedIn,
  // @ts-ignore
  layout: AuthLayout,
  routes: [
    // {
    //   index: true,
    //   element: <Navigate to="/login" />,
    // },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ],
};
