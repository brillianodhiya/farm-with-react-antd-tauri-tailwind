import Home from "./pages/Home/Home";
import { createBrowserRouter, redirect } from "react-router-dom";
import NoMatch from "./pages/NoMatch/NoMatch";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./config/auth/auth";
import { jotaiSessionStore } from "./config/store/jotaiStore";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "beforeroot",
    loader() {
      const token = jotaiSessionStore.getItem("token", null);
      const isAuthenticated = jotaiSessionStore.getItem(
        "isAuthenticated",
        null
      );
      // Our root route always provides the user, if logged in
      if (isAuthenticated && token) {
        window.location.replace("/auth");
      }
      return { isAuthenticated: isAuthenticated };
    },
    children: [
      {
        index: true,
        lazy: () => import("./pages/Login/LoginAsync"),
      },
      {
        path: "login",
        element: <Login />,
        // const token = jotaiSessionStore.getItem("token", null);
        //   const isAuthenticated = jotaiSessionStore.getItem(
        //     "isAuthenticated",
        //     null
        //   );
        //   if (isAuthenticated && token) {
        //     redirect("/auth");
        //   } else {
        //     return redirect("/login");
        //   }
        // },
      },
    ],
  },
  {
    path: "auth",
    element: <Layout />,
    loader() {
      // Our root route always provides the user, if logged in
      return { user: jotaiSessionStore.getItem("user", null) };
    },
    id: "root",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        // Single route in lazy file
        lazy: () => import("./pages/Login/LoginAsync"),
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
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await AuthProvider.signout();
      return redirect("/");
    },
  },
]);
