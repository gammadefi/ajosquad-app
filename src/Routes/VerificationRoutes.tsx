import { Navigate } from "react-router-dom";
import { LazyRoute } from "../utils/helpers";
import { IModuleRouter } from "./index";
import SetupLayout from "../pages/setup/Layout/SetupLayout";

export const VerificationRouter: IModuleRouter = {
  key: "verification",
  guard: (loggedIn) => loggedIn,
  layout: SetupLayout,
  routes: [
    {
      index: true,
      element: <Navigate to="/personal-information" />,
    },
    {
      path: "/",
      element: <Navigate to="/personal-information" />,
    },
    LazyRoute(
      {
        path: "/personal-information",
      },
      () => import("../pages/setup/Product")
    ),
    {
      path: "*",
      element: <Navigate to="/personal-information" />,
    },
  ],
};

export const ProductRouter: IModuleRouter = {
  key: "verification",
  guard: (loggedIn) => loggedIn,
  layout: SetupLayout,
  routes: [
    {
      index: true,
      element: <Navigate to="/select-product" />,
    },
    {
      path: "/",
      element: <Navigate to="/select-product" />,
    },
    LazyRoute(
      {
        path: "/select-product",
      },
      () => import("../pages/setup/Product")
    ),
    {
      path: "*",
      element: <Navigate to="/personal-information" />,
    },
  ],
};
