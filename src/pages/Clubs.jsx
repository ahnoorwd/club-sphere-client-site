import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const Clubs = () => {
  const { data: clubs = [], isLoading, isError } = useQuery({
    queryKey: ["allClubs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/clubs");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Failed to load clubs</h2>
        <p className="text-base-content/70">Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-base-content">
            All Clubs
          </h1>
          <p className="mt-4 text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
            Browse all available clubs and find the one that matches your passion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="group bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4">
                  <span className="badge badge-primary badge-outline bg-base-100/90 backdrop-blur-sm px-4 py-3 font-medium">
                    {club.category}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-base-content mb-2 line-clamp-1">
                    {club.clubName}
                  </h2>

                  <p className="text-sm text-base-content/70 mb-4 line-clamp-3">
                    {club.description}
                  </p>

                  <div className="space-y-2 text-sm text-base-content/80">
                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {club.location}
                    </p>
                    <p>
                      <span className="font-semibold">Manager:</span>{" "}
                      {club.managerEmail}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span className="capitalize text-success font-medium">
                        {club.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-base-300 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-base-content/60">Membership Fee</p>
                    <p className="text-lg font-extrabold text-primary">
                      {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                    </p>
                  </div>

                  <Link
                    to={`/clubs/${club._id}`}
                    className="btn btn-primary btn-sm rounded-full px-5"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {clubs.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">No clubs found</h3>
            <p className="text-base-content/70">
              There are no clubs available right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Clubs;