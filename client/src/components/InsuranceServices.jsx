import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/textarea";
import Dialog from "./ui/Dialog";
import {
  Shield,
  Heart,
  Car,
  Bike,
  ArrowRight,
  CheckCircle,
  Zap,
  Award,
  X,
  FileText,
} from "lucide-react";

const InsuranceServices = () => {
  // State for quote modal
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    amount: "",
    message: "",
  });
  const [quoteType, setQuoteType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for dialog
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  // Handle quote modal
  const openQuoteModal = useCallback((type, service = "") => {
    setQuoteType(type);
    setQuoteData((prev) => ({ ...prev, service }));
    setShowQuoteModal(true);
  }, []);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? "https://prakash-enterprises.vercel.app/api/quote"
          : "http://localhost:5000/api/quote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...quoteData,
            type: quoteType,
          }),
        }
      );

      if (response.ok) {
        setDialog({
          isOpen: true,
          title: "Quote Request Submitted Successfully!",
          message:
            "Thank you! We'll get back to you soon with the best insurance options for your needs.",
          type: "success",
        });
        setShowQuoteModal(false);
        setQuoteData({
          name: "",
          email: "",
          phone: "",
          service: "",
          amount: "",
          message: "",
        });
      } else {
        setDialog({
          isOpen: true,
          title: "Submission Failed",
          message:
            "Something went wrong. Please try again or contact us directly.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      setDialog({
        isOpen: true,
        title: "Submission Failed",
        message:
          "Something went wrong. Please try again or contact us directly.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuoteData((prev) => ({ ...prev, [name]: value }));
  };

  const insurances = [
    {
      icon: Bike,
      title: "Two Wheeler Insurance",
      description:
        "Protect your ride with comprehensive two-wheeler insurance coverage at competitive rates.",
      features: [
        "Third-party coverage",
        "Own damage protection",
        "Personal accident",
        "24/7 support",
      ],
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      gradient: "from-red-500 to-pink-500",
      lightningColor: "from-red-400 to-pink-400",
      benefits: ["Starting ₹500/year", "Instant policy", "24/7 claims support"],
      stats: { premium: "₹500", coverage: "₹1L", time: "Instant" },
    },
    {
      icon: Car,
      title: "Four Wheeler Insurance",
      description:
        "Comprehensive vehicle cover with extensive benefits and hassle-free claims process.",
      features: [
        "Comprehensive coverage",
        "Zero depreciation",
        "Engine protection",
        "Roadside assistance",
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      gradient: "from-blue-500 to-cyan-500",
      lightningColor: "from-blue-400 to-cyan-400",
      benefits: [
        "Starting ₹2,000/year",
        "Zero depreciation",
        "24/7 assistance",
      ],
      stats: { premium: "₹2,000", coverage: "₹5L", time: "24 hours" },
    },
    {
      icon: Heart,
      title: "Health Insurance",
      description:
        "Secure your health and future with our comprehensive health insurance solutions.",
      features: [
        "Cashless hospitalization",
        "Pre & post hospitalization",
        "Critical illness",
        "Maternity coverage",
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      gradient: "from-green-500 to-emerald-500",
      lightningColor: "from-green-400 to-emerald-400",
      benefits: [
        "Starting ₹3,000/year",
        "Cashless treatment",
        "Family coverage",
      ],
      stats: { premium: "₹3,000", coverage: "₹10L", time: "48 hours" },
    },
    {
      icon: Shield,
      title: "Life Insurance",
      description:
        "Financial protection for your family with flexible life insurance policies.",
      features: [
        "Death benefit",
        "Maturity benefit",
        "Tax savings",
        "Riders available",
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      gradient: "from-purple-500 to-violet-500",
      lightningColor: "from-purple-400 to-violet-400",
      benefits: ["Starting ₹5,000/year", "Tax benefits", "Flexible terms"],
      stats: { premium: "₹5,000", coverage: "₹50L", time: "72 hours" },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateY: -90 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3],
            opacity: [0.1, 0.3],
            rotate: [0, 180],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1],
            opacity: [0.1, 0.2],
            rotate: [360, 180],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Header Badge */}
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-full px-6 py-3 mb-8 backdrop-blur-sm border border-purple-500/30 shadow-lg"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              rotateY: [0, 10],
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-5 h-5" />
            </motion.div>
            <span className="text-sm font-semibold">Protection & Security</span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            Insurance
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-purple-200 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Comprehensive insurance solutions to protect what matters most in
            your life
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-purple-200">24/7 Support</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-200">Full Coverage</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-purple-200">Fast Claims</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Mobile: 2x2 Grid Layout */}
          <div
            className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-6 w-full"
            style={{
              display: "grid !important",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr)) !important",
              gap: "0.5rem !important",
            }}
          >
            {insurances.map((insurance, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group relative mobile-touch w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Floating Sparkles */}
                <motion.div
                  className="absolute top-2 right-2 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [0, 1],
                    y: [0, -5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.1,
                  }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [0, 1.5],
                    x: [0, 4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2,
                  }}
                />

                <Card className="card-3d h-full relative overflow-hidden bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-700/95 border border-gray-200/30 dark:border-gray-600/30 backdrop-blur-sm transition-colors duration-300">
                  <CardHeader className="pb-1 sm:pb-2 lg:pb-4 px-2 sm:px-4">
                    <motion.div
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2 lg:mb-4 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r ${insurance.gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <insurance.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-8 lg:h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xs sm:text-sm lg:text-xl xl:text-2xl font-bold text-center mb-1 sm:mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                      {insurance.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-center leading-relaxed text-xs sm:text-sm transition-colors duration-300">
                      {insurance.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-1 sm:space-y-2 lg:space-y-4 xl:space-y-6 px-2 sm:px-4">
                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-4">
                      <div className="text-center">
                        <div className="text-xs sm:text-lg lg:text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {insurance.stats.premium}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Premium
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs sm:text-lg lg:text-2xl font-bold text-green-600 dark:text-green-400">
                          {insurance.stats.coverage}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Coverage
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs sm:text-lg lg:text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {insurance.stats.time}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Processing
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 xl:space-y-3">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-0.5 sm:mb-1 lg:mb-2 xl:mb-3 text-xs sm:text-sm lg:text-base transition-colors duration-300">
                        Key Features
                      </h4>
                      {insurance.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-1 sm:gap-2 lg:gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ x: 5, scale: 1.02 }}
                        >
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Benefits Section */}
                    <div className="bg-gradient-to-r from-gray-100/50 to-purple-100/30 dark:from-gray-700/50 dark:to-purple-900/30 rounded-lg sm:rounded-xl lg:rounded-2xl p-1 sm:p-2 lg:p-3 xl:p-4 border border-gray-200/30 dark:border-gray-600/30 transition-colors duration-300">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-0.5 sm:mb-1 lg:mb-2 xl:mb-3 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base transition-colors duration-300">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 dark:text-purple-400" />
                        Benefits
                      </h4>
                      <div className="space-y-0.5 sm:space-y-1 lg:space-y-2">
                        {insurance.benefits.map((benefit, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 sm:gap-2"
                          >
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="pt-0.5 sm:pt-1 lg:pt-2 xl:pt-4"
                    >
                      <button
                        onClick={() => openQuoteModal("quote", insurance.title)}
                        className="relative cursor-pointer py-2 px-4 sm:py-3 sm:px-6 text-center font-barlow inline-flex justify-center text-xs sm:text-sm lg:text-base uppercase text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden w-full"
                      >
                        <span className="relative z-20">Get Quote</span>

                        <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

                        <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
                        <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
                        <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
                        <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
                      </button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-r from-purple-600/90 via-indigo-600/90 to-blue-600/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden border border-white/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className="font-semibold text-sm sm:text-base">
                  Protect What Matters Most
                </span>
              </motion.div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Get Your Insurance Quote Today
              </h3>
              <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Comprehensive coverage, competitive rates, and excellent
                service. Protect your assets and secure your future!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() =>
                      openQuoteModal("quote", "Insurance Services")
                    }
                    className="relative cursor-pointer py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden"
                  >
                    <span className="relative z-20">Get Quote</span>

                    <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
                  </button>
                </motion.div>

                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.button
                    className="relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/50 rounded-xl sm:rounded-2xl text-white font-bold text-sm sm:text-lg overflow-hidden group-hover:border-white/80 group-hover:text-white transition-all duration-500"
                    whileHover={{
                      boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)",
                      borderColor: "rgba(255, 255, 255, 0.8)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Button Content */}
                    <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <motion.span
                        animate={{ x: [0, 3] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      >
                        Learn More
                      </motion.span>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    </span>

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
                      }}
                      animate={{
                        scale: [1, 1.1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {quoteType === "apply"
                        ? "Apply for Insurance"
                        : "Get Quote"}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Fill in your details below
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={quoteData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={quoteData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={quoteData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Coverage Amount (Optional)
                  </label>
                  <Input
                    type="text"
                    name="amount"
                    value={quoteData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter coverage amount"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message (Optional)
                  </label>
                  <Textarea
                    name="message"
                    value={quoteData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your insurance needs..."
                    className="w-full min-h-[100px]"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowQuoteModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Dialog for confirmations */}
      <Dialog
        isOpen={dialog.isOpen}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
      />
    </section>
  );
};

export default InsuranceServices;
