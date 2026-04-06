import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { AuthContext } from "../../Authprovider/AuthProvider";
import { getUserMemberships } from "../../api/memberships";

const MyClubs = () => {
  const { user } = use(AuthContext);

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
        <p className="text-base-content/70">
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            My Clubs
          </h1>
          <p className="mt-3 text-slate-500 max-w-2xl">
            Here are the clubs you have joined. You can review your membership
            status and quickly go back to the club details page.
          </p>
        </div>

        {memberships.length === 0 ? (
          <div className="rounded-3xl border border-base-300 bg-white shadow-md p-10 text-center">
            <h3 className="text-2xl font-bold mb-3">No joined clubs yet</h3>
            <p className="text-base-content/70 mb-6">
              You have not joined any club yet. Explore clubs and become part of a community.
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

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-base-200">
                  <Link
                    to={`/clubs/${membership.clubId}`}
                    className="btn btn-outline btn-primary rounded-full px-5"
                  >
                    View Details
                  </Link>

                  <span className="text-xs text-slate-400">Club Member</span>
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