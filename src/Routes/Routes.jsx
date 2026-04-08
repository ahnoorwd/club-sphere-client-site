import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ClubDetails from "../pages/ClubDetails";
import Clubs from "../pages/Clubs";
import PaymentPage from "../pages/PaymentPage";
import MyClubs from "../pages/dashboard/MyClubs";
import PaymentHistory from "../pages/dashboard/PaymentHistory";

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
      {
        path: "/payment/:id",
        element: <PaymentPage></PaymentPage>,
      },

      {
        path: "/dashboard/my-clubs",
        element: <MyClubs></MyClubs>,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);
