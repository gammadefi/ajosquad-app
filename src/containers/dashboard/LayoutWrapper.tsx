import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
export const LayoutOutlet = () => {
  return (
    <Suspense fallback={<AppFallback />}>
      <Outlet />
    </Suspense>
  );
};

export const AppFallback = (props: { screen?: boolean }) => {
  return (
    <div
      className={clsx(
        props.screen ? "h-screen w-screen" : "h-full w-full",
        " grid place-content-center place-items-center bg-transparent"
      )}
    >
      <img src={"/images/logo-purple.svg"} className="animate-pulse h-32 w-32" alt="logo" />
    </div>
  );
};
