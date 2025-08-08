import React, { useMemo, useCallback, useState } from "react";
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
  Home,
  Building,
  GraduationCap,
  Car,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Sparkles,
  X,
  FileText,
} from "lucide-react";
import API_CONFIG from "../config/api";

const LoanServices = () => {
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
        API_CONFIG.getURL(API_CONFIG.endpoints.quote),
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
          title: "Application Submitted Successfully!",
          message:
            "Thank you! We'll get back to you soon with the best loan options for your needs.",
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

  // Memoize loans data to prevent unnecessary re-renders
  const loans = useMemo(
    () => [
      {
        icon: Home,
        title: "Home Loan",
        description:
          "Competitive rates, flexible tenure. Make your dream home a reality with our comprehensive home loan solutions.",
        features: [
          "Low interest rates",
          "Flexible EMI options",
          "Quick approval",
          "No hidden charges",
        ],
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600",
        gradient: "from-blue-500 to-cyan-500",
        lightningColor: "from-blue-400 to-cyan-400",
        stats: { rate: "8.3%", amount: "₹50L" },
      },
      {
        icon: Building,
        title: "Mortgage Loan",
        description:
          "Unlock the value of your property. Get the best mortgage rates with flexible repayment options.",
        features: [
          "Property valuation",
          "Competitive rates",
          "Easy documentation",
          "Quick disbursal",
        ],
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        iconColor: "text-purple-600",
        gradient: "from-purple-500 to-pink-500",
        lightningColor: "from-purple-400 to-pink-400",
        stats: { rate: "9.2%", amount: "₹1Cr" },
      },
      {
        icon: GraduationCap,
        title: "Student Loan",
        description:
          "Education financing made easy. Support your academic dreams with our student-friendly loan options.",
        features: [
          "No collateral required",
          "Study abroad support",
          "Grace period",
          "Career guidance",
        ],
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-50",
        iconColor: "text-green-600",
        gradient: "from-green-500 to-emerald-500",
        lightningColor: "from-green-400 to-emerald-400",
        stats: { rate: "7.8%", amount: "₹25L" },
      },
      {
        icon: Car,
        title: "Car Loan",
        description:
          "Low-interest car loans with minimal documentation. Drive your dream car with our hassle-free financing.",
        features: [
          "Zero down payment",
          "Quick processing",
          "Insurance included",
          "EMI calculator",
        ],
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50",
        iconColor: "text-orange-600",
        gradient: "from-orange-500 to-red-500",
        lightningColor: "from-orange-400 to-red-400",
        stats: { rate: "8.9%", amount: "₹15L" },
      },
    ],
    []
  );

  // Memoize animation variants to prevent recreation
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
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
    }),
    []
  );

  // Memoize background animation variants
  const backgroundVariants = useMemo(
    () => ({
      animate: {
        scale: [1, 1.3],
        opacity: [0.1, 0.3],
        rotate: [0, 180],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
    []
  );

  // Memoize header animation variants
  const headerVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
      viewport: { once: true },
    }),
    []
  );

  // Memoize badge animation variants
  const badgeVariants = useMemo(
    () => ({
      initial: { opacity: 0, scale: 0.8, rotateY: -90 },
      whileInView: { opacity: 1, scale: 1, rotateY: 0 },
      transition: { delay: 0.2, duration: 0.6 },
      viewport: { once: true },
      whileHover: {
        scale: 1.05,
        rotateY: [0, 10],
        transition: { duration: 0.3 },
      },
    }),
    []
  );

  // Memoize title animation variants
  const titleVariants = useMemo(
    () => ({
      initial: { opacity: 0, scale: 0.9 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { delay: 0.3, duration: 0.6 },
      viewport: { once: true },
      whileHover: { scale: 1.02 },
    }),
    []
  );

  // Memoize subtitle animation variants
  const subtitleVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { delay: 0.4, duration: 0.6 },
      viewport: { once: true },
    }),
    []
  );

  // Memoize features animation variants
  const featuresVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { delay: 0.5, duration: 0.6 },
      viewport: { once: true },
    }),
    []
  );

  // Memoize CTA animation variants
  const ctaVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { delay: 0.5, duration: 0.8 },
      viewport: { once: true },
    }),
    []
  );

  // Memoize feature highlight variants
  const featureHighlightVariants = useMemo(
    () => ({
      whileHover: { scale: 1.05 },
    }),
    []
  );

  // Memoize loan card variants
  const loanCardVariants = useMemo(
    () => ({
      whileHover: {
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" },
      },
    }),
    []
  );

  // Memoize icon animation variants
  const iconVariants = useMemo(
    () => ({
      whileHover: { scale: 1.1 },
      transition: { duration: 0.3, ease: "easeOut" },
    }),
    []
  );

  // Memoize feature item animation variants
  const featureItemVariants = useMemo(
    () => ({
      initial: { opacity: 0, x: -20 },
      whileInView: { opacity: 1, x: 0 },
      transition: { delay: 0.1 },
      whileHover: { x: 5, scale: 1.02 },
    }),
    []
  );

  // Memoize button animation variants
  const buttonVariants = useMemo(
    () => ({
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
    }),
    []
  );

  // Memoize CTA button variants
  const ctaButtonVariants = useMemo(
    () => ({
      whileHover: { scale: 1.02 },
      transition: { duration: 0.3 },
    }),
    []
  );

  // Memoize learn more button variants
  const learnMoreVariants = useMemo(
    () => ({
      whileHover: { scale: 1.05, y: -3 },
      whileTap: { scale: 0.95 },
    }),
    []
  );

  // Memoize learn more button content variants
  const learnMoreContentVariants = useMemo(
    () => ({
      animate: { x: [0, 3] },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
    []
  );

  // Memoize learn more icon variants
  const learnMoreIconVariants = useMemo(
    () => ({
      animate: { rotate: [0, 360] },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    }),
    []
  );

  // Memoize glow effect variants
  const glowVariants = useMemo(
    () => ({
      animate: { scale: [1, 1.1] },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
    []
  );

  // Memoize sparkle animation variants
  const sparkleVariants = useMemo(
    () => ({
      animate: {
        scale: [0, 1],
        y: [0, -5],
      },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        delay: 0.1,
      },
    }),
    []
  );

  // Memoize second sparkle animation variants
  const sparkle2Variants = useMemo(
    () => ({
      animate: {
        scale: [0, 1.5],
        x: [0, 4],
      },
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
        delay: 0.2,
      },
    }),
    []
  );

  // Memoize rotation animation variants
  const rotationVariants = useMemo(
    () => ({
      animate: { rotate: 360 },
      transition: { duration: 2, repeat: Infinity, ease: "linear" },
    }),
    []
  );

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
      {/* Optimized Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          {...backgroundVariants}
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
        <motion.div {...headerVariants} className="text-center mb-16">
          {/* Header Badge */}
          <motion.div
            {...badgeVariants}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 rounded-full px-6 py-3 mb-8 backdrop-blur-sm border border-blue-500/30 shadow-lg"
          >
            <motion.div {...rotationVariants}>
              <Home className="w-5 h-5" />
            </motion.div>
            <span className="text-sm font-semibold">Financial Solutions</span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            {...titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
          >
            Loans
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            {...subtitleVariants}
            className="text-xl text-gray-700 dark:text-blue-200 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Choose from our comprehensive range of loan products designed to
            meet your financial needs
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            {...featuresVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <motion.div
              {...featureHighlightVariants}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
            >
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-700 dark:text-blue-200">
                Quick Approval
              </span>
            </motion.div>
            <motion.div
              {...featureHighlightVariants}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
            >
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-700 dark:text-blue-200">
                Secure Process
              </span>
            </motion.div>
            <motion.div
              {...featureHighlightVariants}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-700 dark:text-blue-200">
                Competitive Rates
              </span>
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
            {loans.map((loan, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                {...loanCardVariants}
                className="group relative mobile-touch w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Floating Sparkles */}
                <motion.div
                  className="absolute top-2 right-2 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                  {...sparkleVariants}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                  {...sparkle2Variants}
                />

                <Card className="card-3d h-full relative overflow-hidden bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-700/95 border border-gray-200/30 dark:border-gray-600/30 backdrop-blur-sm transition-colors duration-300">
                  <CardHeader className="pb-1 sm:pb-2 lg:pb-4 px-2 sm:px-4">
                    <motion.div
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2 lg:mb-4 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r ${loan.gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                      {...iconVariants}
                    >
                      <loan.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-8 lg:h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xs sm:text-sm lg:text-xl xl:text-2xl font-bold text-center mb-1 sm:mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                      {loan.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-center leading-relaxed text-xs sm:text-sm transition-colors duration-300">
                      {loan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-1 sm:space-y-2 lg:space-y-4 xl:space-y-6 px-2 sm:px-4">
                    {/* Stats Section */}
                    <div className="grid grid-cols-2 gap-1 sm:gap-2 lg:gap-4">
                      <div className="text-center">
                        <div className="text-xs sm:text-lg lg:text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {loan.stats.rate}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Interest Rate
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs sm:text-lg lg:text-2xl font-bold text-green-600 dark:text-green-400">
                          {loan.stats.amount}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Max Amount
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 xl:space-y-3">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-0.5 sm:mb-1 lg:mb-2 xl:mb-3 text-xs sm:text-sm lg:text-base transition-colors duration-300">
                        Key Features
                      </h4>
                      {loan.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-1 sm:gap-2 lg:gap-3"
                          {...featureItemVariants}
                        >
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      {...buttonVariants}
                      className="pt-0.5 sm:pt-1 lg:pt-2 xl:pt-4"
                    >
                      <button
                        onClick={() => openQuoteModal("apply", loan.title)}
                        className="relative cursor-pointer py-2 px-4 sm:py-3 sm:px-6 text-center font-barlow inline-flex justify-center text-xs sm:text-sm lg:text-base uppercase text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden w-full"
                      >
                        <span className="relative z-20">Apply Now</span>

                        <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

                        <span className="w-1/2 transition-all duration-300 block border-white/30 absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
                        <span className="w-1/2 transition-all duration-300 block border-white/30 absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
                        <span className="w-1/2 transition-all duration-300 block border-white/30 absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
                        <span className="w-1/2 transition-all duration-300 block border-white/30 absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
                      </button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div {...ctaVariants} className="mt-16 text-center">
          <motion.div
            {...ctaButtonVariants}
            className="bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden border border-white/20"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className="font-semibold text-sm sm:text-base">
                  Ready to Get Started?
                </span>
              </motion.div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Apply for Your Loan Today
              </h3>
              <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Get competitive rates, quick approval, and personalized service.
                Start your application now!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <motion.div {...buttonVariants}>
                  <button
                    onClick={() => openQuoteModal("apply", "Loan Services")}
                    className="relative cursor-pointer py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden"
                  >
                    <span className="relative z-20">Apply Now</span>

                    <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

                    <span className="w-1/2 transition-all duration-300 block border-white/30 absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
                    <span className="w-1/2 transition-all duration-300 block border-white/30 absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
                    <span className="w-1/2 transition-all duration-300 block border-white/30 absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
                    <span className="w-1/2 transition-all duration-300 block border-white/30 absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
                  </button>
                </motion.div>

                <motion.div className="group relative" {...learnMoreVariants}>
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
                      <motion.span {...learnMoreContentVariants}>
                        Learn More
                      </motion.span>
                      <motion.div {...learnMoreIconVariants}>
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
                      {...glowVariants}
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
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {quoteType === "apply" ? "Apply for Loan" : "Get Quote"}
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
                    Loan Amount (Optional)
                  </label>
                  <Input
                    type="text"
                    name="amount"
                    value={quoteData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter loan amount"
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
                    placeholder="Tell us about your requirements..."
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
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
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

export default React.memo(LoanServices);
