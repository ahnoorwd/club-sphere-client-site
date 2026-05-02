// import { use } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../Authprovider/AuthProvider";
// import { getProfileStats } from "../api/profile";

// const Profile = () => {
//   const { user } = use(AuthContext);

//   const {
//     data: stats = {},
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["profileStats", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       return await getProfileStats(user.email);
//     },
//   });

//   const role = stats?.role || "member";

//   const roleBadgeClass = {
//     member: "from-emerald-500 to-teal-500",
//     clubManager: "from-cyan-500 to-violet-500",
//     admin: "from-rose-500 to-orange-500",
//   };

//   const statCards =
//     role === "admin"
//       ? [
//           { title: "Total Users", value: stats.totalUsers || 0 },
//           { title: "Total Clubs", value: stats.totalClubs || 0 },
//           { title: "Total Payments", value: stats.totalPayments || 0 },
//         ]
//       : role === "clubManager"
//       ? [
//           { title: "Created Clubs", value: stats.createdClubs || 0 },
//           { title: "Created Events", value: stats.createdEvents || 0 },
//           { title: "Role", value: "Manager" },
//         ]
//       : [
//           { title: "Joined Clubs", value: stats.joinedClubs || 0 },
//           { title: "Registered Events", value: stats.registeredEvents || 0 },
//           { title: "Payments", value: stats.payments || 0 },
//         ];

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-center">
//         <h2 className="text-2xl font-bold">Failed to load profile</h2>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-base-100 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="rounded-[2rem] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
//           <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-white/10"></div>
//           <div className="absolute right-20 -bottom-24 w-72 h-72 rounded-full bg-white/10"></div>

//           <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
//             <div className="avatar">
//               <div className="w-28 h-28 rounded-3xl ring ring-white/60 ring-offset-4 ring-offset-transparent overflow-hidden">
//                 <img
//                   src={user?.photoURL || "https://i.ibb.co/2kR5zqM/user.png"}
//                   alt={user?.displayName || "User"}
//                   className="object-cover"
//                 />
//               </div>
//             </div>

//             <div className="flex-1">
//               <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
//                 Profile Center
//               </p>

//               <h1 className="text-3xl md:text-5xl font-extrabold">
//                 {user?.displayName || "User Profile"}
//               </h1>

//               <p className="mt-2 text-white/90">{user?.email}</p>

//               <div
//                 className={`inline-flex mt-4 px-5 py-2 rounded-full bg-gradient-to-r ${
//                   roleBadgeClass[role] || roleBadgeClass.member
//                 } shadow-lg font-semibold capitalize`}
//               >
//                 {role === "clubManager" ? "Club Manager" : role}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
//           {statCards.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white border border-base-300 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
//             >
//               <p className="text-sm text-slate-500 font-medium">
//                 {item.title}
//               </p>
//               <h3 className="text-4xl font-extrabold text-slate-800 mt-3">
//                 {item.value}
//               </h3>
//             </div>
//           ))}
//         </div>

//         {/* Account Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//           <div className="bg-white border border-base-300 rounded-3xl p-6 md:p-8 shadow-md">
//             <h2 className="text-2xl font-extrabold text-slate-800 mb-5">
//               Account Information
//             </h2>

//             <div className="space-y-4">
//               <div className="rounded-2xl bg-slate-100 p-4">
//                 <p className="text-sm text-slate-500">Full Name</p>
//                 <p className="font-bold text-slate-800">
//                   {user?.displayName || "Not Provided"}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-slate-100 p-4">
//                 <p className="text-sm text-slate-500">Email Address</p>
//                 <p className="font-bold text-slate-800 break-all">
//                   {user?.email}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-slate-100 p-4">
//                 <p className="text-sm text-slate-500">Dashboard Role</p>
//                 <p className="font-bold text-slate-800 capitalize">
//                   {role === "clubManager" ? "Club Manager" : role}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white border border-base-300 rounded-3xl p-6 md:p-8 shadow-md">
//             <h2 className="text-2xl font-extrabold text-slate-800 mb-5">
//               Activity Summary
//             </h2>

//             <p className="text-slate-500 leading-7">
//               This profile gives a quick overview of your ClubSphere activity.
//               Your role-based stats help you track your contribution, joined
//               clubs, registered events, payments, or platform management
//               activity.
//             </p>

//             <div className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 p-5 text-white">
//               <p className="font-semibold">
//                 Current Access Level:{" "}
//                 {role === "clubManager" ? "Club Manager" : role}
//               </p>
//               <p className="text-sm text-white/80 mt-1">
//                 Your dashboard options are customized based on this role.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Profile;



import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Authprovider/AuthProvider";
import { getProfileStats } from "../api/profile";

const Profile = () => {
  const { user } = use(AuthContext);

  const {
    data: stats = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profileStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      return await getProfileStats(user.email);
    },
  });

  const role = stats?.role || "member";

  const roleBadgeClass = {
    member: "from-emerald-500 to-teal-500",
    clubManager: "from-cyan-500 to-violet-500",
    admin: "from-rose-500 to-orange-500",
  };

  const statCards =
    role === "admin"
      ? [
          { title: "Total Users", value: stats.totalUsers || 0 },
          { title: "Total Clubs", value: stats.totalClubs || 0 },
          { title: "Total Payments", value: stats.totalPayments || 0 },
        ]
      : role === "clubManager"
      ? [
          { title: "Created Clubs", value: stats.createdClubs || 0 },
          { title: "Created Events", value: stats.createdEvents || 0 },
          { title: "Role", value: "Manager" },
        ]
      : [
          { title: "Joined Clubs", value: stats.joinedClubs || 0 },
          { title: "Registered Events", value: stats.registeredEvents || 0 },
          { title: "Payments", value: stats.payments || 0 },
        ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-cyan-50 via-white to-violet-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center bg-gradient-to-br from-cyan-50 via-white to-violet-50">
        <h2 className="text-2xl font-bold">Failed to load profile</h2>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_38%,#f5f3ff_72%,#fff1f2_100%)] py-12 px-4">
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:54px_54px]"></div>
      <div className="absolute -top-28 -left-28 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-violet-400/25 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300/25 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.38),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.38),transparent_35%)]"></div>
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -left-16 -bottom-24 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl"></div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-cyan-400 to-violet-500 blur-lg opacity-70"></div>

                <div className="relative avatar">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] ring-4 ring-white/40 overflow-hidden shadow-2xl">
                    <img
                      src={user?.photoURL || "https://i.ibb.co/2kR5zqM/user.png"}
                      alt={user?.displayName || "User"}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-white">
                <p className="uppercase tracking-[0.3em] text-xs font-bold text-cyan-200 mb-3">
                  Profile Center
                </p>

                <h1 className="text-4xl md:text-6xl font-black leading-tight">
                  {user?.displayName || "User Profile"}
                </h1>

                <p className="mt-3 text-white/70 break-all">{user?.email}</p>

                <div
                  className={`inline-flex mt-5 px-6 py-3 rounded-2xl bg-gradient-to-r ${
                    roleBadgeClass[role] || roleBadgeClass.member
                  } shadow-lg font-black capitalize`}
                >
                  {role === "clubManager" ? "Club Manager" : role}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 min-w-[260px]">
                <div className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-5 text-white">
                  <p className="text-sm text-white/50">Account</p>
                  <p className="mt-1 text-xl font-black">Verified</p>
                </div>

                <div className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-5 text-white">
                  <p className="text-sm text-white/50">Status</p>
                  <p className="mt-1 text-xl font-black text-emerald-300">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {statCards.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[2rem] bg-white/90 backdrop-blur-xl border border-white p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-cyan-300/20 rounded-full blur-3xl group-hover:bg-violet-300/30 transition"></div>

              <div className="relative">
                <p className="text-sm text-slate-500 font-bold">
                  {item.title}
                </p>

                <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent mt-4">
                  {item.value}
                </h3>

                <div className="mt-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 group-hover:w-24 transition-all"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl border border-white p-7 md:p-8 shadow-xl">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-black text-cyan-600">
                  Personal Details
                </p>
                <h2 className="text-3xl font-black text-slate-900">
                  Account Information
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 p-5">
                <p className="text-sm text-slate-500 font-semibold">
                  Full Name
                </p>
                <p className="font-black text-slate-900 mt-1">
                  {user?.displayName || "Not Provided"}
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-white border border-violet-100 p-5">
                <p className="text-sm text-slate-500 font-semibold">
                  Email Address
                </p>
                <p className="font-black text-slate-900 mt-1 break-all">
                  {user?.email}
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-5">
                <p className="text-sm text-slate-500 font-semibold">
                  Dashboard Role
                </p>
                <p className="font-black text-slate-900 mt-1 capitalize">
                  {role === "clubManager" ? "Club Manager" : role}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-7 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.35),transparent_35%)]"></div>

            <div className="relative text-white">
              <p className="text-sm font-black text-cyan-300">
                Activity Summary
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Your ClubSphere Journey
              </h2>

              <p className="mt-5 text-white/65 leading-8">
                This profile gives a quick overview of your ClubSphere activity.
                Your role-based stats help you track your contribution, joined
                clubs, registered events, payments, or platform management
                activity.
              </p>

              <div className="mt-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-6">
                <p className="font-black">
                  Current Access Level:{" "}
                  <span className="text-cyan-300">
                    {role === "clubManager" ? "Club Manager" : role}
                  </span>
                </p>

                <p className="text-sm text-white/60 mt-2">
                  Your dashboard options are customized based on this role.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white/10 border border-white/10 p-5">
                  <p className="text-sm text-white/50">Security</p>
                  <p className="mt-1 font-black text-emerald-300">Protected</p>
                </div>

                <div className="rounded-3xl bg-white/10 border border-white/10 p-5">
                  <p className="text-sm text-white/50">Community</p>
                  <p className="mt-1 font-black text-cyan-300">Connected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;