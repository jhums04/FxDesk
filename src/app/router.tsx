import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { LatestRates } from "@/features/rates/LatestRates";
import { AppLayout } from "./layout";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { NotFound } from "./not-found";
import { RouteError } from "./route-error";

// Exported on their own so tests can mount the same routes in a memory router.
export const routes: RouteObject[] = [
  {
    path: "/", // the parent URL: the root of the site
    element: <AppLayout />, // the component with the <Outlet />
    errorElement: <RouteError />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "rates", element: <LatestRates /> }, // the rates page
      { path: "*", element: <NotFound /> }, // matches anything else
    ],
  },
];

export const router = createBrowserRouter(routes);
