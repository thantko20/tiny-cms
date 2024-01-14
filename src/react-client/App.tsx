import {
  Outlet,
  RootRoute,
  Route,
  RouterProvider,
  Router
} from "@tanstack/react-router";

const rootRoute = new RootRoute({
  component: function () {
    return (
      <>
        <h1>this is root route</h1>
        <Outlet />
      </>
    );
  }
});

const childRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/child",
  component: function () {
    return <h2>child route -&gt; changes</h2>;
  }
});

const routeTree = rootRoute.addChildren([childRoute]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
