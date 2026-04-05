import { Link } from "react-router";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
      {/* background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              ClubSphere
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300 max-w-xs">
              Discover clubs, meet like-minded people, and join inspiring events
              in your local community with a modern and engaging experience.
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
              <FaMapMarkerAlt className="text-cyan-400" />
              <span>Dhaka, Bangladesh</span>
            </div>

            <div className="mt-3 flex items-center gap-3 text-sm text-slate-300">
              <FaEnvelope className="text-pink-400" />
              <span>ahnoor232official@gmail.com</span>
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-5 text-white">Explore</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link
                  to="/"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/clubs"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Clubs
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-5 text-white">Community</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link
                  to="/clubs"
                  className="hover:text-pink-400 transition duration-300"
                >
                  Popular Clubs
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="hover:text-pink-400 transition duration-300"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-pink-400 transition duration-300"
                >
                  Join Community
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-pink-400 transition duration-300"
                >
                  Member Login
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social + Newsletter style box */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-5 text-white">Connect</h3>

            <p className="text-sm leading-7 text-slate-300 mb-5">
              Stay connected with ClubSphere and follow our journey through
              social platforms.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-lg hover:bg-cyan-500 hover:text-white hover:-translate-y-1 transition duration-300"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-lg hover:bg-blue-500 hover:text-white hover:-translate-y-1 transition duration-300"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-lg hover:bg-pink-500 hover:text-white hover:-translate-y-1 transition duration-300"
              >
                <FaTwitter />
              </a>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-sm text-slate-300 leading-6">
                Build friendships, grow your passion, and become part of a
                thriving local club network.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} ClubSphere. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link to="/" className="hover:text-cyan-400 transition duration-300">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-cyan-400 transition duration-300">
              Terms of Service
            </Link>
            <Link to="/" className="hover:text-cyan-400 transition duration-300">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;