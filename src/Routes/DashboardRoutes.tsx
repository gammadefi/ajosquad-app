import { Navigate } from "react-router-dom";
import { AdminLayout } from "../pages/dashboard/layout/AdminLayout";
import { LazyRoute } from "../utils/helpers";
import { IModuleRouter } from "./index";

export const AjosquadDashRouter: IModuleRouter = {
  key: "dashboard",
  guard: (loggedIn) => loggedIn,
  layout: AdminLayout,
  routes: [
    {
      index: true,
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    LazyRoute(
      {
        path: "/dashboard",
      },
      () => import("../pages/dashboard/Dashboard")
    ),
    LazyRoute(
      {
        path: "/squad",
      },
      () => import("../pages/dashboard/Squad")
    ),
    LazyRoute(
      {
        path: "/payment",
      },
      () => import("../pages/dashboard/Payment")
    ),
    LazyRoute(
      {
        path: "/payout",
      },
      () => import("../pages/dashboard/Payout")
    ),
    LazyRoute(
      {
        path: "/referral",
      },
      () => import("../pages/dashboard/Referral/Referral")
    ),
    LazyRoute(
      {
        path: "/account",
      },
      () => import("../pages/dashboard/Account/Account")
    ),
    LazyRoute(
      {
        path: "/notification",
      },
      () => import("../pages/dashboard/Notifications")
    ),
    {
      path: "*",
      element: <Navigate to="/dashboard" />,
    },
  ],
};
