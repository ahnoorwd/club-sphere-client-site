import { Link, NavLink, Outlet } from "react-router";
import { FaChartPie, FaUserTie } from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";
import {
  FaHome,
  FaLayerGroup,
  FaMoneyBillWave,
  FaUsers,
  FaPlusCircle,
  FaClipboardList,
  FaArrowLeft,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white shadow-md"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  if (roleLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* Main content */}
        <div className="drawer-content flex flex-col">
          {/* Topbar */}
          <div className="w-full bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-ghost btn-circle lg:hidden"
              >
                ☰
              </label>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                Dashboard
              </h2>
            </div>

            {/* right side clean */}
            <div className="hidden md:flex items-center">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-violet-100 text-slate-700 text-sm font-semibold capitalize border border-slate-200">
                {role} Panel
              </span>
            </div>
          </div>

          {/* Page content */}
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-40">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <aside className="w-72 min-h-full bg-white border-r border-slate-200 flex flex-col shadow-sm">
            {/* Sidebar top */}
            <div className="px-6 py-7 border-b border-slate-200">
              <Link
                to="/"
                className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent"
              >
                ClubSphere
              </Link>

              <div className="mt-4">
                <p className="text-sm text-slate-500">Dashboard Role</p>
                <p className="text-lg font-bold text-slate-800 capitalize">
                  {role}
                </p>
              </div>
            </div>

            {/* Sidebar nav */}
            <nav className="flex-1 px-4 py-6 space-y-3">
              <NavLink to="/dashboard" end className={linkClass}>
                <FaHome className="text-lg" />
                <span>Overview</span>
              </NavLink>

              {/* Member links */}
              {role === "member" && (
                <>
                  <NavLink to="/dashboard/my-clubs" className={linkClass}>
                    <FaLayerGroup className="text-lg" />
                    <span>My Clubs</span>
                  </NavLink>

                  <NavLink to="/dashboard/my-events" className={linkClass}>
                    <FaClipboardList className="text-lg" />
                    <span>My Events</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/payment-history"
                    className={linkClass}
                  >
                    <FaMoneyBillWave className="text-lg" />
                    <span>Payment History</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/community-leaders"
                    className={linkClass}
                  >
                    <FaUserTie className="text-lg" />
                    <span>Community Leaders</span>
                  </NavLink>
                </>
              )}

              {/* Manager links */}
              {role === "clubManager" && (
                <>
                  <NavLink to="/dashboard/add-club" className={linkClass}>
                    <FaPlusCircle className="text-lg" />
                    <span>Add Club</span>
                  </NavLink>

                  <NavLink to="/dashboard/manage-clubs" className={linkClass}>
                    <FaClipboardList className="text-lg" />
                    <span>Manage Clubs</span>
                  </NavLink>

                  <NavLink to="/dashboard/create-event" className={linkClass}>
                    <FaPlusCircle className="text-lg" />
                    <span>Create Event</span>
                  </NavLink>
                  <NavLink to="/dashboard/manage-events" className={linkClass}>
                    <FaClipboardList className="text-lg" />
                    <span>Manage Events</span>
                  </NavLink>
                </>
              )}

              {/* Admin links */}
              {role === "admin" && (
                <>
                  <NavLink to="/dashboard/analytics" className={linkClass}>
                    <FaChartPie className="text-lg" />
                    <span>Analytics</span>
                  </NavLink>

                  <NavLink to="/dashboard/manage-users" className={linkClass}>
                    <FaUsers className="text-lg" />
                    <span>Manage Users</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-all-clubs"
                    className={linkClass}
                  >
                    <FaClipboardList className="text-lg" />
                    <span>Manage Clubs</span>
                  </NavLink>
                </>
              )}
            </nav>

            {/* Sidebar bottom */}
            <div className="px-4 py-5 border-t border-slate-200">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 w-full rounded-2xl border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                <FaArrowLeft />
                Back to Home
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
