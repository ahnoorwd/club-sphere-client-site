import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ClubDetails from "../pages/ClubDetails";
import Clubs from "../pages/Clubs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/clubs",
        element: <Clubs></Clubs>,
      },
      {
        path: "/clubs/:id",
        element: <ClubDetails></ClubDetails>,
      },
    ],
  },
]);
