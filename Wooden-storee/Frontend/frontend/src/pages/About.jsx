import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
  const stack = ["React", "Node.js", "Express", "MongoDB", "JWT", "Multer", "Tailwind CSS"];

  // Stagger container for sequential animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const techStackVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.15,
      y: -5,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, duration: 0.6, type: "spring", stiffness: 100 },
    },
    hover: {
      rotate: 12,
      scale: 1.12,
      boxShadow: "0 20px 40px rgba(120, 53, 15, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  const socialButtonVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      scale: 1.12,
      y: -4,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  const developerCardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 0.7, ease: "easeOut" },
    },
    hover: {
      y: -8,
      boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-gradient-to-br from-stone-50 via-amber-50 to-stone-50 min-h-screen py-16 px-6 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl -z-10"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* TAG */}
        <motion.div
          variants={tagVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="inline-block"
        >
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-700 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 px-5 py-2 rounded-full mb-8 shadow-sm hover:shadow-md transition-shadow">
            ✨ About this project
          </span>
        </motion.div>

        {/* HEADING */}
        <motion.h1
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl font-bold leading-tight text-stone-900 mb-8"
          style={{ fontFamily: "Georgia, serif" }}
        >
          A full-stack furniture
          <br />
          <motion.em
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 not-italic font-bold"
          >
            e-commerce platform
          </motion.em>
        </motion.h1>

        {/* PARAGRAPHS */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-12">
          <motion.p
            variants={itemVariants}
            className="text-stone-600 text-lg leading-relaxed mb-4 font-light"
          >
            This project is a complete furniture shopping web application — users can browse curated products, add them to cart, and checkout. Admins can manage the full product catalogue with real-time updates.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-stone-600 text-lg leading-relaxed font-light"
          >
            Built with a clean REST API architecture and follows modern best practices for authentication, secure file uploads, and state management.
          </motion.p>
        </motion.div>

        {/* TECH STACK */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="border-t border-b border-amber-200 py-8 mb-12"
          style={{ transformOrigin: "left" }}
        >
          <motion.h3
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-xs font-bold tracking-widest uppercase text-amber-700 mb-6"
          >
            🛠️ Tech stack
          </motion.h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3"
          >
            {stack.map((tech) => (
              <motion.span
                key={tech}
                variants={techStackVariants}
                whileHover="hover"
                className="px-5 py-3 bg-white border border-amber-200 rounded-xl text-sm font-semibold text-amber-700 shadow-sm cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* DEVELOPER */}
        <motion.h3
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-xs font-bold tracking-widest uppercase text-amber-700 mb-6"
        >
          👨‍💻 Developer
        </motion.h3>

        <motion.div
          variants={developerCardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white rounded-2xl border border-amber-100 p-8 shadow-lg"
        >
          <div className="flex gap-6 items-start">
            {/* Avatar */}
            <motion.div
              variants={avatarVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg"
              style={{ fontFamily: "Georgia, serif" }}
            >
              RA
            </motion.div>

            <div className="flex-1">
              <motion.h2
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-2xl font-bold text-stone-900 mb-1"
              >
                Ritik Anand
              </motion.h2>

              <motion.p
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-sm font-semibold text-amber-600 mb-4"
              >
                Full Stack Developer · React · Node.js · MongoDB
              </motion.p>

              <motion.p
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-sm text-stone-600 leading-relaxed mb-6 font-light"
              >
                Passionate about building real-world scalable applications. This project demonstrates expertise across the full stack — from RESTful API design to responsive UI/UX implementation.
              </motion.p>

              {/* Social Links */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-3"
              >
                {[
                  {
                    href: "https://www.linkedin.com/in/ritik-anand-9ba026250/",
                    icon: <FaLinkedin className="text-lg" />,
                    label: "LinkedIn",
                    color: "from-blue-600 to-blue-500 hover:shadow-blue-200",
                  },
                  {
                    href: "https://github.com/Ritik137",
                    icon: <FaGithub className="text-lg" />,
                    label: "GitHub",
                    color: "from-stone-800 to-stone-700 hover:shadow-stone-300",
                  },
                  {
                    href: "https://www.instagram.com/_i_m__ritik_",
                    icon: <FaInstagram className="text-lg" />,
                    label: "Instagram",
                    color: "from-pink-600 to-rose-500 hover:shadow-pink-200",
                  },
                  {
                    href: "https://x.com/Born_to_ruleee",
                    icon: <FaTwitter className="text-lg" />,
                    label: "Twitter",
                    color: "from-sky-500 to-blue-500 hover:shadow-sky-200",
                  },
                ].map(({ href, icon, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    variants={socialButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${color} text-white rounded-lg text-sm font-semibold shadow-md transition-all no-underline`}
                  >
                    {icon}
                    <span>{label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}