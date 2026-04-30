import { use } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authprovider/AuthProvider";
import { getUserMemberships, leaveClub } from "../../api/memberships";

const MyClubs = () => {
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: memberships = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myMemberships", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      return await getUserMemberships(user.email);
    },
  });

  const leaveMutation = useMutation({
    mutationFn: async (membershipId) => {
      return await leaveClub(membershipId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myMemberships", user?.email]);
    },
  });

  const handleLeaveClub = async (membershipId) => {
    const confirm = await Swal.fire({
      title: "Leave this club?",
      text: "You will no longer be a member of this club.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, leave",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await leaveMutation.mutateAsync(membershipId);

      if (result.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Left Club",
          text: "You have successfully left this club.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not leave club. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-bold mb-3">Failed to load your clubs</h2>
        <p className="text-base-content/70">Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-7 md:p-9 text-white shadow-xl">
          <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
            Member Dashboard
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold">My Clubs</h1>

          <p className="mt-3 text-white/90 max-w-2xl">
            Review your joined clubs, open club details, or leave a club when
            you no longer want to stay connected.
          </p>
        </div>

        {memberships.length === 0 ? (
          <div className="rounded-3xl border border-base-300 bg-white shadow-md p-10 text-center">
            <h3 className="text-2xl font-bold mb-3">No joined clubs yet</h3>
            <p className="text-base-content/70 mb-6">
              You have not joined any club yet. Explore clubs and become part of
              a community.
            </p>
            <Link to="/clubs" className="btn btn-primary rounded-full px-6">
              Browse Clubs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {memberships.map((membership) => (
              <div
                key={membership._id}
                className="rounded-3xl bg-white border border-base-300 shadow-md hover:shadow-xl transition duration-300 p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {membership.clubName}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 break-all">
                      {membership.userEmail}
                    </p>
                  </div>

                  <span className="badge badge-success badge-outline capitalize px-4 py-3">
                    {membership.status}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-slate-600 mb-6">
                  <p>
                    <span className="font-semibold">Joined At:</span>{" "}
                    {new Date(membership.joinedAt).toLocaleDateString()}
                  </p>

                  {membership.paymentId && (
                    <p>
                      <span className="font-semibold">Payment ID:</span>{" "}
                      <span className="break-all">{membership.paymentId}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-base-200">
                  <Link
                    to={`/clubs/${membership.clubId}`}
                    className="btn btn-outline btn-primary rounded-full px-5"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleLeaveClub(membership._id)}
                    disabled={leaveMutation.isPending}
                    className="btn btn-error text-white rounded-full px-5"
                  >
                    {leaveMutation.isPending ? "Leaving..." : "Leave Club"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyClubs;