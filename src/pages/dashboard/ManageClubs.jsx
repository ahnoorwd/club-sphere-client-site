// import { use } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../../Authprovider/AuthProvider";
// import axios from "axios";
// import { Link } from "react-router";

// const ManageClubs = () => {
//   const { user } = use(AuthContext);

//   const { data: clubs = [], isLoading, isError } = useQuery({
//     queryKey: ["managerClubs", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:5000/clubs?email=${user.email}`);
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-[60vh] flex justify-center items-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-[60vh] flex justify-center items-center">
//         <h2 className="text-2xl font-bold">Failed to load your clubs</h2>
//       </div>
//     );
//   }

//   return (
//     <section className="py-10 px-4 md:px-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
//               Manage Clubs
//             </h1>
//             <p className="mt-2 text-slate-500">
//               View the clubs you created and track their approval status.
//             </p>
//           </div>

//           <Link to="/dashboard/add-club" className="btn btn-primary rounded-xl">
//             Add New Club
//           </Link>
//         </div>

//         {clubs.length === 0 ? (
//           <div className="rounded-3xl bg-white border border-base-300 shadow-md p-10 text-center">
//             <h3 className="text-2xl font-bold mb-3">No clubs found</h3>
//             <p className="text-base-content/70 mb-5">
//               You have not created any clubs yet.
//             </p>
//             <Link to="/dashboard/add-club" className="btn btn-primary rounded-xl">
//               Create Your First Club
//             </Link>
//           </div>
//         ) : (
//           <div className="overflow-x-auto rounded-3xl border border-base-300 shadow-md bg-white">
//             <table className="table">
//               <thead className="bg-base-200 text-slate-700">
//                 <tr>
//                   <th>#</th>
//                   <th>Club Name</th>
//                   <th>Category</th>
//                   <th>Location</th>
//                   <th>Fee</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {clubs.map((club, index) => (
//                   <tr key={club._id}>
//                     <td>{index + 1}</td>
//                     <td className="font-semibold">{club.clubName}</td>
//                     <td>{club.category}</td>
//                     <td>{club.location}</td>
//                     <td>${club.membershipFee}</td>
//                     <td>
//                       <span
//                         className={`badge capitalize ${
//                           club.status === "approved"
//                             ? "badge-success"
//                             : club.status === "pending"
//                             ? "badge-warning"
//                             : "badge-error"
//                         }`}
//                       >
//                         {club.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ManageClubs;


import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Authprovider/AuthProvider";
import axios from "axios";
import { Link } from "react-router";

const ManageClubs = () => {
  const { user } = use(AuthContext);

  const { data: clubs = [], isLoading, isError } = useQuery({
    queryKey: ["managerClubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/clubs?email=${user.email}`
      );
      return res.data;
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
      <div className="min-h-[60vh] flex justify-center items-center">
        <h2 className="text-2xl font-bold">Failed to load your clubs</h2>
      </div>
    );
  }

  return (
    <section className="relative py-10 px-4 md:px-6 overflow-hidden">
      <div className="absolute -top-28 -left-24 w-80 h-80 bg-cyan-300/25 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-28 w-96 h-96 bg-violet-300/25 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-28 left-1/3 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-10 rounded-[2rem] bg-slate-950 p-7 md:p-9 text-white shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.38),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.38),transparent_35%)]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs font-bold text-cyan-300 mb-2">
                Manager Dashboard
              </p>

              <h1 className="text-3xl md:text-5xl font-black">
                Manage Clubs
              </h1>

              <p className="mt-3 text-white/70 max-w-2xl leading-7">
                View the clubs you created, monitor approval status, track fees,
                and manage your community presence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-xl min-w-[150px]">
                <p className="text-sm text-white/50">Total Clubs</p>
                <p className="text-3xl font-black text-cyan-300 mt-1">
                  {clubs.length}
                </p>
              </div>

              <Link
                to="/dashboard/add-club"
                className="btn h-auto min-h-[76px] rounded-3xl border-none px-7 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-black shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
              >
                + Add New Club
              </Link>
            </div>
          </div>
        </div>

        {clubs.length === 0 ? (
          <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center text-white text-4xl shadow-xl">
              +
            </div>

            <h3 className="text-2xl font-black text-slate-900 mt-6 mb-3">
              No clubs found
            </h3>

            <p className="text-slate-600 mb-7">
              You have not created any clubs yet.
            </p>

            <Link
              to="/dashboard/add-club"
              className="btn rounded-2xl border-none px-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-black shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
            >
              Create Your First Club
            </Link>
          </div>
        ) : (
          <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl shadow-2xl border border-white overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Club Records
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Your created clubs and current approval progress.
                </p>
              </div>

              <span className="inline-flex w-fit rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2 text-white font-black text-sm shadow-lg">
                Manager Control Table
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-50 via-white to-violet-50 text-slate-700">
                    <th className="py-5">#</th>
                    <th>Club Name</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Fee</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {clubs.map((club, index) => (
                    <tr
                      key={club._id}
                      className="hover:bg-cyan-50/60 transition-all"
                    >
                      <td className="font-black text-slate-500">
                        {index + 1}
                      </td>

                      <td>
                        <p className="font-black text-slate-900">
                          {club.clubName}
                        </p>
                      </td>

                      <td>
                        <span className="rounded-2xl bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700">
                          {club.category}
                        </span>
                      </td>

                      <td className="font-semibold text-slate-600">
                        {club.location}
                      </td>

                      <td>
                        <span className="font-black text-lg bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
                          ${club.membershipFee}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`capitalize rounded-2xl px-4 py-2 text-sm font-black border ${
                            club.status === "approved"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-300"
                              : club.status === "pending"
                              ? "bg-amber-50 text-amber-600 border-amber-300"
                              : "bg-rose-50 text-rose-600 border-rose-300"
                          }`}
                        >
                          {club.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-gradient-to-r from-cyan-50 via-white to-violet-50 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Tip: Pending clubs need admin approval before becoming visible
                as approved communities.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageClubs;