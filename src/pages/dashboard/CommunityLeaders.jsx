import { useQuery } from "@tanstack/react-query";
import { getCommunityLeaders } from "../../api/users";
import { FaUserShield, FaUsers, FaEnvelope } from "react-icons/fa";

const CommunityLeaders = () => {
  const {
    data: leaders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["communityLeaders"],
    queryFn: getCommunityLeaders,
  });

  const admins = leaders.filter((user) => user.role === "admin");
  const managers = leaders.filter((user) => user.role === "clubManager");

  const LeaderCard = ({ leader }) => {
  const phone = leader.phone || "8801313173095"; // fallback if no phone in DB

  return (
    <div className="group relative rounded-[2rem] bg-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden p-6 border border-slate-100 hover:-translate-y-2">
      
      {/* Glow bg */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-cyan-300/20 rounded-full blur-3xl group-hover:bg-violet-300/30 transition"></div>
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <img
            src={leader.photoURL || "https://i.ibb.co/2kR5zqM/user.png"}
            alt={leader.name || "User"}
            className="w-20 h-20 rounded-3xl object-cover ring-4 ring-cyan-100"
          />

          <div>
            <h3 className="text-xl font-extrabold text-slate-800">
              {leader.name || leader.displayName || "No Name"}
            </h3>

            <p className="text-sm text-slate-500 break-all">
              {leader.email}
            </p>

            <span
              className={`inline-block mt-2 px-4 py-1 rounded-full text-xs font-black text-white ${
                leader.role === "admin"
                  ? "bg-gradient-to-r from-rose-500 to-orange-500"
                  : "bg-gradient-to-r from-cyan-500 to-violet-500"
              }`}
            >
              {leader.role === "admin" ? "Admin" : "Club Manager"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 p-4">
          <p className="text-xs text-slate-400 font-semibold">Role Since</p>
          <p className="font-black text-slate-800 mt-1">
            {leader.updatedAt
              ? new Date(leader.updatedAt).toLocaleDateString()
              : leader.createdAt
              ? new Date(leader.createdAt).toLocaleDateString()
              : "Not available"}
          </p>
        </div>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${phone}?text=Hello ${leader.name}, I am contacting from ClubSphere`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-black text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 hover:scale-105 transition-all"
        >
          📱 Message on WhatsApp
        </a>
      </div>
    </div>
  );
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
      <div className="min-h-[60vh] flex justify-center items-center text-center">
        <h2 className="text-2xl font-bold">Failed to load leaders</h2>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen">
      <div className="w-full">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-7 md:p-9 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10"></div>
          <div className="absolute right-24 -bottom-20 w-60 h-60 rounded-full bg-white/10"></div>

          <div className="relative z-10">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
              Member Dashboard
            </p>

            <h1 className="text-3xl md:text-5xl font-extrabold">
              Community Leaders
            </h1>

            <p className="mt-3 text-white/90 max-w-2xl">
              Meet the admins and club managers who help manage ClubSphere clubs,
              events, and community activities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-3xl bg-white border border-base-300 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <FaUserShield className="text-3xl text-error" />
              <h2 className="text-2xl font-extrabold text-slate-800">
                Admins
              </h2>
            </div>
            <p className="text-slate-500">
              Admins control platform approval, users, analytics, and system
              management.
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-base-300 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <FaUsers className="text-3xl text-primary" />
              <h2 className="text-2xl font-extrabold text-slate-800">
                Club Managers
              </h2>
            </div>
            <p className="text-slate-500">
              Club managers create clubs, manage club events, and support member
              engagement.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-5">
            Platform Admins
          </h2>

          {admins.length === 0 ? (
            <div className="rounded-3xl bg-white border border-base-300 p-8 text-center">
              <p className="text-slate-500">No admins found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {admins.map((leader) => (
                <LeaderCard key={leader._id} leader={leader} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-5">
            Club Managers
          </h2>

          {managers.length === 0 ? (
            <div className="rounded-3xl bg-white border border-base-300 p-8 text-center">
              <p className="text-slate-500">No club managers found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {managers.map((leader) => (
                <LeaderCard key={leader._id} leader={leader} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunityLeaders;