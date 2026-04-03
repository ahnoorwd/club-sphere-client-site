import { use } from "react";
import { NavLink, Link } from "react-router";
import { AuthContext } from "../Authprovider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = use(AuthContext);

  const handlelogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          title: "Logged Out",
          text: "Logout Successfully",
          icon: "success",
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // ✅ Active link style
  const navStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-primary pb-1"
      : "hover:text-primary transition duration-300";

  const navLinks = (
    <>
      <li><NavLink to="/" className={navStyle}>Home</NavLink></li>
      <li><NavLink to="/clubs" className={navStyle}>Clubs</NavLink></li>
      <li><NavLink to="/events" className={navStyle}>Events</NavLink></li>
      <li><NavLink to="/how-it-works" className={navStyle}>How It Works</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md shadow-md px-4 sticky top-0 z-50">

      {/* LEFT */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-xl mt-3 w-52 p-3 shadow-lg z-50">
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-primary tracking-wide">
          ClubSphere
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6 text-base font-medium">
          {navLinks}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">

        {user ? (
          // ✅ LOGGED IN UI
          <div className="dropdown dropdown-end">
            
            {/* Avatar + Name */}
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 cursor-pointer hover:bg-base-200 px-2 py-1 rounded-full transition"
            >
              <div className="avatar ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/2kR5zqM/user.png"}
                    alt="user"
                  />
                </div>
              </div>

              {/* Show name/email on large screen */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold leading-tight">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-base-content/60 leading-tight">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul className="menu menu-sm dropdown-content mt-4 w-64 p-3 shadow-xl bg-base-100 rounded-xl z-50">

              {/* USER INFO */}
              <div className="px-2 py-2 border-b border-base-300 mb-2">
                <p className="font-semibold text-base">
                  {user?.displayName || "User"}
                </p>
                <p className="text-sm text-base-content/70">
                  {user?.email}
                </p>
              </div>

              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li className="mt-2">
                <button
                  onClick={handlelogout}
                  className="text-error hover:bg-error hover:text-white rounded-lg"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // 🔴 LOGGED OUT UI
          <>
            <Link to="/login" className="btn btn-ghost hover:text-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary rounded-full px-6">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;