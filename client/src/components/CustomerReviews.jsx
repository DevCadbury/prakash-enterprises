import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  User,
  Award,
  Heart,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Business Owner",
      rating: 5,
      content:
        "PRAKASH ENTERPRISES helped me secure a business loan within 48 hours. Their team was professional, transparent, and made the entire process seamless. Highly recommended!",
      avatar: "RK",
      category: "Loan Services",
      verified: true,
      date: "2 weeks ago",
      location: "Mumbai, Maharashtra",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Home Buyer",
      rating: 5,
      content:
        "I was struggling to get home insurance coverage. The team at PRAKASH ENTERPRISES found me the perfect policy with comprehensive coverage at an affordable rate.",
      avatar: "PS",
      category: "Insurance",
      verified: true,
      date: "1 month ago",
      location: "Delhi, NCR",
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Startup Founder",
      rating: 5,
      content:
        "Outstanding service! They helped me understand complex financial products and guided me through the entire investment process. Truly customer-focused approach.",
      avatar: "AP",
      category: "Investment",
      verified: true,
      date: "3 weeks ago",
      location: "Bangalore, Karnataka",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Property Investor",
      rating: 5,
      content:
        "The team's expertise in real estate financing is unmatched. They secured me a competitive mortgage rate and handled all the paperwork efficiently.",
      avatar: "SR",
      category: "Loan Services",
      verified: true,
      date: "1 week ago",
      location: "Hyderabad, Telangana",
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Small Business Owner",
      rating: 5,
      content:
        "Professional, reliable, and trustworthy. They helped me expand my business with a working capital loan. The process was smooth from start to finish.",
      avatar: "VS",
      category: "Business Loan",
      verified: true,
      date: "2 months ago",
      location: "Pune, Maharashtra",
    },
    {
      id: 6,
      name: "Anjali Desai",
      role: "Family Provider",
      rating: 5,
      content:
        "Got comprehensive life insurance coverage for my family. The team explained every detail clearly and helped me choose the right policy for my needs.",
      avatar: "AD",
      category: "Life Insurance",
      verified: true,
      date: "1 month ago",
      location: "Chennai, Tamil Nadu",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Heart },
    { label: "Success Rate", value: "98.5%", icon: Award },
    { label: "Years Experience", value: "15+", icon: Star },
    { label: "Customer Rating", value: "4.9/5", icon: ThumbsUp },
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/50 mb-6 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700 font-semibold">
              Customer Reviews
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover why thousands of customers trust PRAKASH ENTERPRISES for
            their financial needs
          </motion.p>
        </motion.div>

        {/* Glassmorphic Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="text-3xl font-black text-gray-800 dark:text-white mb-2 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Glassmorphic Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              className="group relative"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glassmorphic Review Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl relative overflow-hidden hover:border-blue-300/50 dark:hover:border-blue-400/50 transition-all duration-500">
                {/* Glassmorphic Edge Lighting Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/3 via-purple-400/3 to-pink-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.2), transparent)",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Corner Glow Effects */}
                <motion.div
                  className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-40 blur-sm"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <motion.div
                  className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-40 blur-sm"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-40 blur-sm"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-40 blur-sm"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.5,
                  }}
                />
                {/* Hover Effect Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Quote Icon */}
                <motion.div
                  className="absolute top-6 right-6 w-12 h-12 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Quote className="w-6 h-6 text-blue-500" />
                </motion.div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </motion.div>
                  ))}
                </div>

                {/* Review Content */}
                <motion.p
                  className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  "{review.content}"
                </motion.p>

                {/* Customer Info */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {review.avatar}
                    </motion.div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800">
                          {review.name}
                        </h4>
                        {review.verified && (
                          <motion.div
                            className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                            whileHover={{ scale: 1.2 }}
                          >
                            <Award className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{review.role}</p>
                      <p className="text-gray-500 text-xs">{review.location}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-sm">
                      <MessageCircle className="w-3 h-3 text-blue-500" />
                      <span className="text-blue-600 text-xs font-medium">
                        {review.category}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">{review.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Glassmorphic CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex items-center gap-4 p-6 bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600">
                Join thousands of satisfied customers
              </p>
            </div>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
              <MessageCircle className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
