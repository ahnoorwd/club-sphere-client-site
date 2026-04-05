import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Authprovider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { saveUserToDB } from "../api/users";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaArrowRight,
} from "react-icons/fa";

const Register = () => {
  const { createUser, user, setuser, updateUser, signinwithgoogle } =
    use(AuthContext);
  const navigate = useNavigate();

  const handlegoogleregister = () => {
    signinwithgoogle()
      .then(async (result) => {
        await saveUserToDB({
          name: result.user?.displayName || "Google User",
          email: result.user?.email,
          photoURL: result.user?.photoURL || "",
        });

        toast.success("Registered successfully with Google!");
        setuser(result.user);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{6,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Checks again please",
        text: "Please type at least one uppercase, one lowercase, and one special character",
        footer: '<a href="/login">Why do I have this issue? Try login</a>',
      });
      return;
    }

    createUser(email, password)
      .then(async (result) => {
        try {
          await updateUser({ displayName: name, photoURL: photo });

          await saveUserToDB({
            name: name,
            email: email,
            photoURL: photo,
          });

          setuser({
            ...result.user,
            displayName: name,
            photoURL: photo,
          });

          Swal.fire({
            title: "Congrats You !!!",
            text: "Register Successful",
            icon: "success",
          });

          navigate("/");
          form.reset();
        } catch (error) {
          setuser(user);
          toast.error(error.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-fuchsia-950">
      <title>ClubSphere | Register</title>

      {/* background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left text-white"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium mb-6">
              Start Your ClubSphere Journey
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Join the community that
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-pink-300 bg-clip-text text-transparent">
                matches your passion.
              </span>
            </h1>

            <p className="py-6 text-slate-300 leading-8 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Create your account to discover clubs, connect with people, and
              unlock opportunities to learn, grow, and participate in exciting
              events.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 mt-6">
              <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md p-5">
                <h3 className="text-2xl font-bold text-cyan-300">50+</h3>
                <p className="text-sm text-slate-300 mt-1">Club Communities</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md p-5">
                <h3 className="text-2xl font-bold text-pink-300">100+</h3>
                <p className="text-sm text-slate-300 mt-1">Active Members</p>
              </div>
            </div>
          </motion.div>

          {/* Right card */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-xl mx-auto"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl p-8 md:p-9">
              <div className="text-center mb-7">
                <h2 className="text-3xl font-extrabold text-white">
                  Register Here
                </h2>
                <p className="text-slate-300 text-sm mt-2">
                  Create your account and become part of ClubSphere.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Full Name
                  </label>

                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-300 transition z-10">
                      <FaUser />
                    </span>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                      name="name"
                      required
                    />
                  </div>
                </div>

                {/* Photo URL */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Photo URL
                  </label>

                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-300 transition z-10">
                      <FaImage />
                    </span>

                    <input
                      type="text"
                      placeholder="Enter photo URL"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300"
                      name="photo"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Email
                  </label>

                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-300 transition z-10">
                      <FaEnvelope />
                    </span>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                      name="email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Password
                  </label>

                  <div className="relative group">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 blur-md opacity-0 group-focus-within:opacity-100 transition duration-300"></div>

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-300 transition z-10">
                      <FaLock />
                    </span>

                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="relative z-10 w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 transition-all duration-300"
                      name="password"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Confirm Password
                  </label>

                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-300 transition z-10">
                      <FaLock />
                    </span>

                    <input
                      type="password"
                      placeholder="You can ignore for now"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm mt-1 border-white/30"
                    required
                  />
                  <p className="text-sm text-slate-300 leading-6">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-cyan-300 font-medium hover:text-pink-300 transition underline"
                    >
                      Terms & Conditions
                    </a>
                  </p>
                </div>

                {/* Register button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 hover:from-cyan-400 hover:via-blue-400 hover:to-violet-400 shadow-lg shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Register
                  <FaArrowRight className="text-sm" />
                </button>

                <div className="divider divider-neutral text-slate-400 text-sm">
                  or continue with
                </div>

                {/* Google register */}
                <button
                  type="button"
                  onClick={handlegoogleregister}
                  className="w-full py-3 rounded-2xl bg-white text-slate-700 hover:bg-slate-100 border border-white/50 font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-md"
                >
                  <FcGoogle className="text-2xl" />
                  Register with Google
                </button>
              </form>

              <p className="text-center text-sm mt-7 text-slate-300">
                Already have an account?{" "}
                <Link
                  to={`/login`}
                  className="text-cyan-300 font-semibold hover:text-pink-300 transition underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Register;