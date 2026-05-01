// import { use } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Link } from "react-router";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Authprovider/AuthProvider";
// import { getUserMemberships, leaveClub } from "../../api/memberships";

// const MyClubs = () => {
//   const { user } = use(AuthContext);
//   const queryClient = useQueryClient();

//   const {
//     data: memberships = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["myMemberships", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       return await getUserMemberships(user.email);
//     },
//   });

//   const leaveMutation = useMutation({
//     mutationFn: async (membershipId) => {
//       return await leaveClub(membershipId);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["myMemberships", user?.email]);
//     },
//   });

//   const handleLeaveClub = async (membershipId) => {
//     const confirm = await Swal.fire({
//       title: "Leave this club?",
//       text: "You will no longer be a member of this club.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, leave",
//       cancelButtonText: "Cancel",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       const result = await leaveMutation.mutateAsync(membershipId);

//       if (result.deletedCount > 0) {
//         Swal.fire({
//           icon: "success",
//           title: "Left Club",
//           text: "You have successfully left this club.",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed",
//         text: "Could not leave club. Please try again.",
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
//       <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
//         <h2 className="text-3xl font-bold mb-3">Failed to load your clubs</h2>
//         <p className="text-base-content/70">Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <section className="py-10 px-4 md:px-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-10 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-7 md:p-9 text-white shadow-xl">
//           <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
//             Member Dashboard
//           </p>

//           <h1 className="text-3xl md:text-5xl font-extrabold">My Clubs</h1>

//           <p className="mt-3 text-white/90 max-w-2xl">
//             Review your joined clubs, open club details, or leave a club when
//             you no longer want to stay connected.
//           </p>
//         </div>

//         {memberships.length === 0 ? (
//           <div className="rounded-3xl border border-base-300 bg-white shadow-md p-10 text-center">
//             <h3 className="text-2xl font-bold mb-3">No joined clubs yet</h3>
//             <p className="text-base-content/70 mb-6">
//               You have not joined any club yet. Explore clubs and become part of
//               a community.
//             </p>
//             <Link to="/clubs" className="btn btn-primary rounded-full px-6">
//               Browse Clubs
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {memberships.map((membership) => (
//               <div
//                 key={membership._id}
//                 className="rounded-3xl bg-white border border-base-300 shadow-md hover:shadow-xl transition duration-300 p-6"
//               >
//                 <div className="flex items-start justify-between gap-4 mb-5">
//                   <div>
//                     <h3 className="text-xl font-bold text-slate-800">
//                       {membership.clubName}
//                     </h3>
//                     <p className="text-sm text-slate-500 mt-1 break-all">
//                       {membership.userEmail}
//                     </p>
//                   </div>

//                   <span className="badge badge-success badge-outline capitalize px-4 py-3">
//                     {membership.status}
//                   </span>
//                 </div>

//                 <div className="space-y-3 text-sm text-slate-600 mb-6">
//                   <p>
//                     <span className="font-semibold">Joined At:</span>{" "}
//                     {new Date(membership.joinedAt).toLocaleDateString()}
//                   </p>

//                   {membership.paymentId && (
//                     <p>
//                       <span className="font-semibold">Payment ID:</span>{" "}
//                       <span className="break-all">{membership.paymentId}</span>
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-base-200">
//                   <Link
//                     to={`/clubs/${membership.clubId}`}
//                     className="btn btn-outline btn-primary rounded-full px-5"
//                   >
//                     View Details
//                   </Link>

//                   <button
//                     onClick={() => handleLeaveClub(membership._id)}
//                     disabled={leaveMutation.isPending}
//                     className="btn btn-error text-white rounded-full px-5"
//                   >
//                     {leaveMutation.isPending ? "Leaving..." : "Leave Club"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default MyClubs;

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

  const handleManagerBusy = () => {
    Swal.fire({
      icon: "info",
      title: "Manager Busy",
      text: "Currently the club manager is busy to respond. Please try again later.",
      confirmButtonText: "Okay",
      confirmButtonColor: "#06b6d4",
    });
  };

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
            Review your joined clubs, contact club managers, open club details,
            or leave a club when needed.
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {memberships.map((membership) => {
              const club = membership.clubInfo;

              return (
                <div
                  key={membership._id}
                  className="group relative rounded-[2rem] bg-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 border border-slate-100"
                >
                  <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-300/20 rounded-full blur-3xl group-hover:bg-violet-300/25 transition"></div>
                  <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-pink-300/20 rounded-full blur-3xl"></div>

                  <div className="relative grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-5 relative h-72 md:h-full min-h-[360px] overflow-hidden">
                      <img
                        src={
                          club?.bannerImage ||
                          club?.image ||
                          club?.photoURL ||
                          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                        }
                        alt={club?.clubName || membership.clubName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                      <span className="absolute top-5 left-5 rounded-2xl bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-black text-slate-900 shadow-lg">
                        {club?.category || "Category"}
                      </span>

                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="text-white/70 text-sm font-semibold">
                          Joined Club
                        </p>
                        <h3 className="text-3xl font-black text-white drop-shadow-lg line-clamp-2">
                          {club?.clubName || membership.clubName}
                        </h3>
                      </div>
                    </div>

                    <div className="md:col-span-7 relative p-7 md:p-8">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-3xl font-black text-slate-900 leading-tight">
                            {club?.clubName || membership.clubName}
                          </h3>

                          <p className="text-sm font-semibold bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent mt-2">
                            {club?.category || "Category not available"}
                          </p>
                        </div>

                        <span className="capitalize rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-2 text-sm font-black text-emerald-600">
                          {membership.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                        <div className="rounded-3xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 p-4">
                          <p className="text-xs font-semibold text-slate-400">
                            Location
                          </p>
                          <p className="mt-1 font-black text-slate-800">
                            {club?.location || "Not provided"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleManagerBusy}
                          className="text-left rounded-3xl bg-gradient-to-br from-violet-50 to-white border border-violet-100 p-4 hover:shadow-lg hover:-translate-y-1 transition-all"
                        >
                          <p className="text-xs font-semibold text-slate-400">
                            Manager Email
                          </p>
                          <p className="mt-1 font-black text-slate-800 break-all">
                            {club?.managerEmail || "Not available"}
                          </p>
                        </button>

                        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-4">
                          <p className="text-xs font-semibold text-slate-400">
                            Joined At
                          </p>
                          <p className="mt-1 font-black text-slate-800">
                            {membership.joinedAt
                              ? new Date(
                                  membership.joinedAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>

                        <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 p-4">
                          <p className="text-xs font-semibold text-slate-400">
                            Payment ID
                          </p>
                          <p className="mt-1 font-black text-slate-800 break-all">
                            {membership.paymentId || "Free Membership"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-100">
                        <Link
                          to={`/clubs/${membership.clubId}`}
                          className="btn rounded-2xl border border-violet-500 bg-white text-violet-600 hover:bg-violet-600 hover:text-white font-black px-6"
                        >
                          View Details
                        </Link>

                        {club?.managerEmail && (
                          <button
                            type="button"
                            onClick={handleManagerBusy}
                            className="btn rounded-2xl border-none bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black px-6 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
                          >
                            Contact Manager
                          </button>
                        )}

                        <button
                          onClick={() => handleLeaveClub(membership._id)}
                          disabled={leaveMutation.isPending}
                          className="btn rounded-2xl border-none bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black px-6 shadow-lg shadow-rose-500/20 hover:scale-105 transition-all"
                        >
                          {leaveMutation.isPending
                            ? "Leaving..."
                            : "Leave Club"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyClubs;