import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Authprovider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, user, setuser, updateUser, signinwithgoogle } =
    use(AuthContext);
  const navigate = useNavigate();

  const handlegoogleregister = () => {
    signinwithgoogle()
      .then((result) => {
        // console.log(result.user);
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
    // console.log({name,photo,email,password});

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{6,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Checks again please",
        text: "Plese type atleast one uppercase lowercase and special character",
        footer: '<a href="/login">Why do I have this issue? try login</a>',
      });
      return; // stop the function here if invalid
    }

    createUser(email, password)
      .then((result) => {
        //console.log(result.user);
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setuser({ ...user, displayName: name, photoURL: photo });
            Swal.fire({
              title: "Congrates You !!!",
              text: "Register Successfull",
              icon: "success",
            });
            navigate("/");
            e.target.reset();
          })
          .catch((error) => {
            setuser(user);
            toast.error(error);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to from-indigo-500 via-purple-500 to-pink-500 py-10 px-5">
      <title>Game-Hub-Register</title>
      <div className="w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden rounded-3xl shadow-2xl border border-white/20 bg-white">
        {/* Left Side */}
        <div className="flex-1 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white p-10 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-l-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Welcome to <span className="text-yellow-300">Your Journey</span>
            </h1>
            <p className="text-gray-200 mb-6 text-sm lg:text-base">
              Join our growing community and unlock premium tools, resources,
              and support to help you grow smarter, faster, and better.
            </p>
            <Link className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-md">
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Side (Form Card) */}
        <div className="flex-1 bg-white p-8 lg:p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Register Here First
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full input input-bordered focus:ring-2 focus:ring-indigo-500 rounded-lg"
                name="name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Photo-URL
              </label>
              <input
                type="text"
                placeholder="Photo url"
                className="w-full input input-bordered focus:ring-2 focus:ring-indigo-500 rounded-lg"
                name="photo"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full input input-bordered focus:ring-2 focus:ring-indigo-500 rounded-lg"
                name="email"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full input input-bordered pr-10 focus:ring-2 focus:ring-indigo-500 rounded-lg"
                name="password"
                required
              />
              <div className="absolute right-4 top-10 cursor-pointer text-gray-600 hover:text-indigo-500 z-10"></div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="you can ignore"
                className="w-full input input-bordered focus:ring-2 focus:ring-indigo-500 rounded-lg"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                required
              />
              <p className="text-sm text-gray-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Terms & Conditions
                </a>
              </p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold border-0 hover:from-indigo-700 hover:to-pink-600 rounded-lg shadow-md mt-2"
            >
              Register
            </button>

            <div className="divider text-gray-400">or</div>

            {/* Google Register */}
            <button
              type="button"
              onClick={handlegoogleregister}
              className="btn w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 flex items-center justify-center gap-2 rounded-lg shadow-sm"
            >
              <FcGoogle className="text-xl" />
              Register with Google
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to={`/login`}
              className="text-indigo-600 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
