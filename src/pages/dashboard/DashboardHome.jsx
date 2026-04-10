import { use } from "react";
import { AuthContext } from "../../Authprovider/AuthProvider";
import useUserRole from "../../hooks/useUserRole";

const DashboardHome = () => {
  const { user } = use(AuthContext);
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white p-8 md:p-10 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Welcome to your Dashboard
          </h1>
          <p className="text-white/90 text-base md:text-lg">
            Hello, {user?.displayName || "User"} 👋
          </p>
          <p className="mt-2 text-white/80">
            Your current role is: <span className="font-bold capitalize">{role}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;