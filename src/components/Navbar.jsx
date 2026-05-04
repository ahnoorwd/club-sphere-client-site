
// import { use } from "react";
// import { NavLink, Link } from "react-router";
// import { AuthContext } from "../Authprovider/AuthProvider";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const { user, logout } = use(AuthContext);

//   const handlelogout = () => {
//     logout()
//       .then(() => {
//         Swal.fire({
//           title: "Logged Out",
//           text: "Logout Successfully",
//           icon: "success",
//         });
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   };

//   const navStyle = ({ isActive }) =>
//     isActive ? "nav-link nav-link-active" : "nav-link";

//   const navLinks = (
//     <>
//       <li><NavLink to="/" className={navStyle}>Home</NavLink></li>
//       <li><NavLink to="/clubs" className={navStyle}>Clubs</NavLink></li>
//       <li><NavLink to="/events" className={navStyle}>Events</NavLink></li>
//       <li><NavLink to="/howitworks" className={navStyle}>How It Works</NavLink></li>
//       <li><NavLink to="/aboutus" className={navStyle}>About Us</NavLink></li>
//     </>
//   );

//   return (
//     <header className="navbar-wrapper sticky top-0 z-50">
//       <div className="navbar custom-navbar">

//         {/* LEFT */}
//         <div className="navbar-start gap-3">

//           {/* Mobile Menu ONLY (hidden on lg) */}
//           <div className="dropdown lg:hidden">
//             <div tabIndex={0} role="button" className="mobile-menu-btn">
//               ☰
//             </div>
//             <ul tabIndex={0} className="menu menu-sm dropdown-content navbar-dropdown mt-3 w-56 p-3 z-50">
//               {navLinks}
//             </ul>
//           </div>

//           {/* Logo */}
//           <Link to="/" className="navbar-logo flex items-center gap-2">
//             <span className="logo-icon">⚡</span>
//             ClubSphere
//           </Link>
//         </div>

//         {/* CENTER */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal navbar-menu">{navLinks}</ul>
//         </div>

//         {/* RIGHT */}
//         <div className="navbar-end gap-3">
//           {user ? (
//             <div className="dropdown dropdown-end">
//               <div tabIndex={0} role="button" className="user-trigger">

//                 <div className="avatar user-avatar-ring">
//                   <div className="w-10 rounded-full overflow-hidden">
//                     <img src={user?.photoURL || "https://i.ibb.co/2kR5zqM/user.png"} />
//                   </div>
//                 </div>

//                 <div className="hidden md:block text-left">
//                   <p className="user-name">{user?.displayName || "User"}</p>
//                   <p className="user-email">{user?.email}</p>
//                 </div>
//               </div>

//               {/* DROPDOWN */}
//               <ul className="menu menu-sm dropdown-content user-dropdown mt-4 w-64 p-4 z-50">

//                 <div className="user-dropdown-info">
//                   <p className="dropdown-name">{user?.displayName}</p>
//                   <p className="dropdown-email">{user?.email}</p>
//                 </div>

//                 <Link to="/dashboard" className="dropdown-link">Dashboard</Link>

//                 <li>
//                   <Link to="/profile" className="dropdown-link">Profile</Link>
//                 </li>

//                 <li className="mt-2">
//                   <button onClick={handlelogout} className="logout-btn">
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className="login-btn-nav">Login</Link>
//               <Link to="/register" className="register-btn-nav">Register</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import { use } from "react";
import { NavLink, Link } from "react-router";
import { AuthContext } from "../Authprovider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  FaTachometerAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaBolt,
  FaChevronDown,
} from "react-icons/fa";

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
        <NavLink to="/howitworks" className={navStyle}>
          How It Works
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutus" className={navStyle}>
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="navbar-wrapper sticky top-0 z-50">
      <div className="navbar custom-navbar">
        {/* LEFT */}
        <div className="navbar-start gap-3">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="mobile-menu-btn">
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
          <Link to="/" className="navbar-logo flex items-center gap-2">
            <span className="logo-icon">
              <FaBolt />
            </span>
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
            <div className="dropdown dropdown-end lg:dropdown-start">
              {/* User trigger */}
              <div tabIndex={0} role="button" className="user-trigger">
                <div className="avatar user-avatar-ring">
                  <div className="w-10 rounded-full overflow-hidden">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/2kR5zqM/user.png"
                      }
                      alt={user?.displayName || "User"}
                    />
                  </div>
                </div>

                <div className="hidden md:block text-left">
                  <p className="user-name">{user?.displayName || "User"}</p>

                  <div className="flex items-center gap-2">
                    <p className="user-email">{user?.email}</p>
                    <FaChevronDown className="text-slate-500 text-xs mt-[2px]" />
                  </div>
                </div>
              </div>

              {/* Premium dropdown */}
              <div
                tabIndex={0}
                className="dropdown-content mt-4   z-50 w-80 rounded-3xl bg-white/95 backdrop-blur-xl border border-cyan-100 shadow-2xl overflow-hidden"
              >
                {/* Top Gradient */}
                <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-5 text-white overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/15"></div>
                  <div className="absolute right-10 -bottom-10 w-32 h-32 rounded-full bg-white/10"></div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-2xl ring-4 ring-white/40 overflow-hidden">
                        <img
                          src={
                            user?.photoURL ||
                            "https://i.ibb.co/2kR5zqM/user.png"
                          }
                          alt={user?.displayName || "User"}
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-extrabold truncate">
                        {user?.displayName || "User"}
                      </h3>
                      <p className="text-sm text-white/80 break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-4 space-y-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-slate-700 font-semibold hover:bg-cyan-50 hover:text-primary transition-all duration-300"
                  >
                    <span className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                      <FaTachometerAlt />
                    </span>
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-slate-700 font-semibold hover:bg-violet-50 hover:text-violet-600 transition-all duration-300"
                  >
                    <span className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                      <FaUserCircle />
                    </span>
                    <span>Profile</span>
                  </Link>

                  <button
                    onClick={handlelogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-red-600 font-semibold hover:bg-red-50 transition-all duration-300"
                  >
                    <span className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                      <FaSignOutAlt />
                    </span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
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