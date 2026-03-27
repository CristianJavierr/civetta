import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import MenuPage from "../pages/menu/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <MenuPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
