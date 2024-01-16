import { RootRoute, Route } from "@tanstack/react-router";
import { MainLayout } from "../components/main-layout";

export const rootRoute = new RootRoute();

export const mainLayout = new Route({
  getParentRoute: () => rootRoute,
  id: "main-layout",
  component: () => <MainLayout />
});

export const indexRoute = new Route({
  getParentRoute: () => mainLayout,
  path: "/",
  component: () => <div>this is an index route</div>
});

export const mediaLibraryRoute = new Route({
  getParentRoute: () => mainLayout,
  path: "/media",
  component: () => <div>this is a media lib route</div>
});

export const apiKeysRoute = new Route({
  getParentRoute: () => mainLayout,
  path: "/api-keys"
});

export const routeTree = rootRoute.addChildren([
  mainLayout.addChildren([indexRoute, mediaLibraryRoute, apiKeysRoute])
]);
