import {
  FaCamera,
  FaLaptopCode,
  FaFutbol,
  FaBook,
  FaArrowRight,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Categories = () => {
  const categories = [
    {
      name: "Photography",
      icon: <FaCamera size={32} />,
      desc: "Capture moments, stories, and creativity through the lens.",
      gradient: "from-pink-500 to-orange-400",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },
    {
      name: "Tech",
      icon: <FaLaptopCode size={32} />,
      desc: "Explore coding, innovation, AI, and digital creativity.",
      gradient: "from-cyan-500 to-blue-600",
      bg: "bg-cyan-50",
      text: "text-cyan-600",
    },
    {
      name: "Sports",
      icon: <FaFutbol size={32} />,
      desc: "Stay active, competitive, and connected through sports.",
      gradient: "from-emerald-500 to-lime-500",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      name: "Book Club",
      icon: <FaBook size={32} />,
      desc: "Dive into stories, ideas, and thoughtful discussions.",
      gradient: "from-amber-500 to-red-500",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#f7f0ff]">
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-300/25 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-300/25 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-52 h-52 bg-yellow-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-cyan-600 text-sm font-bold shadow-lg border border-cyan-100">
              <FaUsers />
              Explore Interests
            </span>

            <h2 className="mt-6 text-4xl md:text-6xl font-black leading-tight text-slate-900">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
                Favorite Club
              </span>
            </h2>

            <p className="mt-6 text-slate-600 text-lg leading-8">
              Find the community that matches your passion. Join clubs, attend
              events, and connect with people who love the same things as you.
            </p>

            <div className="mt-8 flex gap-3">
              <span className="w-16 h-2 rounded-full bg-cyan-400"></span>
              <span className="w-8 h-2 rounded-full bg-blue-400"></span>
              <span className="w-16 h-2 rounded-full bg-fuchsia-400"></span>
            </div>
          </motion.div>

          {/* Right Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                whileHover={{ y: -10 }}
                className={`group relative overflow-hidden rounded-[2rem] ${category.bg} p-7 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white`}
              >
                <div
                  className={`absolute -right-16 -top-16 w-44 h-44 rounded-full bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-35 blur-2xl transition`}
                ></div>

                <div className="relative z-10 flex items-start gap-5">
                  <div
                    className={`shrink-0 w-20 h-20 rounded-3xl bg-gradient-to-br ${category.gradient} text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    {category.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-slate-900">
                      {category.name}
                    </h3>

                    <p className="mt-3 text-slate-600 leading-7">
                      {category.desc}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-8 flex items-center justify-between">
                  <button
                    className={`inline-flex items-center gap-2 font-bold ${category.text} group-hover:gap-4 transition-all`}
                  >
                    Explore Category
                    <FaArrowRight className="text-sm" />
                  </button>

                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${category.gradient} text-white flex items-center justify-center text-lg font-black shadow-lg`}
                  >
                    0{index + 1}
                  </div>
                </div>

                <div
                  className={`absolute left-0 bottom-0 h-2 w-full bg-gradient-to-r ${category.gradient}`}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;