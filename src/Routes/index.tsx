import { Suspense, useEffect, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { AuthRouter } from "./AuthRoutes";
import { AdminDashRouter } from "./DashboardRoutes";
import { AppFallback } from "./Layout";
import { useAuth } from "../zustand/auth.store";

export interface IModuleRouter {
  guard: (loggedIn: boolean) => boolean;
  routes: RouteObject[];
  layout?: () => JSX.Element;
  key: string;
}

const ModuleRouters: Array<IModuleRouter> = [AuthRouter, AdminDashRouter];

export const AppRouter = () => {
  const [router, setRouter] = useState<IModuleRouter | null>(null);
  const isLoggedIn: boolean = useAuth(s => !!s.token)
  // const isLoggedIn: boolean = true;
  useEffect(() => {
    const routeToRender = ModuleRouters.find((rtr) => rtr.guard(isLoggedIn));
    if (routeToRender) {
      setRouter(routeToRender);
    } else {
      setRouter(null);
    }
  }, [isLoggedIn]);

  const Layout = router?.layout ?? AppFallback;
  const routerView = useRoutes([
    {
      element: <Layout />,
      children: router?.routes ?? [],
    },
  ]);

  if (!router) {
    return <AppFallback screen />;
  }
  return <Suspense fallback={<AppFallback />}>{routerView}</Suspense>;
};
