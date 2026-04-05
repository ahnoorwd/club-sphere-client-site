import { FaCamera, FaLaptopCode, FaFutbol, FaBook } from "react-icons/fa";
import { motion } from "framer-motion";

const Categories = () => {
  const categories = [
    {
      name: "Photography",
      icon: <FaCamera size={34} />,
      desc: "Capture moments, stories, and creativity through the lens.",
      gradient: "from-pink-500 to-rose-500",
      glow: "group-hover:shadow-pink-500/30",
    },
    {
      name: "Tech",
      icon: <FaLaptopCode size={34} />,
      desc: "Explore coding, innovation, AI, and digital creativity.",
      gradient: "from-cyan-500 to-blue-500",
      glow: "group-hover:shadow-cyan-500/30",
    },
    {
      name: "Sports",
      icon: <FaFutbol size={34} />,
      desc: "Stay active, competitive, and connected through sports.",
      gradient: "from-emerald-500 to-green-500",
      glow: "group-hover:shadow-emerald-500/30",
    },
    {
      name: "Book Club",
      icon: <FaBook size={34} />,
      desc: "Dive into stories, ideas, and thoughtful discussions.",
      gradient: "from-amber-500 to-orange-500",
      glow: "group-hover:shadow-amber-500/30",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* background blur circles */}
      <div className="absolute top-16 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-4">
            Explore Interests
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            Popular Club Categories
          </h2>

          <p className="text-slate-500 mt-4 text-base md:text-lg leading-8">
            Discover communities built around your passion — from creativity and
            technology to sports and reading.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -10 }}
              className={`group relative rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl p-7 shadow-lg hover:shadow-2xl ${category.glow} transition-all duration-500 overflow-hidden`}
            >
              {/* top glow overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${category.gradient} blur-3xl opacity-20`}></div>
              </div>

              {/* shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-18 h-18 mb-6 mx-auto rounded-2xl bg-gradient-to-br ${category.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition duration-500`}
                >
                  {category.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 text-center mb-3 group-hover:text-primary transition duration-300">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-7 text-center">
                  {category.desc}
                </p>

                {/* bottom mini line */}
                <div className="w-12 h-1 rounded-full bg-primary/20 mx-auto mt-6 group-hover:w-20 group-hover:bg-primary transition-all duration-400"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;