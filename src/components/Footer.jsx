import { Link } from "react-router";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
      
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold">ClubSphere</h2>
          <p className="mt-4 text-sm text-gray-200 max-w-xs">
            Discover clubs, connect with people, and join exciting events in your local community.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-xl mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline hover:text-yellow-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/clubs" className="hover:underline hover:text-yellow-200">
                Clubs
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:underline hover:text-yellow-200">
                Events
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:underline hover:text-yellow-200">
                How It Works
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-xl mb-4">Connect</h3>

          <div className="flex gap-5 text-2xl mb-4">
            <a
              href="#"
              className="hover:text-yellow-300 transition transform hover:scale-110"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="hover:text-yellow-300 transition transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="hover:text-yellow-300 transition transform hover:scale-110"
            >
              <FaTwitter />
            </a>
          </div>

          <p className="text-sm text-gray-200">
            Email: support@clubsphere.com
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center py-5 text-sm bg-black/20">
        © {new Date().getFullYear()} ClubSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;