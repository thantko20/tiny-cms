import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  Outlet,
  RootRoute,
  Route,
  RouterProvider,
  Router
} from "@tanstack/react-router";
import { Button } from "./components/ui/button";

const rootRoute = new RootRoute({
  component: function () {
    return (
      <>
        <h1>this is root route</h1>
        <Button>More</Button>
        <Outlet />
      </>
    );
  }
});

const childRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/child",
  component: function () {
    return <h2>child route -&gt; changes fdafda woops</h2>;
  }
});

const routeTree = rootRoute.addChildren([childRoute]);

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
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
