import { useEffect, useState } from "react";
import {
  FaUsers,
  FaCalendarAlt,
  FaLayerGroup,
  FaMoneyBillWave,
} from "react-icons/fa";
import { motion } from "framer-motion";

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 20);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
};

const PlatformStats = () => {
  const stats = [
    {
      title: "Active Users",
      value: 1200,
      icon: <FaUsers />,
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Total Events",
      value: 350,
      icon: <FaCalendarAlt />,
      gradient: "from-fuchsia-400 via-violet-500 to-indigo-600",
      bg: "bg-violet-500/10",
    },
    {
      title: "Clubs Created",
      value: 85,
      icon: <FaLayerGroup />,
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Successful Payments",
      value: 950,
      icon: <FaMoneyBillWave />,
      gradient: "from-amber-400 via-orange-500 to-rose-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.35),transparent_35%)]"></div>
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:52px_52px]"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl text-sm font-bold shadow-xl">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Platform Growth
            </span>

            <h2 className="mt-6 text-4xl md:text-6xl font-black leading-tight">
              Our Impact in{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                Powerful Numbers
              </span>
            </h2>

            <p className="mt-6 text-white/70 text-lg leading-8 max-w-xl">
              ClubSphere is growing every day with active members, successful
              events, trusted payments, and communities that bring people
              together.
            </p>

            <div className="mt-10 relative max-w-lg rounded-[2rem] overflow-hidden border border-white/15 shadow-2xl shadow-cyan-500/20">
              <img
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80"
                alt="ClubSphere community"
                className="w-full h-[340px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 p-5">
                <p className="text-sm text-white/70">Community Power</p>
                <h3 className="text-2xl font-black mt-1">
                  People. Clubs. Events. Growth.
                </h3>
              </div>

              <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-sm font-black shadow-lg">
                Live Growth
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className={`group relative rounded-[2rem] p-[1px] bg-gradient-to-br ${stat.gradient} shadow-2xl`}
              >
                <div className="relative min-h-[245px] rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/10 p-7 overflow-hidden">
                  <div
                    className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${stat.gradient} opacity-30 blur-3xl group-hover:opacity-60 transition-all duration-500`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white flex items-center justify-center text-2xl shadow-xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}
                    >
                      {stat.icon}
                    </div>

                    <h3 className="mt-8 text-5xl font-black tracking-tight">
                      <AnimatedNumber value={stat.value} />
                      <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                        +
                      </span>
                    </h3>

                    <p className="mt-3 text-white/70 font-semibold">
                      {stat.title}
                    </p>

                    <div className="mt-6 flex items-center gap-2">
                      <div
                        className={`h-2 w-20 rounded-full bg-gradient-to-r ${stat.gradient}`}
                      ></div>
                      <div className="h-2 w-2 rounded-full bg-white/50"></div>
                      <div className="h-2 w-2 rounded-full bg-white/30"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-5 text-7xl font-black text-white/5">
                    0{index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;