import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getAdminAnalytics } from "../../api/analytics";

const COLORS = ["#06b6d4", "#4f46e5", "#f43f5e", "#22c55e"];

const AnalyticsDashboard = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminAnalytics"],
    queryFn: getAdminAnalytics,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-center">
        <h2 className="text-2xl font-bold">Failed to load analytics</h2>
      </div>
    );
  }

  const { overview, clubStatus, userRoles, paymentTypes } = data;

  const stats = [
    {
      title: "Total Users",
      value: overview.totalUsers,
      subtitle: "Registered users",
    },
    {
      title: "Total Clubs",
      value: overview.totalClubs,
      subtitle: "All club records",
    },
    {
      title: "Total Events",
      value: overview.totalEvents,
      subtitle: "Created events",
    },
    {
      title: "Total Payments",
      value: overview.totalPayments,
      subtitle: "Payment records",
    },
    {
      title: "Total Revenue",
      value: `$${overview.totalRevenue}`,
      subtitle: "Membership + events",
    },
  ];

  return (
    <section className="w-full min-h-screen">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-7 md:p-9 text-white shadow-xl overflow-hidden relative">
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10"></div>
          <div className="absolute right-24 -bottom-20 w-60 h-60 rounded-full bg-white/10"></div>

          <div className="relative z-10">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
              Admin Analytics
            </p>

            <h1 className="text-3xl md:text-5xl font-extrabold">
              Platform Insights
            </h1>

            <p className="mt-3 text-white/90 max-w-2xl">
              Track ClubSphere performance using live data from users, clubs,
              payments, and events.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-base-300 shadow-md p-6 hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm text-slate-500 font-medium">
                {item.title}
              </p>
              <h3 className="text-3xl font-extrabold text-slate-800 mt-3">
                {item.value}
              </h3>
              <p className="text-xs text-slate-400 mt-2">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Club Status */}
          <div className="bg-white rounded-3xl border border-base-300 shadow-md p-6">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
              Club Status Overview
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Approved, pending, and rejected club distribution.
            </p>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clubStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {clubStatus.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Roles */}
          <div className="bg-white rounded-3xl border border-base-300 shadow-md p-6">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
              User Role Distribution
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Members, club managers, and admins in the system.
            </p>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoles}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    label
                  >
                    {userRoles.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Type */}
          <div className="bg-white rounded-3xl border border-base-300 shadow-md p-6">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
              Payment Type Breakdown
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Membership payments vs event payments.
            </p>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentTypes}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={110}
                    label
                  >
                    {paymentTypes.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Summary */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-md p-6 text-white">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/60 mb-2">
              Revenue Summary
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold">
              ${overview.totalRevenue}
            </h2>

            <p className="text-white/70 mt-4 leading-7">
              This total revenue is calculated from both paid club memberships
              and paid event registrations.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {paymentTypes.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white/10 border border-white/10 p-4"
                >
                  <p className="text-sm text-white/60">{item.name}</p>
                  <h3 className="text-3xl font-bold">{item.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;