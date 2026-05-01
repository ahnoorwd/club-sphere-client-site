import { Link } from "react-router";
import {
  FaSearch,
  FaUsers,
  FaCalendarCheck,
  FaCreditCard,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Explore Clubs",
      desc: "Browse different clubs by category, interest, location, and community type.",
      icon: <FaSearch />,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      number: "02",
      title: "Join Your Favorite Club",
      desc: "Choose the club that matches your passion and become part of an active community.",
      icon: <FaUsers />,
      gradient: "from-violet-500 to-fuchsia-600",
    },
    {
      number: "03",
      title: "Attend Events",
      desc: "Discover upcoming events, workshops, meetups, and activities hosted by clubs.",
      icon: <FaCalendarCheck />,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      number: "04",
      title: "Pay Securely",
      desc: "For paid clubs or events, complete your payment smoothly and safely.",
      icon: <FaCreditCard />,
      gradient: "from-orange-500 to-rose-600",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_35%,#f5f3ff_70%,#fff1f2_100%)] py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:54px_54px]"></div>

      <div className="absolute -top-28 -left-28 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-violet-400/25 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300/25 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-24">
          <div>
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-lg text-sm font-black text-cyan-600">
              ✦ ClubSphere Guide
            </span>

            <h1 className="mt-7 text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              How{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                ClubSphere
              </span>{" "}
              Works
            </h1>

            <p className="mt-6 text-base md:text-lg text-slate-600 leading-8 max-w-xl">
              ClubSphere makes it simple to discover clubs, join communities,
              attend events, and connect with people who share your passion.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {[
                "Find clubs by interest",
                "Join active communities",
                "Attend upcoming events",
                "Manage your dashboard",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white p-4 shadow-md"
                >
                  <FaCheckCircle className="text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/clubs"
                className="btn border-none rounded-2xl px-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-black shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
              >
                Explore Clubs
                <FaArrowRight />
              </Link>

              <Link
                to="/events"
                className="btn rounded-2xl px-8 bg-white/80 border border-white text-slate-800 font-black shadow-lg hover:bg-white hover:scale-105 transition-all"
              >
                View Events
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-cyan-500/20 border border-white bg-white/50 backdrop-blur-xl p-3">
              <img
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80"
                alt="ClubSphere community"
                className="h-[520px] w-full object-cover rounded-[2rem]"
              />

              <div className="absolute inset-3 rounded-[2rem] bg-gradient-to-t from-black/75 via-black/15 to-transparent"></div>

              <div className="absolute bottom-10 left-10 right-10 rounded-[2rem] bg-white/15 backdrop-blur-xl border border-white/20 p-6 text-white">
                <p className="text-sm text-white/70 font-semibold">
                  Start your community journey
                </p>
                <h3 className="mt-2 text-3xl font-black">
                  Discover. Join. Connect.
                </h3>
              </div>
            </div>

            <div className="absolute -top-8 -left-6 hidden md:block rounded-3xl bg-white p-5 shadow-2xl">
              <p className="text-3xl font-black text-cyan-600">1200+</p>
              <p className="text-sm font-bold text-slate-500">Active Users</p>
            </div>

            <div className="absolute -bottom-8 -right-6 hidden md:block rounded-3xl bg-white p-5 shadow-2xl">
              <p className="text-3xl font-black text-violet-600">350+</p>
              <p className="text-sm font-bold text-slate-500">Events Hosted</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-14">
          <span className="inline-flex px-6 py-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-lg text-sm font-black text-violet-600">
            Simple Process
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-slate-900">
            Start in Four Easy Steps
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto leading-8">
            From discovering clubs to attending events, ClubSphere keeps your
            experience smooth, simple, and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-[2rem] bg-white/85 backdrop-blur-xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden p-7"
            >
              <div
                className={`absolute -top-20 -right-20 w-44 h-44 rounded-full bg-gradient-to-br ${step.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-all`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center text-2xl shadow-xl group-hover:rotate-6 group-hover:scale-110 transition-all`}
                  >
                    {step.icon}
                  </div>

                  <span className="text-5xl font-black text-slate-100 group-hover:text-slate-200 transition">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm text-slate-600 leading-7">
                  {step.desc}
                </p>

                <div
                  className={`mt-8 h-1.5 w-16 rounded-full bg-gradient-to-r ${step.gradient} group-hover:w-28 transition-all duration-500`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 rounded-[2.5rem] bg-slate-950 overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.35),transparent_35%)]"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 md:p-12 lg:p-16">
            <div>
              <span className="inline-flex px-5 py-2 rounded-2xl bg-white/10 border border-white/15 text-cyan-300 text-sm font-black">
                Ready to begin?
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-black text-white leading-tight">
                Find your people. Join your club. Build your network.
              </h2>

              <p className="mt-5 text-white/65 leading-8">
                ClubSphere helps members, club managers, and admins work
                together in one simple and powerful platform.
              </p>

              <Link
                to="/register"
                className="btn mt-8 rounded-2xl border-none px-9 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-black shadow-xl hover:scale-105 transition-all"
              >
                Get Started Now
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["Members", "Join clubs and events"],
                ["Managers", "Create and manage clubs"],
                ["Events", "Discover activities"],
                ["Payments", "Secure transactions"],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-5"
                >
                  <h3 className="text-xl font-black text-white">{title}</h3>
                  <p className="mt-2 text-sm text-white/60">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;