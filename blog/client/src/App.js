import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Write from "./components/Write";
import Home from "./components/Home";
import Single from "./components/Single";
import NavbarMenu from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./components/Search";
import "./style.scss";

const Layout = () => {
  return (
    <>
      <NavbarMenu />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
