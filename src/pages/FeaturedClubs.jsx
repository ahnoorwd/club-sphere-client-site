// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Link } from "react-router";

// const FeaturedClubs = () => {
//   const { data: clubs = [], isLoading } = useQuery({
//     queryKey: ["featuredClubs"],
//     queryFn: async () => {
//       const res = await axios.get("http://localhost:5000/clubs/featured");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="py-16 text-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   return (
//     <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-100">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-base-content">
//             Featured Clubs
//           </h2>
//           <p className="mt-4 text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
//             Explore popular communities, connect with like-minded people, and
//             find the perfect club for your interests.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
//           {clubs.map((club) => (
//             <div
//               key={club._id}
//               className="group bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   src={club.bannerImage}
//                   alt={club.clubName}
//                   className="h-52 sm:h-56 md:h-60 w-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />

//                 <div className="absolute top-4 left-4">
//                   <span className="badge badge-primary badge-outline bg-base-100/90 backdrop-blur-sm px-4 py-3 font-medium">
//                     {club.category}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-5 md:p-6 flex flex-col flex-grow">
//                 <div className="flex-grow">
//                   <h3 className="text-xl font-bold text-base-content mb-2 line-clamp-1">
//                     {club.clubName}
//                   </h3>

//                   <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
//                     {club.description}
//                   </p>

//                   <div className="space-y-2 text-sm text-base-content/80">
//                     <p>
//                       <span className="font-semibold">Location:</span>{" "}
//                       {club.location}
//                     </p>

//                     <p>
//                       <span className="font-semibold">Manager:</span>{" "}
//                       {club.managerEmail}
//                     </p>

//                     <p>
//                       <span className="font-semibold">Status:</span>{" "}
//                       <span className="capitalize text-success font-medium">
//                         {club.status}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-5 pt-4 border-t border-base-300 flex items-center justify-between gap-3">
//                   <div>
//                     <p className="text-xs text-base-content/60">Membership Fee</p>
//                     <p className="text-lg font-extrabold text-primary">
//                       {club.membershipFee === 0
//                         ? "Free"
//                         : `$${club.membershipFee}`}
//                     </p>
//                   </div>

//                   <Link
//                     to={`/clubs/${club._id}`}
//                     className="btn btn-primary btn-sm rounded-full px-5"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Show More Button */}
//         <div className="text-center mt-12">
//           <Link to="/clubs" className="btn btn-outline btn-primary rounded-full px-8">
//             Show More Clubs
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedClubs;



import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

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
      <div className="py-16 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_38%,#f5f3ff_72%,#fff1f2_100%)]">
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:54px_54px]"></div>

      <div className="absolute -top-28 -left-28 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-violet-400/25 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300/25 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white shadow-lg text-sm font-black text-cyan-600">
            ✦ Featured Communities
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Clubs
            </span>
          </h2>

          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-8">
            Explore popular communities, connect with like-minded people, and
            find the perfect club for your interests.
          </p>

          <div className="mt-8 flex justify-center gap-2">
            <span className="w-16 h-1.5 rounded-full bg-cyan-500"></span>
            <span className="w-8 h-1.5 rounded-full bg-blue-500"></span>
            <span className="w-16 h-1.5 rounded-full bg-violet-500"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="group relative rounded-[2rem] p-[1.5px] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:-translate-y-3 flex flex-col"
            >
              <div className="relative h-full rounded-[2rem] bg-white/95 backdrop-blur-xl overflow-hidden flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={club.bannerImage}
                    alt={club.clubName}
                    className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"></div>

                  <div className="absolute top-5 left-5">
                    <span className="inline-flex px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-black shadow-lg">
                      {club.category}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-2xl font-black text-white line-clamp-1 drop-shadow-lg">
                      {club.clubName}
                    </h3>
                    <p className="mt-1 text-sm text-white/80 line-clamp-1">
                      {club.location}
                    </p>
                  </div>
                </div>

                <div className="relative p-6 flex flex-col flex-grow">
                  <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl group-hover:bg-violet-400/25 transition"></div>

                  <div className="relative flex-grow">
                    <p className="text-sm text-slate-600 mb-5 line-clamp-2 leading-7">
                      {club.description}
                    </p>

                    <div className="space-y-3 rounded-3xl bg-gradient-to-br from-cyan-50 via-white to-violet-50 border border-cyan-100 p-4 text-sm text-slate-700">
                      <p>
                        <span className="font-black text-slate-900">
                          Location:
                        </span>{" "}
                        {club.location}
                      </p>

                      <p className="line-clamp-1">
                        <span className="font-black text-slate-900">
                          Manager:
                        </span>{" "}
                        {club.managerEmail}
                      </p>

                      <p>
                        <span className="font-black text-slate-900">
                          Status:
                        </span>{" "}
                        <span className="capitalize text-emerald-600 font-black">
                          {club.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-6 pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">
                        Membership Fee
                      </p>
                      <p className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
                        {club.membershipFee === 0
                          ? "Free"
                          : `$${club.membershipFee}`}
                      </p>
                    </div>

                    <Link
                      to={`/clubs/${club._id}`}
                      className="btn rounded-full border-none bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-black px-6 shadow-lg shadow-cyan-500/20 hover:shadow-violet-500/30 hover:scale-105 transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/clubs"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-10 py-4 font-black text-white shadow-2xl shadow-cyan-500/25 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 hover:scale-105 transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Show More Clubs</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClubs;