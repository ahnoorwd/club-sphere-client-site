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
import ManageAllClubs from "../pages/dashboard/ManageAllClubs";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import CreateEvent from "../pages/dashboard/CreateEvent";
import ManageEvents from "../pages/dashboard/ManageEvents";
import UpdateEvent from "../pages/dashboard/UpdateEvent";
import MyEvents from "../pages/dashboard/MyEvents";
import EventPaymentPage from "../pages/EventPaymentPage";

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
        path: "/events",
        element: <Events></Events>,
      },
      {
        path: "/events/:id",
        element: <EventDetails></EventDetails>,
      },

      {
        path: "/event-payment/:id",
        element: <EventPaymentPage></EventPaymentPage>,
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
            path: "my-events",
            element: <MyEvents></MyEvents>,
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
          {
            path: "manage-all-clubs",
            element: <ManageAllClubs></ManageAllClubs>,
          },
          {
            path: "create-event",
            element: <CreateEvent></CreateEvent>,
          },
          {
            path: "manage-events",
            element: <ManageEvents></ManageEvents>,
          },
          {
            path: "update-event/:id",
            element: <UpdateEvent></UpdateEvent>,
          },
        ],
      },
    ],
  },
]);
