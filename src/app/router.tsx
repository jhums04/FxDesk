import { createBrowserRouter } from "react-router-dom";
import { LatestRates } from "@/features/rates/LatestRates";
import { AppLayout } from "./layout";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { NotFound } from "./not-found";
import { RouteError } from "./route-error";

export const router = createBrowserRouter([
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
]);
