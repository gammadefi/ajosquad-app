import { Suspense, useEffect, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { AuthRouter } from "./AuthRoutes";
import { AjohomeDashRouter, AjosquadAdminDashRouter, AjosquadDashRouter } from "./DashboardRoutes";
import { AppFallback } from "./Layout";
import { useAuth } from "../zustand/auth.store";
import { ProductRouter, VerificationRouter } from "./VerificationRoutes";

export interface IModuleRouter {
  guard: (loggedIn: boolean) => boolean;
  routes: RouteObject[];
  layout?: () => JSX.Element;
  key: string;
}

const ModuleRouters: Array<IModuleRouter> = [AuthRouter, AjosquadDashRouter, ProductRouter, VerificationRouter, AjosquadAdminDashRouter, AjohomeDashRouter];

export const AppRouter = () => {
  const [router, setRouter] = useState<IModuleRouter | null>(null);
  const isLoggedIn: boolean = useAuth(s => !!s.token);
  const product = useAuth(s => s.product);
  const isVerified: boolean = useAuth(s => s.verified);
  const isAdmin: boolean = useAuth(s => s.role === "ADMIN");
  // const isAdmin: boolean = true
  // const isLoggedIn: boolean = true;
  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      setRouter(ModuleRouters[4]);
    } else if (isLoggedIn && product) {
      if (product === "AjoSquad") {
        setRouter(ModuleRouters[1]);
      } else if (product === "AjoHome") {
        setRouter(ModuleRouters[5]);
      }
    }
    else if (isLoggedIn && !product) {
      setRouter(ModuleRouters[2]);
    } else {
      setRouter(ModuleRouters[0]);
    }
  }, [isLoggedIn, product, isAdmin]);

  // console.log(router)

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
