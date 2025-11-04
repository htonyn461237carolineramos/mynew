import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Home from "./pages/Home";
import User from "./pages/User";
import Login from "./pages/Login";
import "./styles.css";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/user" className="[&.active]:font-bold">
          User
        </Link>
        <Link to="/login" className="[&.active]:font-bold">
          Login
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user",
  component: User,
});

const routeTree = rootRoute.addChildren([indexRoute, userRoute]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
