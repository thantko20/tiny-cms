import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  RootRoute,
  Route,
  RouterProvider,
  Router,
  Outlet
} from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider";

const rootRoute = new RootRoute();

const mainLayout = new Route({
  getParentRoute: () => rootRoute,
  component: () => {
    return (
      <div>
        <Outlet />
      </div>
    );
  },
  id: "mainLayout"
});

const mainIndex = new Route({
  getParentRoute: () => mainLayout,
  component: () => {
    return <div>main index</div>;
  },
  path: "/"
});

const collectionsRoute = new Route({
  getParentRoute: () => mainLayout,
  component: () => {
    return <div>Collections route</div>;
  },
  path: "/collections"
});

const routeTree = rootRoute.addChildren([
  mainLayout.addChildren([mainIndex, collectionsRoute])
]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}
