import { Route, Routes } from "react-router-dom";
import AdminPanelAppBar from "./components/AppBar";
import Home from "./pages/Home";
import VendorsPage from "./pages/Vendors";
import VendorPage from "./pages/Vendor";
import UsersPage from "./pages/Users";
import LoginPage from "./pages/Login";

export const RoutePaths: any = {
  home: "/",
  vendors: "/vendors",
  users: "/users",
  vendor: "/vendor/:vendorID",
  login: "/login",
};

interface IRoute {
  path: string;
  element: JSX.Element;
}

export const routes: IRoute[] = [
  {
    path: RoutePaths.home,
    element: <Home />,
  },
  {
    path: RoutePaths.vendors,
    element: <VendorsPage />,
  },
  {
    path: RoutePaths.users,
    element: <UsersPage />,
  },
  {
    path: RoutePaths.vendor,
    element: <VendorPage />,
  },
  {
    path: RoutePaths.login,
    element: <LoginPage />,
  },
];

export function BindRoutes(props: { children?: React.ReactNode }): JSX.Element {
  return (
    <>
      <AdminPanelAppBar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {props.children}
      </Routes>
    </>
  );
}
