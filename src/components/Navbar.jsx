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

  const navStyle = ({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/clubs" className={navStyle}>
          Clubs
        </NavLink>
      </li>
      <li>
        <NavLink to="/events" className={navStyle}>
          Events
        </NavLink>
      </li>
      <li>
        <NavLink to="/how-it-works" className={navStyle}>
          How It Works
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="navbar-wrapper sticky top-0 z-50">
      <div className="navbar custom-navbar">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="mobile-menu-btn lg:hidden"
            >
              ☰
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content navbar-dropdown mt-3 w-56 p-3 z-50"
            >
              {navLinks}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="navbar-logo">
            ClubSphere
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal navbar-menu">{navLinks}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              {/* Avatar + Name */}
              <div tabIndex={0} role="button" className="user-trigger">
                <div className="avatar user-avatar-ring">
                  <div className="w-10 rounded-full overflow-hidden">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/2kR5zqM/user.png"
                      }
                      alt="user"
                    />
                  </div>
                </div>

                <div className="hidden md:block text-left">
                  <p className="user-name">{user?.displayName || "User"}</p>
                  <p className="user-email">{user?.email}</p>
                </div>
              </div>

              {/* Dropdown Menu */}
              <ul className="menu menu-sm dropdown-content user-dropdown mt-4 w-64 p-3 z-50">
                <div className="user-dropdown-info">
                  <p className="font-semibold text-base">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-sm text-slate-500 break-all">
                    {user?.email}
                  </p>
                </div>

                <li>
                  <Link to="/dashboard/my-clubs" className="dropdown-link">
                    My Clubs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/payment-history"
                    className="dropdown-link"
                  >
                    Payment History
                  </Link>
                </li>

                <li>
                  <Link to="/dashboard" className="dropdown-link">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link to="/profile" className="dropdown-link">
                    Profile
                  </Link>
                </li>

                <li className="mt-2">
                  <button onClick={handlelogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="login-btn-nav">
                Login
              </Link>
              <Link to="/register" className="register-btn-nav">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
