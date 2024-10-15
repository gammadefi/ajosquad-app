import React, { useMemo } from "react";
export function useSingleState<S>(initialState: S | (() => S)) {
  const [data, setData] = React.useState(initialState);
  const signal = useMemo(() => {
    return {
      get: data,
      set: setData,
      inputSet: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
      ) => {
        if (typeof data === "string") {
          // @ts-ignore
          setData(e?.target?.value || e);
        }
        // else if (
        //   typeof data === "number" &&
        //   Number.isFinite(Number(e.target.value))
        // ) {
        //   // @ts-ignore
        //   setData(Number(e.target.value));
        // }
      },
      reset: () => setData(initialState),
      toggle: () => {
        if (typeof data === "boolean") {
          // @ts-ignore
          setData((d) => !d);
        }
      },
    };
  }, [data]);
  return signal;
}
