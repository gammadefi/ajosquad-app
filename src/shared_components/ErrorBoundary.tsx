import { ReactNode } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { Button } from "../components/Button/Button";



export const ErrorBoundary = ({
  children,
  onReset,
}: {
  children: ReactNode;
  onReset?: () => void;
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={DefaultErrorFallback(!!onReset)}
      onReset={() => {
        onReset?.();
      }}
      onError={(error: Error, info: { componentStack: string }) => {
        console.log({ error, info });
        console.log(info.componentStack);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

const DefaultErrorFallback =
  (reset: boolean) =>
  ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
      <div className=" h-full w-full grid justify-center items-center">
        <div className="flex flex-col items-center">
        
          <h6 className="text-[20px] font-medium">
            Oops! Something went wrong.
          </h6>
          <p className="text-sm  mb-10">The operation could not be completed</p>
          <code className="text-cherry-100 bg-red-50 border-cherry-100 border-2 rounded px-5 py-2 max-w-xl">
            {error.message}
          </code>
          {reset && (
            <Button
              className=" max-w-[200px] mt-10"
              disabled={false}
              onClick={() => resetErrorBoundary()}
              label="Reset"
            />
             
         
          )}
        </div>
      </div>
    );
  };
