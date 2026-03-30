import { FaCamera, FaLaptopCode, FaFutbol, FaBook } from "react-icons/fa";
import { motion } from "framer-motion";

const Categories = () => {
  const categories = [
    {
      name: "Photography",
      icon: <FaCamera size={32} />,
    },
    {
      name: "Tech",
      icon: <FaLaptopCode size={32} />,
    },
    {
      name: "Sports",
      icon: <FaFutbol size={32} />,
    },
    {
      name: "Book Club",
      icon: <FaBook size={32} />,
    },
  ];

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Popular Categories
        </h2>
        <p className="text-gray-500 mt-3">
          Explore clubs based on your interests
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="group backdrop-blur-lg bg-white/60 border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
          >
            
            {/* Icon */}
            <div className="text-primary mb-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              {category.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold group-hover:text-primary transition">
              {category.name}
            </h3>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;