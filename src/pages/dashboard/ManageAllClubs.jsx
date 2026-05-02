// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { getAllClubs, updateClubStatus } from "../../api/clubs";

// const ManageAllClubs = () => {
//   const queryClient = useQueryClient();

//   const {
//     data: clubs = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["allClubsAdmin"],
//     queryFn: async () => {
//       return await getAllClubs();
//     },
//   });

//   const statusMutation = useMutation({
//     mutationFn: async ({ id, status }) => {
//       return await updateClubStatus(id, status);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["allClubsAdmin"]);
//     },
//   });

//   const handleStatusUpdate = async (id, status) => {
//     const confirm = await Swal.fire({
//       title: `Are you sure?`,
//       text: `You want to mark this club as ${status}.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: `Yes, ${status}`,
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       await statusMutation.mutateAsync({ id, status });

//       Swal.fire({
//         icon: "success",
//         title: "Updated",
//         text: `Club status changed to ${status}.`,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed",
//         text: "Could not update club status.",
//       });
//     }
//   };

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
//         <h2 className="text-2xl font-bold">Failed to load clubs</h2>
//       </div>
//     );
//   }

//   return (
//     <section className="py-10 px-4 md:px-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
//             Manage All Clubs
//           </h1>
//           <p className="mt-2 text-slate-500">
//             Review all submitted clubs and approve or reject them.
//           </p>
//         </div>

//         <div className="overflow-x-auto rounded-3xl border border-base-300 shadow-md bg-white">
//           <table className="table">
//             <thead className="bg-base-200 text-slate-700">
//               <tr>
//                 <th>#</th>
//                 <th>Club Name</th>
//                 <th>Category</th>
//                 <th>Manager Email</th>
//                 <th>Location</th>
//                 <th>Fee</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {clubs.map((club, index) => (
//                 <tr key={club._id}>
//                   <td>{index + 1}</td>
//                   <td className="font-semibold">{club.clubName}</td>
//                   <td>{club.category}</td>
//                   <td className="break-all">{club.managerEmail}</td>
//                   <td>{club.location}</td>
//                   <td>${club.membershipFee}</td>
//                   <td>
//                     <span
//                       className={`badge capitalize ${
//                         club.status === "approved"
//                           ? "badge-success"
//                           : club.status === "pending"
//                           ? "badge-warning"
//                           : "badge-error"
//                       }`}
//                     >
//                       {club.status}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="flex flex-wrap gap-2">
//                       <button
//                         onClick={() =>
//                           handleStatusUpdate(club._id, "approved")
//                         }
//                         disabled={club.status === "approved"}
//                         className="btn btn-xs btn-success text-white"
//                       >
//                         Approve
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleStatusUpdate(club._id, "rejected")
//                         }
//                         disabled={club.status === "rejected"}
//                         className="btn btn-xs btn-error text-white"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ManageAllClubs;


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getAllClubs, updateClubStatus } from "../../api/clubs";

const ManageAllClubs = () => {
  const queryClient = useQueryClient();

  const {
    data: clubs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allClubsAdmin"],
    queryFn: async () => {
      return await getAllClubs();
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await updateClubStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allClubsAdmin"]);
    },
  });

  const handleStatusUpdate = async (id, status) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to mark this club as ${status}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    });

    if (!confirm.isConfirmed) return;

    try {
      await statusMutation.mutateAsync({ id, status });

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: `Club status changed to ${status}.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not update club status.",
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
      <div className="min-h-[60vh] flex justify-center items-center">
        <h2 className="text-2xl font-bold">Failed to load clubs</h2>
      </div>
    );
  }

  const approvedClubs = clubs.filter((club) => club.status === "approved").length;
  const pendingClubs = clubs.filter((club) => club.status === "pending").length;
  const rejectedClubs = clubs.filter((club) => club.status === "rejected").length;

  return (
    <section className="relative py-10 px-4 md:px-6 overflow-hidden">
      <div className="absolute -top-28 -left-24 w-80 h-80 bg-cyan-300/25 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-28 w-96 h-96 bg-violet-300/25 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-28 left-1/3 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-10 rounded-[2rem] bg-slate-950 p-7 md:p-9 text-white shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.38),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.38),transparent_35%)]"></div>

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-7">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs font-bold text-cyan-300 mb-2">
                Admin Dashboard
              </p>

              <h1 className="text-3xl md:text-5xl font-black">
                Manage All Clubs
              </h1>

              <p className="mt-3 text-white/70 max-w-2xl leading-7">
                Review all submitted clubs, verify manager requests, and approve
                or reject clubs before they become visible to members.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
                <p className="text-sm text-white/50">Total</p>
                <p className="text-3xl font-black text-cyan-300 mt-1">
                  {clubs.length}
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
                <p className="text-sm text-white/50">Approved</p>
                <p className="text-3xl font-black text-emerald-300 mt-1">
                  {approvedClubs}
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
                <p className="text-sm text-white/50">Pending</p>
                <p className="text-3xl font-black text-amber-300 mt-1">
                  {pendingClubs}
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
                <p className="text-sm text-white/50">Rejected</p>
                <p className="text-3xl font-black text-rose-300 mt-1">
                  {rejectedClubs}
                </p>
              </div>
            </div>
          </div>
        </div>

        {clubs.length === 0 ? (
          <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center text-white text-4xl shadow-xl">
              ✓
            </div>

            <h3 className="text-2xl font-black text-slate-900 mt-6 mb-3">
              No clubs submitted yet
            </h3>

            <p className="text-slate-600">
              New club requests will appear here when managers create clubs.
            </p>
          </div>
        ) : (
          <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl shadow-2xl border border-white overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Club Approval Records
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Control every club request with a clear admin review table.
                </p>
              </div>

              <span className="inline-flex w-fit rounded-2xl bg-gradient-to-r from-rose-500 via-orange-500 to-violet-500 px-5 py-2 text-white font-black text-sm shadow-lg">
                Admin Control Panel
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white">
                    <th className="py-5">#</th>
                    <th>Club Name</th>
                    <th>Category</th>
                    <th>Manager Email</th>
                    <th>Location</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {clubs.map((club, index) => (
                    <tr
                      key={club._id}
                      className="hover:bg-cyan-50/70 transition-all"
                    >
                      <td className="font-black text-slate-500">
                        {index + 1}
                      </td>

                      <td>
                        <div>
                          <p className="font-black text-slate-900">
                            {club.clubName}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Club request
                          </p>
                        </div>
                      </td>

                      <td>
                        <span className="rounded-2xl bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700">
                          {club.category}
                        </span>
                      </td>

                      <td className="max-w-[230px]">
                        <p className="truncate rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                          {club.managerEmail}
                        </p>
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

                      <td>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(club._id, "approved")
                            }
                            disabled={club.status === "approved"}
                            className="btn btn-sm rounded-2xl border-none bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black shadow-lg shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(club._id, "rejected")
                            }
                            disabled={club.status === "rejected"}
                            className="btn btn-sm rounded-2xl border-none bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black shadow-lg shadow-rose-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-gradient-to-r from-cyan-50 via-white to-violet-50 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Admin note: Approved clubs become available for members, while
                rejected clubs stay blocked from public discovery.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageAllClubs;