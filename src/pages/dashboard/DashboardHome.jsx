// import { use } from "react";
// import { Link } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../../Authprovider/AuthProvider";
// import { getMemberDashboardStats } from "../../api/dashboard";
// import { getUserRole } from "../../api/users";

// const DashboardHome = () => {
//   const { user } = use(AuthContext);

//   const { data: roleData = {}, isLoading: roleLoading } = useQuery({
//     queryKey: ["userRole", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       return await getUserRole(user.email);
//     },
//   });

//   const currentRole = roleData?.role || "member";

//   const {
//     data: stats = {},
//     isLoading: statsLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["memberDashboardStats", user?.email],
//     enabled: !!user?.email && currentRole === "member",
//     queryFn: async () => {
//       return await getMemberDashboardStats(user.email);
//     },
//   });

//   if (roleLoading || statsLoading) {
//     return (
//       <div className="min-h-[60vh] flex justify-center items-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-[60vh] flex justify-center items-center">
//         <h2 className="text-2xl font-bold">Failed to load dashboard</h2>
//       </div>
//     );
//   }

//   if (currentRole !== "member") {
//     return (
//       <section className="w-full min-h-screen">
//         <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-8 md:p-10 text-white shadow-xl">
//           <h1 className="text-3xl md:text-5xl font-extrabold">
//             Welcome to your Dashboard
//           </h1>
//           <p className="mt-4 text-lg">
//             Hello, {user?.displayName || "User"} 👋
//           </p>
//           <p className="mt-2">
//             Your current role is:{" "}
//             <span className="font-bold capitalize">
//               {currentRole === "clubManager" ? "Club Manager" : currentRole}
//             </span>
//           </p>
//         </div>
//       </section>
//     );
//   }

//   const statCards = [
//     {
//       title: "Joined Clubs",
//       value: stats.joinedClubs || 0,
//       path: "/dashboard/my-clubs",
//     },
//     {
//       title: "Registered Events",
//       value: stats.registeredEvents || 0,
//       path: "/dashboard/my-events",
//     },
//     {
//       title: "Total Payments",
//       value: stats.totalPayments || 0,
//       path: "/dashboard/payment-history",
//     },
//     {
//       title: "Upcoming Events",
//       value: stats.upcomingEventsCount || 0,
//       path: "/dashboard/my-events",
//     },
//   ];

//   return (
//     <section className="w-full min-h-screen">
//       <div className="w-full">
//         <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
//           <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-white/10"></div>
//           <div className="absolute right-28 -bottom-24 w-72 h-72 rounded-full bg-white/10"></div>

//           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div>
//               <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
//                 Member Dashboard
//               </p>

//               <h1 className="text-3xl md:text-5xl font-extrabold">
//                 Welcome back, {user?.displayName || "Member"} 👋
//               </h1>

//               <p className="mt-4 text-white/90 max-w-2xl">
//                 Track your clubs, event registrations, payments, and upcoming
//                 activities from one place.
//               </p>
//             </div>

//             <Link
//               to="/events"
//               className="btn bg-white text-slate-800 border-none hover:bg-slate-100 rounded-2xl px-7 shadow-md"
//             >
//               Explore Events
//             </Link>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
//           {statCards.map((item, index) => (
//             <Link
//               to={item.path}
//               key={index}
//               className="bg-white border border-base-300 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//             >
//               <p className="text-sm font-medium text-slate-500">
//                 {item.title}
//               </p>
//               <h3 className="text-4xl font-extrabold text-slate-800 mt-3">
//                 {item.value}
//               </h3>
//             </Link>
//           ))}
//         </div>

//         <div className="mt-8 bg-white border border-base-300 rounded-3xl shadow-md p-6 md:p-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//             <div>
//               <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
//                 Upcoming Registered Events
//               </h2>
//               <p className="text-slate-500 mt-2">
//                 Your next registered events are shown here.
//               </p>
//             </div>

//             <Link to="/dashboard/my-events" className="btn btn-primary rounded-xl">
//               View All
//             </Link>
//           </div>

//           {stats.upcomingEvents?.length === 0 ? (
//             <div className="text-center py-10 rounded-2xl bg-base-200">
//               <h3 className="text-xl font-bold mb-2">No upcoming events</h3>
//               <p className="text-slate-500 mb-4">
//                 You have no upcoming registered events.
//               </p>
//               <Link to="/events" className="btn btn-outline rounded-xl">
//                 Browse Events
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//               {stats.upcomingEvents?.map((event) => (
//                 <div
//                   key={event._id}
//                   className="rounded-3xl border border-base-300 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
//                 >
//                   <img
//                     src={event.eventImage}
//                     alt={event.title}
//                     className="w-full h-44 object-cover"
//                   />

//                   <div className="p-5">
//                     <div className="flex items-center justify-between gap-3 mb-3">
//                       <span className="badge badge-primary">
//                         {event.isPaid ? "Paid" : "Free"}
//                       </span>
//                       <span className="text-xs text-slate-500">
//                         {new Date(event.eventDate).toLocaleDateString()}
//                       </span>
//                     </div>

//                     <h3 className="text-xl font-extrabold text-slate-800 line-clamp-2">
//                       {event.title}
//                     </h3>

//                     <p className="text-sm text-slate-500 mt-2 line-clamp-2">
//                       {event.location}
//                     </p>

//                     <Link
//                       to={`/events/${event._id}`}
//                       className="btn btn-sm btn-outline rounded-xl mt-4"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="mt-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8 text-white shadow-xl">
//           <h2 className="text-2xl md:text-3xl font-extrabold">
//             Recommended For You
//           </h2>
//           <p className="text-white/70 mt-3 max-w-2xl">
//             Based on your activity, we’ll later show personalized club and event
//             recommendations here.
//           </p>

//           <Link
//             to="/clubs"
//             className="btn bg-white text-slate-800 border-none rounded-xl mt-5"
//           >
//             Explore Clubs
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DashboardHome;

import { use } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Authprovider/AuthProvider";
import { getMemberDashboardStats } from "../../api/dashboard";
import { getUserRole } from "../../api/users";
import { getAdminAnalytics } from "../../api/analytics";
import {
  FaUsers,
  FaLayerGroup,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartPie,
  FaUserShield,
  FaPlusCircle,
  FaClipboardList,
} from "react-icons/fa";

const DashboardHome = () => {
  const { user } = use(AuthContext);

  const { data: roleData = {}, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => await getUserRole(user.email),
  });

  const currentRole = roleData?.role || "member";

  const {
    data: memberStats = {},
    isLoading: memberLoading,
    isError: memberError,
  } = useQuery({
    queryKey: ["memberDashboardStats", user?.email],
    enabled: !!user?.email && currentRole === "member",
    queryFn: async () => await getMemberDashboardStats(user.email),
  });

  const {
    data: adminData = {},
    isLoading: adminLoading,
    isError: adminError,
  } = useQuery({
    queryKey: ["adminAnalyticsOverview"],
    enabled: currentRole === "admin",
    queryFn: getAdminAnalytics,
  });

  if (roleLoading || memberLoading || adminLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (memberError || adminError) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <h2 className="text-2xl font-bold">Failed to load dashboard</h2>
      </div>
    );
  }

  // ADMIN OVERVIEW
  if (currentRole === "admin") {
    const overview = adminData?.overview || {};

    const adminCards = [
      {
        title: "Total Users",
        value: overview.totalUsers || 0,
        icon: <FaUsers />,
        gradient: "from-cyan-500 to-blue-500",
      },
      {
        title: "Total Clubs",
        value: overview.totalClubs || 0,
        icon: <FaLayerGroup />,
        gradient: "from-violet-500 to-indigo-500",
      },
      {
        title: "Total Events",
        value: overview.totalEvents || 0,
        icon: <FaCalendarAlt />,
        gradient: "from-emerald-500 to-green-500",
      },
      {
        title: "Revenue",
        value: `$${overview.totalRevenue || 0}`,
        icon: <FaMoneyBillWave />,
        gradient: "from-amber-500 to-orange-500",
      },
    ];

    return (
      <section className="w-full min-h-screen">
        <div className="w-full">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-white/10"></div>
            <div className="absolute right-28 -bottom-24 w-72 h-72 rounded-full bg-white/10"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
                  Admin Overview
                </p>

                <h1 className="text-3xl md:text-5xl font-extrabold">
                  Welcome back, {user?.displayName || "Admin"} 👋
                </h1>

                <p className="mt-4 text-white/90 max-w-2xl">
                  Monitor ClubSphere users, clubs, events, payments, and
                  platform activity from one control center.
                </p>
              </div>

              <Link
                to="/dashboard/analytics"
                className="btn bg-white text-slate-800 border-none hover:bg-slate-100 rounded-2xl px-7 shadow-md"
              >
                View Analytics
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
            {adminCards.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-base-300 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.gradient} text-white flex items-center justify-center text-2xl shadow-lg mb-5`}
                >
                  {item.icon}
                </div>

                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>

                <h3 className="text-4xl font-extrabold text-slate-800 mt-3">
                  {item.value}
                </h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <Link
              to="/dashboard/manage-users"
              className="rounded-3xl bg-white border border-base-300 p-7 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <FaUserShield className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-extrabold text-slate-800">
                Manage Users
              </h3>
              <p className="text-slate-500 mt-2">
                Control user roles and platform access.
              </p>
            </Link>

            <Link
              to="/dashboard/manage-all-clubs"
              className="rounded-3xl bg-white border border-base-300 p-7 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <FaLayerGroup className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-extrabold text-slate-800">
                Manage Clubs
              </h3>
              <p className="text-slate-500 mt-2">
                Approve, reject, and review submitted clubs.
              </p>
            </Link>

            <Link
              to="/dashboard/analytics"
              className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-7 shadow-md hover:shadow-xl transition-all duration-300 text-white"
            >
              <FaChartPie className="text-4xl text-cyan-300 mb-4" />
              <h3 className="text-2xl font-extrabold">Analytics</h3>
              <p className="text-white/70 mt-2">
                View charts, revenue, and platform insights.
              </p>
            </Link>
          </div>

          <div className="mt-8 rounded-3xl bg-white border border-base-300 p-7 md:p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
              Platform Control Summary
            </h2>

            <p className="text-slate-500 mt-3 max-w-3xl leading-7">
              As an admin, you can manage users, approve club submissions,
              monitor payment activity, and analyze overall platform growth.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // MANAGER OVERVIEW
  if (currentRole === "clubManager") {
    return (
      <section className="w-full min-h-screen">
        <div className="w-full">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-white/10"></div>
            <div className="absolute right-28 -bottom-24 w-72 h-72 rounded-full bg-white/10"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
                  Club Manager Overview
                </p>

                <h1 className="text-3xl md:text-5xl font-extrabold">
                  Welcome back, {user?.displayName || "Manager"} 👋
                </h1>

                <p className="mt-4 text-white/90 max-w-2xl">
                  Create clubs, manage your submissions, publish events, and
                  track your ClubSphere activity.
                </p>
              </div>

              <Link
                to="/dashboard/create-event"
                className="btn bg-white text-slate-800 border-none hover:bg-slate-100 rounded-2xl px-7 shadow-md"
              >
                Create Event
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Link
              to="/dashboard/add-club"
              className="rounded-3xl bg-white border border-base-300 p-7 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <FaPlusCircle className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-extrabold text-slate-800">
                Add Club
              </h3>
              <p className="text-slate-500 mt-2">
                Submit a new club for admin approval.
              </p>
            </Link>

            <Link
              to="/dashboard/manage-clubs"
              className="rounded-3xl bg-white border border-base-300 p-7 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <FaLayerGroup className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-extrabold text-slate-800">
                Manage Clubs
              </h3>
              <p className="text-slate-500 mt-2">
                Review your created clubs and approval status.
              </p>
            </Link>

            <Link
              to="/dashboard/manage-events"
              className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-7 shadow-md hover:shadow-xl transition-all duration-300 text-white"
            >
              <FaClipboardList className="text-4xl text-cyan-300 mb-4" />
              <h3 className="text-2xl font-extrabold">Manage Events</h3>
              <p className="text-white/70 mt-2">
                Update, delete, and track events from your approved clubs.
              </p>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // MEMBER OVERVIEW
  const statCards = [
    {
      title: "Joined Clubs",
      value: memberStats.joinedClubs || 0,
      path: "/dashboard/my-clubs",
    },
    {
      title: "Registered Events",
      value: memberStats.registeredEvents || 0,
      path: "/dashboard/my-events",
    },
    {
      title: "Total Payments",
      value: memberStats.totalPayments || 0,
      path: "/dashboard/payment-history",
    },
    {
      title: "Upcoming Events",
      value: memberStats.upcomingEventsCount || 0,
      path: "/dashboard/my-events",
    },
  ];

  return (
    <section className="w-full min-h-screen">
      <div className="w-full">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-white/10"></div>
          <div className="absolute right-28 -bottom-24 w-72 h-72 rounded-full bg-white/10"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
                Member Dashboard
              </p>

              <h1 className="text-3xl md:text-5xl font-extrabold">
                Welcome back, {user?.displayName || "Member"} 👋
              </h1>

              <p className="mt-4 text-white/90 max-w-2xl">
                Track your clubs, event registrations, payments, and upcoming
                activities from one place.
              </p>
            </div>

            <Link
              to="/events"
              className="btn bg-white text-slate-800 border-none hover:bg-slate-100 rounded-2xl px-7 shadow-md"
            >
              Explore Events
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          {statCards.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="bg-white border border-base-300 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-sm font-medium text-slate-500">
                {item.title}
              </p>
              <h3 className="text-4xl font-extrabold text-slate-800 mt-3">
                {item.value}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-white border border-base-300 rounded-3xl shadow-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                Upcoming Registered Events
              </h2>
              <p className="text-slate-500 mt-2">
                Your next registered events are shown here.
              </p>
            </div>

            <Link to="/dashboard/my-events" className="btn btn-primary rounded-xl">
              View All
            </Link>
          </div>

          {memberStats.upcomingEvents?.length === 0 ? (
            <div className="text-center py-10 rounded-2xl bg-base-200">
              <h3 className="text-xl font-bold mb-2">No upcoming events</h3>
              <p className="text-slate-500 mb-4">
                You have no upcoming registered events.
              </p>
              <Link to="/events" className="btn btn-outline rounded-xl">
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {memberStats.upcomingEvents?.map((event) => (
                <div
                  key={event._id}
                  className="rounded-3xl border border-base-300 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={event.eventImage}
                    alt={event.title}
                    className="w-full h-44 object-cover"
                  />

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="badge badge-primary">
                        {event.isPaid ? "Paid" : "Free"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(event.eventDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-800 line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                      {event.location}
                    </p>

                    <Link
                      to={`/events/${event._id}`}
                      className="btn btn-sm btn-outline rounded-xl mt-4"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8 text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Recommended For You
          </h2>
          <p className="text-white/70 mt-3 max-w-2xl">
            Based on your activity, we’ll later show personalized club and event
            recommendations here.
          </p>

          <Link
            to="/clubs"
            className="btn bg-white text-slate-800 border-none rounded-xl mt-5"
          >
            Explore Clubs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;