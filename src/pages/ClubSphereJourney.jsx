import { Link } from "react-router";
import {
  FaUserPlus,
  FaSearch,
  FaUsers,
  FaCalendarCheck,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

const ClubSphereJourney = () => {
  const steps = [
    {
      title: "Create Account",
      desc: "Start your ClubSphere journey with a simple member profile.",
      icon: <FaUserPlus />,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Explore Clubs",
      desc: "Find clubs based on your interests, location, and passion.",
      icon: <FaSearch />,
      gradient: "from-blue-500 to-violet-600",
    },
    {
      title: "Join Community",
      desc: "Become a member and connect with people like you.",
      icon: <FaUsers />,
      gradient: "from-violet-500 to-fuchsia-600",
    },
    {
      title: "Attend Events",
      desc: "Join workshops, meetups, activities, and club events.",
      icon: <FaCalendarCheck />,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Grow Network",
      desc: "Build friendships, skills, confidence, and real connections.",
      icon: <FaChartLine />,
      gradient: "from-orange-500 to-rose-600",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.35),transparent_35%)]"></div>

      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:56px_56px]"></div>

      <div className="absolute -top-28 -left-28 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-28 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-cyan-300 text-sm font-black shadow-xl">
            ✦ ClubSphere Journey
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-black text-white leading-tight">
            From First Click to{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
              Real Connection
            </span>
          </h2>

          <p className="mt-6 text-white/65 text-base md:text-lg leading-8">
            A simple premium journey that helps members discover clubs, join
            communities, attend events, and grow their network.
          </p>
        </div>

        <div className="relative">
          <div className="hidden xl:block absolute left-0 right-0 top-[5.4rem] h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 via-violet-500 to-rose-500"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative rounded-[2rem] p-[1px] bg-gradient-to-br from-white/20 to-white/5 hover:from-cyan-400 hover:to-violet-500 transition-all duration-500"
              >
                <div className="relative h-full rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/10 p-7 shadow-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500">
                  <div
                    className={`absolute -top-20 -right-20 w-44 h-44 rounded-full bg-gradient-to-br ${step.gradient} opacity-25 blur-3xl group-hover:opacity-50 transition-all`}
                  ></div>

                  <div className="relative z-10">
                    <div className="mb-8 flex items-center justify-between">
                      <div
                        className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center text-3xl shadow-xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}
                      >
                        {step.icon}
                      </div>

                      <span className="text-5xl font-black text-white/10">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm text-white/60 leading-7">
                      {step.desc}
                    </p>

                    <div
                      className={`mt-8 h-1.5 w-16 rounded-full bg-gradient-to-r ${step.gradient} group-hover:w-28 transition-all duration-500`}
                    ></div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden xl:flex absolute -right-5 top-[4.8rem] z-20 w-10 h-10 rounded-full bg-white text-slate-900 items-center justify-center shadow-xl">
                      <FaArrowRight />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="btn rounded-2xl border-none px-10 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-black shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
          >
            Start Your Journey
            <FaArrowRight />
          </Link>

          <Link
            to="/clubs"
            className="btn rounded-2xl px-10 bg-white/10 border border-white/15 text-white font-black backdrop-blur-xl hover:bg-white hover:text-slate-900 transition-all"
          >
            Explore Clubs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClubSphereJourney;