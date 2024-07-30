import Home from "./pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import NoMatch from "./pages/NoMatch/NoMatch";
import Layout from "./pages/Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        // Single route in lazy file
        lazy: () => import("./pages/Login/Login"),
      },
      {
        path: "dashboard",
        async lazy() {
          // Multiple routes in lazy file
          let { DashboardLayout } = await import("./pages/Dashboard/Dashboard");
          return { Component: DashboardLayout };
        },
        children: [
          {
            index: true,
            async lazy() {
              let { DashboardIndex } = await import(
                "./pages/Dashboard/Dashboard"
              );
              return { Component: DashboardIndex };
            },
          },
          {
            path: "messages",
            async lazy() {
              let { dashboardMessagesLoader, DashboardMessages } = await import(
                "./pages/Dashboard/Dashboard"
              );
              return {
                loader: dashboardMessagesLoader,
                Component: DashboardMessages,
              };
            },
          },
        ],
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);
