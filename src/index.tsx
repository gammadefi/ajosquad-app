import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogoutProvider } from "./context/LogoutContext";
import { ProductProvider } from "./context/ProductContext";
import { SideBarProvider } from "./context/SideBarContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"; // Import service worker registration

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LogoutProvider>
        <ProductProvider>
          <SideBarProvider>
            <App />
          </SideBarProvider>
        </ProductProvider>
      </LogoutProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// Register the service worker
serviceWorkerRegistration.register();

// Measure performance
reportWebVitals();
