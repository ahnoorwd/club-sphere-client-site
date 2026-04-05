import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Authprovider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { saveUserToDB } from "../api/users";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaArrowRight } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { signin, signinwithgoogle, setuser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlegoogleregister = () => {
    signinwithgoogle()
      .then(async (result) => {
        await saveUserToDB({
          name: result.user?.displayName || "Google User",
          email: result.user?.email,
          photoURL: result.user?.photoURL || "",
        });

        toast.success("Login successfully with Google!");
        setuser(result.user);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handlelogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    signin(email, password)
      .then((result) => {
        setuser(result.user);
        Swal.fire({
          title: "Congrats You !!!",
          text: "SignIn Successful",
          icon: "success",
        });
        navigate("/");
        e.target.reset();
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      <title>ClubSphere | Login</title>

      {/* background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left text-white"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium mb-6">
              Welcome Back to ClubSphere
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Connect. Join.
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-pink-300 bg-clip-text text-transparent">
                Grow Together.
              </span>
            </h1>

            <p className="py-6 text-slate-300 leading-8 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Sign in to explore clubs, manage your memberships, and stay
              connected with communities that match your passion.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 mt-6">
              <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md p-5">
                <h3 className="text-2xl font-bold text-cyan-300">50+</h3>
                <p className="text-sm text-slate-300 mt-1">Active Clubs</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md p-5">
                <h3 className="text-2xl font-bold text-pink-300">100+</h3>
                <p className="text-sm text-slate-300 mt-1">Community Members</p>
              </div>
            </div>
          </motion.div>

          {/* Right card */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl p-8 md:p-9">
              <div className="text-center mb-7">
                <h2 className="text-3xl font-extrabold text-white">
                  Login Here
                </h2>
                <p className="text-slate-300 text-sm mt-2">
                  Access your account and continue your journey.
                </p>
              </div>

              <form onSubmit={handlelogin}>
                <fieldset className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Email
                    </label>

                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-300 transition">
                        <FaEnvelope />
                      </span>

                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Password
                    </label>

                    <div className="relative group">
                      {/* animated glow on focus */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-pink-500/20 blur-md opacity-0 group-focus-within:opacity-100 transition duration-300"></div>

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-300 transition z-10">
                        <FaLock />
                      </span>

                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="relative z-10 w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 transition-all duration-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-1">
                    <Link
                      to={`/forgotpassword?email=${encodeURIComponent(email)}`}
                      className="text-slate-300 hover:text-cyan-300 underline transition"
                    >
                      Forgot password?
                    </Link>

                    <Link
                      to={`/register`}
                      className="text-cyan-300 hover:text-pink-300 transition font-medium"
                    >
                      Create account
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 hover:from-cyan-400 hover:via-blue-400 hover:to-violet-400 shadow-lg shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Login
                    <FaArrowRight className="text-sm" />
                  </button>

                  <div className="divider divider-neutral text-slate-400 text-sm">
                    or continue with
                  </div>

                  <button
                    onClick={handlegoogleregister}
                    type="button"
                    className="w-full py-3 rounded-2xl bg-white text-slate-700 hover:bg-slate-100 border border-white/50 font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-md"
                  >
                    <FcGoogle className="text-2xl" />
                    Login with Google
                  </button>
                </fieldset>
              </form>

              <p className="text-sm mt-7 text-center text-slate-300">
                New to this website?{" "}
                <Link
                  to={`/register`}
                  className="font-semibold text-cyan-300 hover:text-pink-300 underline transition"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Login;