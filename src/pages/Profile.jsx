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
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center">
        <h2 className="text-2xl font-bold">Failed to load profile</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="rounded-[2rem] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-white/10"></div>
          <div className="absolute right-20 -bottom-24 w-72 h-72 rounded-full bg-white/10"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="avatar">
              <div className="w-28 h-28 rounded-3xl ring ring-white/60 ring-offset-4 ring-offset-transparent overflow-hidden">
                <img
                  src={user?.photoURL || "https://i.ibb.co/2kR5zqM/user.png"}
                  alt={user?.displayName || "User"}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
                Profile Center
              </p>

              <h1 className="text-3xl md:text-5xl font-extrabold">
                {user?.displayName || "User Profile"}
              </h1>

              <p className="mt-2 text-white/90">{user?.email}</p>

              <div
                className={`inline-flex mt-4 px-5 py-2 rounded-full bg-gradient-to-r ${
                  roleBadgeClass[role] || roleBadgeClass.member
                } shadow-lg font-semibold capitalize`}
              >
                {role === "clubManager" ? "Club Manager" : role}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {statCards.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-base-300 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm text-slate-500 font-medium">
                {item.title}
              </p>
              <h3 className="text-4xl font-extrabold text-slate-800 mt-3">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Account Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white border border-base-300 rounded-3xl p-6 md:p-8 shadow-md">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-5">
              Account Information
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="font-bold text-slate-800">
                  {user?.displayName || "Not Provided"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Email Address</p>
                <p className="font-bold text-slate-800 break-all">
                  {user?.email}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Dashboard Role</p>
                <p className="font-bold text-slate-800 capitalize">
                  {role === "clubManager" ? "Club Manager" : role}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-base-300 rounded-3xl p-6 md:p-8 shadow-md">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-5">
              Activity Summary
            </h2>

            <p className="text-slate-500 leading-7">
              This profile gives a quick overview of your ClubSphere activity.
              Your role-based stats help you track your contribution, joined
              clubs, registered events, payments, or platform management
              activity.
            </p>

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 p-5 text-white">
              <p className="font-semibold">
                Current Access Level:{" "}
                {role === "clubManager" ? "Club Manager" : role}
              </p>
              <p className="text-sm text-white/80 mt-1">
                Your dashboard options are customized based on this role.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;