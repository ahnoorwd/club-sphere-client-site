import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { use } from "react";
import { AuthContext } from "../Authprovider/AuthProvider";
import Swal from "sweetalert2";
import { checkMembership, createMembership } from "../api/memberships";

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  const { data: club, isLoading, isError } = useQuery({
    queryKey: ["clubDetails", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/clubs/${id}`);
      return res.data;
    },
  });

  const handleJoinClub = async () => {
    // 1. user not logged in
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to join this club.",
      });
      navigate("/login");
      return;
    }

    // 2. paid club -> later payment flow
   if (club.membershipFee > 0) {
  navigate(`/payment/${club._id}`);
  return;
}

    try {
      // 3. check if already joined
      const existing = await checkMembership(user.email, club._id);

      if (existing.joined) {
        Swal.fire({
          icon: "info",
          title: "Already Joined",
          text: "You already joined this club.",
        });
        return;
      }

      // 4. create membership
      const membershipData = {
        userEmail: user.email,
        clubId: club._id,
        clubName: club.clubName,
      };

      const result = await createMembership(membershipData);

      if (result.insertedId || result.acknowledged) {
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
    </section>
  );
};

export default ClubDetails;