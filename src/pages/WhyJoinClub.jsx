import { motion } from "framer-motion";
import {
  FaUsers,
  FaLightbulb,
  FaCalendarCheck,
  FaHeart,
} from "react-icons/fa";

const WhyJoinClub = () => {
  const benefits = [
    {
      title: "Build Real Connections",
      description:
        "Meet like-minded people, grow friendships, and become part of a supportive local community.",
      icon: <FaUsers size={28} />,
      gradient: "from-cyan-500 to-blue-500",
      bg: "from-cyan-50 to-blue-50",
    },
    {
      title: "Learn New Skills",
      description:
        "Discover fresh ideas, improve your talents, and explore exciting interests through shared experiences.",
      icon: <FaLightbulb size={28} />,
      gradient: "from-amber-500 to-orange-500",
      bg: "from-amber-50 to-orange-50",
    },
    {
      title: "Join Exciting Events",
      description:
        "Be part of engaging meetups, workshops, competitions, and memorable club activities throughout the year.",
      icon: <FaCalendarCheck size={28} />,
      gradient: "from-emerald-500 to-green-500",
      bg: "from-emerald-50 to-green-50",
    },
    {
      title: "Feel Inspired & Motivated",
      description:
        "Stay active, inspired, and energized by surrounding yourself with passionate and creative people.",
      icon: <FaHeart size={28} />,
      gradient: "from-pink-500 to-rose-500",
      bg: "from-pink-50 to-rose-50",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      {/* soft background glow */}
      <div className="absolute top-10 left-10 w-44 h-44 bg-cyan-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-pink-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: -35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-4">
            Join With Purpose
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            Why Join a Club on
            <span className="text-primary"> ClubSphere</span>?
          </h2>

          <p className="mt-5 text-base md:text-lg text-slate-600 leading-8">
            Clubs are more than just groups — they are spaces to connect, grow,
            share passions, and create memorable experiences with people who
            truly inspire you.
          </p>
        </motion.div>

        {/* content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* left big feature panel */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white shadow-2xl min-h-[520px] p-8 md:p-10 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium mb-5">
                Community • Growth • Experience
              </span>

              <h3 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5">
                Your next opportunity could begin with one meaningful club.
              </h3>

              <p className="text-white/80 leading-8 text-base md:text-lg">
                ClubSphere helps you find communities where your ideas, skills,
                and passions matter. Whether you love creativity, technology,
                sports, or literature, there’s always a place where you belong.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 mt-10">
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5">
                <h4 className="text-2xl font-bold text-cyan-300">50+</h4>
                <p className="text-sm text-white/75 mt-1">Growing Communities</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5">
                <h4 className="text-2xl font-bold text-pink-300">100+</h4>
                <p className="text-sm text-white/75 mt-1">Active Members</p>
              </div>
            </div>
          </motion.div>

          {/* right cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className={`group rounded-3xl bg-gradient-to-br ${item.bg} border border-white/70 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 relative overflow-hidden`}
              >
                {/* hover glow */}
                <div
                  className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${item.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition duration-500`}
                ></div>

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition duration-500 mb-5`}
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-7 text-sm md:text-base">
                  {item.description}
                </p>

                <div className="w-12 h-1 rounded-full bg-slate-300 mt-6 group-hover:w-20 group-hover:bg-primary transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinClub;