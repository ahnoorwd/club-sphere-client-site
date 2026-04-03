import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FeaturedClubs = () => {
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/clubs/featured");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Clubs</h2>
          <p className="text-base-content/70 mb-10 max-w-2xl mx-auto">
            Discover some of the most active and exciting clubs around you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden bg-base-200 shadow animate-pulse"
              >
                <div className="h-52 w-full bg-base-300"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 bg-base-300 rounded"></div>
                  <div className="h-4 w-1/3 bg-base-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-base-300 rounded"></div>
                  <div className="h-4 w-1/4 bg-base-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content">
            Featured Clubs
          </h2>
          <p className="mt-4 text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
            Explore popular communities, connect with like-minded people, and
            find the perfect club for your interests.
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
                  className="h-52 sm:h-56 md:h-60 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4">
                  <span className="badge badge-primary badge-outline bg-base-100/90 backdrop-blur-sm px-4 py-3 font-medium">
                    {club.category}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-base-content mb-2 line-clamp-1">
                    {club.clubName}
                  </h3>

                  <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
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

                <div className="mt-5 pt-4 border-t border-base-300 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-base-content/60">Membership Fee</p>
                    <p className="text-lg font-extrabold text-primary">
                      {club.membershipFee === 0
                        ? "Free"
                        : `$${club.membershipFee}`}
                    </p>
                  </div>

                  <button className="btn btn-primary btn-sm rounded-full px-5">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClubs;