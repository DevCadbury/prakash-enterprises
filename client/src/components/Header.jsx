import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import {
  Menu,
  X,
  Building2,
  Phone,
  ArrowRight,
  Shield,
  Star,
  TrendingUp,
  MessageCircle,
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Services",
      href: "#services",
      icon: Building2,
      description: "Financial solutions",
      color: "from-purple-500 to-pink-500",
      submenu: [
        { name: "Loans", href: "#loans", icon: TrendingUp },
        { name: "Insurance", href: "#insurance", icon: Shield },
        { name: "Investment", href: "#investment", icon: Star },
      ],
    },
    {
      name: "Contact",
      href: "#contact",
      icon: Phone,
      description: "Get in touch",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Admin",
      href: "/admin",
      icon: Shield,
      description: "Admin dashboard",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-3xl shadow-3xl border-b border-gray-200/50 dark:border-gray-800/50"
          : "bg-white/90 dark:bg-black/90 backdrop-blur-3xl"
      }`}
    >
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.8, 0.3],
            y: [0, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-8 right-8 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.4, 0.9, 0.4],
            x: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-12 left-1/2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full md:hidden"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.3, 0.7, 0.3],
            y: [0, -10, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Premium Logo */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
              whileHover={{
                rotate: 360,
                scale: 1.1,
              }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{
                  x: [-100, 100],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <img
                src="/icon1.png"
                alt="Prakash Enterprises Logo"
                className="w-8 h-8 md:w-9 md:h-9 object-contain"
              />
            </motion.div>
            <div>
              <motion.h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white transition-colors duration-500">
                PRAKASH ENTERPRISES
              </motion.h1>
              <motion.p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors duration-500">
                Your Trusted Partner for Loans & Insurance
              </motion.p>
            </div>
          </motion.div>

          {/* Premium Desktop Navigation */}
          <motion.nav
            variants={itemVariants}
            className="hidden lg:flex items-center gap-8"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                whileHover={{ y: -2 }}
              >
                <motion.a
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </motion.div>
                  <span>{item.name}</span>
                  {item.submenu && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </motion.a>

                {/* Premium Dropdown Menu */}
                {item.submenu && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-3xl rounded-3xl shadow-3xl border border-gray-800/50 p-4"
                  >
                    <div className="space-y-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <motion.a
                          key={subIndex}
                          href={subItem.href}
                          className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 transition-all duration-300 group"
                          whileHover={{ x: 5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl flex items-center justify-center group-hover:from-gray-600 group-hover:to-gray-500 transition-all duration-300"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <subItem.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          </motion.div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {subItem.name}
                          </span>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.nav>

          {/* Premium Desktop Actions */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex items-center gap-6"
          >
            {/* Premium Contact Info */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: [0, 5] }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-3 text-sm font-bold group"
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Phone className="w-5 h-5 text-white" />
              </motion.div>
              <div className="hidden xl:block">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Call Us
                </div>
                <button
                  onClick={() => window.open("tel:+91-7383948447", "_self")}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  +91-7383948447
                </button>
              </div>
            </motion.div>

            {/* Premium Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-50"
              style={{ position: "relative", zIndex: 9999 }}
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>

          {/* Premium Mobile Actions */}
          <motion.div
            variants={itemVariants}
            className="lg:hidden flex items-center gap-3"
          >
            {/* Mobile Theme Toggle - Now Visible */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-50"
              style={{ position: "relative", zIndex: 9999 }}
            >
              <ThemeToggle />
            </motion.div>

            {/* Premium Mobile Menu Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: [0, 5] }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-2xl bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 mobile-touch mobile-glow mobile-btn-premium relative z-20 mobile-transition-premium mobile-ripple mobile-focus-ring-premium"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-6 h-6 text-gray-900 dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Premium Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="lg:hidden"
            >
              <motion.div
                className="py-8 space-y-6 bg-white/95 dark:bg-black/95 backdrop-blur-3xl rounded-3xl shadow-3xl border-t border-gray-200/30 dark:border-gray-800/30 mt-4 mobile-glow mobile-premium-menu mobile-shadow-ultra mobile-glass-ultra mobile-particle-bg"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {/* Premium Mobile Navigation */}
                <div className="space-y-3 px-6 mobile-spacing-premium">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      initial={{ opacity: 0, x: -20, rotateY: -90 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-6 py-5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-900 dark:hover:to-gray-800 rounded-2xl transition-all duration-300 group flex items-center gap-4 relative overflow-hidden mobile-touch mobile-premium-item mobile-hover-premium mobile-magnetic mobile-ripple"
                      whileHover={{
                        x: 10,
                        scale: 1.02,
                        rotateY: [0, 5],
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mobile-icon-premium`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1 mobile-text-premium">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mobile-subtitle-premium">
                          {item.description}
                        </div>
                      </div>
                      <motion.div
                        className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl flex items-center justify-center mobile-icon-premium"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    </motion.a>
                  ))}
                </div>

                {/* Premium Mobile Contact Section */}
                <motion.div
                  className="px-6 pt-6 border-t border-gray-300 dark:border-gray-700 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {/* Contact Info */}
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl mobile-contact-premium mobile-glass-ultra mobile-neon-blue">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg mobile-icon-premium"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Phone className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mobile-subtitle-premium">
                        Call Us
                      </div>
                      <button
                        onClick={() =>
                          window.open("tel:+91-7383948447", "_self")
                        }
                        className="text-lg font-bold text-gray-800 dark:text-gray-200 mobile-text-premium hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        +91-7383948447
                      </button>
                    </div>
                  </div>

                  {/* Email Contact */}
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl mobile-contact-premium mobile-glass-ultra mobile-neon-blue">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mobile-icon-premium"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <MessageCircle className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mobile-subtitle-premium">
                        Email Us
                      </div>
                      <button
                        onClick={() =>
                          window.open(
                            "mailto:prakashenterprise051@gmail.com",
                            "_self"
                          )
                        }
                        className="text-lg font-bold text-gray-800 dark:text-gray-200 mobile-text-premium hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        prakashenterprise051@gmail.com
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
