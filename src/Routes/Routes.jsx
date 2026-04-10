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
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AddClub from "../pages/dashboard/AddClub";
import ManageClubs from "../pages/dashboard/ManageClubs";

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
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <DashboardHome></DashboardHome>,
          },
          {
            path: "my-clubs",
            element: <MyClubs></MyClubs>,
          },
          {
            path: "payment-history",
            element: <PaymentHistory></PaymentHistory>,
          },
          {
            path: "add-club",
            element: <AddClub></AddClub>,
          },
          {
            path: "manage-clubs",
            element: <ManageClubs></ManageClubs>,
          },
        ],
      },
    ],
  },
]);
