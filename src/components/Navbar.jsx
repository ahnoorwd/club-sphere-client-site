import { Link } from "react-router";

const Navbar = () => {
  // 🔥 TEMP USER (later replace with real auth)
  const user = null; // change to {} to test logged-in UI

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/clubs">Clubs</Link></li>
      <li><Link to="/events">Events</Link></li>
      <li><Link to="/how-it-works">How It Works</Link></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      
      {/* LEFT */}
      <div className="navbar-start">
        
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          ClubSphere
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          {navLinks}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end space-x-2">

        {
          user ? (
            // 🔵 Logged-in UI (Avatar)
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://i.ibb.co/2kR5zqM/user.png" alt="user" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-50"
              >
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><button>Logout</button></li>
              </ul>
            </div>
          ) : (
            // 🔴 Logged-out UI
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )
        }

      </div>
    </div>
  );
};

export default Navbar;