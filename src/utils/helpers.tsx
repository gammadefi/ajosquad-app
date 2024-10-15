import React, {
  Component,
  lazy,
  PropsWithoutRef,
  RefAttributes,
  Suspense
} from "react";

import { RouteObject } from "react-router-dom";

export const LazyRoute = (
  obj: RouteObject,
  factory: () => Promise<{ default: React.ComponentType<any> }>
): RouteObject => {
  const Page = lazy(factory);
  return {
    ...obj,
    element: <Page />,
  };
};

export const LazyLoad = <TProps,>(props: {
  c: (() => Promise<{ default: React.ComponentType<TProps> }>) | undefined;
  props: PropsWithoutRef<TProps> & RefAttributes<Component<TProps, any, any>>;
}) => {
  if (!props.c) {
    return <div>Not found</div>;
  }
  const Component = lazy(props.c);
  return (
    <Suspense
      fallback={
        <div className="h-full grid place-content-center place-items-center bg-transparent">
          <img
            src={"/images/logo.svg"}
            className="animate-pulse h-32 w-32"
            alt="paycenter_logo"
          />
        </div>
      }
    >
      <Component {...props.props} />
    </Suspense>
  );
};

export const currencyFormat = (
  amount: string | number,
  currency: string = "NGN"
) =>
  Number(amount).toLocaleString("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });
