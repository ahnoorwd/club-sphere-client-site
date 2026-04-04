import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Authprovider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { saveUserToDB } from "../api/users";

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
    <section className="hero min-h-screen bg-base-200">
      <title>Game-Hub-Login</title>
      <div className="container mx-auto px-4">
        <div className="hero-content flex-col lg:flex-row-reverse gap-12">
          <div className="card w-full max-w-sm bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Login Here
              </h2>

              <form onSubmit={handlelogin}>
                <fieldset className="fieldset space-y-3">
                  <label className="label text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label className="label text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="flex justify-between items-center text-sm mt-2">
                    <Link
                      to={`/forgotpassword?email=${encodeURIComponent(email)}`}
                      className="link link-hover text-neutral underline cursor-pointer"
                    >
                      Forgot password?
                    </Link>

                    <Link
                      to={`/register`}
                      className="link link-hover text-primary"
                    >
                      Create account
                    </Link>
                  </div>

                  <button type="submit" className="btn btn-neutral w-full mt-4">
                    Login
                  </button>

                  <button
                    onClick={handlegoogleregister}
                    type="button"
                    className="btn w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 flex items-center justify-center gap-2 rounded-lg shadow-sm"
                  >
                    <FcGoogle className="text-xl" /> Login with Google
                  </button>
                </fieldset>
              </form>

              <p className="text-sm mt-4 text-center">
                New to this website?{" "}
                <Link
                  to={`/register`}
                  className="font-bold text-green-500 underline"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center lg:text-left max-w-md">
            <h1 className="text-5xl font-bold text-neutral">Login now!</h1>
            <p className="py-6 text-gray-500 leading-relaxed">
              Access your account to manage settings, view updates, and explore
              all the latest features we’ve built for you.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;