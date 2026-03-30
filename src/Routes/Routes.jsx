import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
       },
      
    ],
  },
]);
