
import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { use, useState } from "react";
import { AuthContext } from "../Authprovider/AuthProvider";
import Swal from "sweetalert2";
import { checkMembership, createMembership } from "../api/memberships";
import { baseURL } from "../api/baseURL";

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const { data: club, isLoading, isError } = useQuery({
    queryKey: ["clubDetails", id],
    queryFn: async () => {
      const res = await axios.get(`${baseURL}/clubs/${id}`);
      return res.data;
    },
  });

  const handleJoinClub = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to join this club.",
      });
      navigate("/login");
      return;
    }

    if (club.membershipFee > 0) {
      navigate(`/payment/${club._id}`);
      return;
    }

    try {
      const existing = await checkMembership(user.email, club._id);

      if (existing.joined) {
        Swal.fire({
          icon: "info",
          title: "Already Joined",
          text: "You already joined this club.",
        });
        return;
      }

      setShowJoinModal(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong while checking membership.",
      });
    }
  };

  const handleFreeJoinSubmit = async (e) => {
    e.preventDefault();

    try {
      const membershipData = {
        userEmail: user.email,
        clubId: club._id,
        clubName: club.clubName,
      };

      const result = await createMembership(membershipData);

      if (result.insertedId || result.acknowledged) {
        setShowJoinModal(false);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You joined this club successfully!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong while joining the club.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError || !club) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Club Not Found</h2>
        <p className="text-base-content/70 mb-6">
          The club you are looking for does not exist or failed to load.
        </p>
        <Link to="/clubs" className="btn btn-primary rounded-full px-6">
          Back to Clubs
        </Link>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-base-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-base-100 border border-base-300 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={club.bannerImage}
            alt={club.clubName}
            className="w-full h-64 md:h-96 object-cover"
          />

          <div className="p-6 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="badge badge-primary badge-lg">
                    {club.category}
                  </span>
                  <span className="badge badge-success badge-lg capitalize">
                    {club.status}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {club.clubName}
                </h1>

                <p className="text-base md:text-lg text-base-content/70 max-w-3xl">
                  {club.description}
                </p>
              </div>

              <div className="bg-base-200 rounded-2xl p-5 min-w-[260px] shadow-sm">
                <h3 className="text-xl font-bold mb-4">Club Information</h3>

                <div className="space-y-3 text-sm md:text-base">
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {club.location}
                  </p>
                  <p>
                    <span className="font-semibold">Manager Email:</span>{" "}
                    {club.managerEmail}
                  </p>
                  <p>
                    <span className="font-semibold">Membership Fee:</span>{" "}
                    <span className="text-primary font-bold">
                      {club.membershipFee === 0
                        ? "Free"
                        : `$${club.membershipFee}`}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {new Date(club.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={handleJoinClub}
                  className="btn btn-primary w-full mt-6 rounded-full"
                >
                  Join Club
                </button>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">About This Club</h2>
              <p className="text-base-content/80 leading-8">
                {club.description}
              </p>
            </div>

            <div className="mt-8">
              <Link to="/clubs" className="btn btn-outline rounded-full px-6">
                Back to Clubs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
            <div className="relative overflow-hidden rounded-t-[2rem] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-6 md:p-8 text-white">
              <button
                onClick={() => setShowJoinModal(false)}
                className="absolute right-5 top-5 btn btn-sm btn-circle bg-white/20 border-white/20 text-white hover:bg-white hover:text-black"
              >
                ✕
              </button>

              <p className="text-sm font-semibold text-white/80">
                Free Club Joining Form
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-black">
                Join {club.clubName}
              </h2>
              <p className="mt-2 text-white/85">
                Please fill this quick formal form before joining the club.
              </p>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-3xl bg-gradient-to-br from-cyan-50 via-white to-violet-50 border border-cyan-100 p-5">
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  className="h-44 w-full rounded-2xl object-cover mb-5"
                />

                <h3 className="text-2xl font-black text-slate-900">
                  {club.clubName}
                </h3>

                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p>
                    <span className="font-black">Category:</span>{" "}
                    {club.category}
                  </p>
                  <p>
                    <span className="font-black">Location:</span>{" "}
                    {club.location}
                  </p>
                  <p>
                    <span className="font-black">Manager:</span>{" "}
                    {club.managerEmail}
                  </p>
                  <p>
                    <span className="font-black">Fee:</span>{" "}
                    <span className="text-emerald-600 font-black">Free</span>
                  </p>
                </div>
              </div>

              <form onSubmit={handleFreeJoinSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.displayName || ""}
                    required
                    className="input input-bordered mt-2 w-full rounded-2xl bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    required
                    className="input input-bordered mt-2 w-full rounded-2xl bg-white"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    className="input input-bordered mt-2 w-full rounded-2xl bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Why do you want to join?
                  </label>
                  <textarea
                    required
                    className="textarea textarea-bordered mt-2 w-full rounded-2xl bg-white min-h-[110px]"
                    placeholder="Write a short reason..."
                  ></textarea>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="checkbox checkbox-primary checkbox-sm mt-1"
                    />
                    <span className="text-sm text-slate-600 leading-6">
                      I confirm that my information is correct and I want to
                      join this free club.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn w-full rounded-2xl border-none bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-black shadow-xl"
                >
                  Submit & Join Club
                </button>

                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="btn w-full rounded-2xl btn-outline"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClubDetails;