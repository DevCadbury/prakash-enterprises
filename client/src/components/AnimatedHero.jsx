import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Button } from "./ui/button";
import {
  Building2,
  Shield,
  TrendingUp,
  Users,
  ArrowRight,
  Star,
  Zap,
  Heart,
  Globe,
  Award,
  ArrowUpRight,
  Play,
} from "lucide-react";

const AnimatedHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showStats, setShowStats] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  // Memoize data points to prevent recreation
  const dataPoints = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        intensity: Math.random() * 0.6 + 0.4,
      })),
    []
  );

  // Memoize data spikes
  const dataSpikes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        height: Math.random() * 40 + 20,
        intensity: Math.random() * 0.6 + 0.4,
      })),
    []
  );

  // Memoize wave surface points
  const wavePoints = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: (i / 30) * 100,
        y: 60 + Math.sin(i * 0.2) * 15,
        size: Math.random() * 2 + 1,
        intensity: Math.random() * 0.5 + 0.3,
      })),
    []
  );

  // Memoize floating elements
  const floatingElements = useMemo(
    () => [
      {
        icon: Building2,
        delay: 0,
        x: -60,
        y: -40,
        size: "w-10 h-10",
      },
      {
        icon: Shield,
        delay: 0.5,
        x: 60,
        y: -30,
        size: "w-8 h-8",
      },
      {
        icon: TrendingUp,
        delay: 1,
        x: -40,
        y: 50,
        size: "w-9 h-9",
      },
      {
        icon: Users,
        delay: 1.5,
        x: 50,
        y: 40,
        size: "w-10 h-10",
      },
    ],
    []
  );

  // Memoize stats data
  const stats = useMemo(
    () => [
      {
        number: "10K+",
        label: "Happy Clients",
        icon: Heart,
        description: "Trusted by thousands",
        gradient: "from-red-500 via-pink-500 to-rose-500",
      },
      {
        number: "₹500Cr+",
        label: "Loans Disbursed",
        icon: TrendingUp,
        description: "Financial success",
        gradient: "from-green-500 via-emerald-500 to-teal-500",
      },
      {
        number: "50K+",
        label: "Insurance Policies",
        icon: Shield,
        description: "Complete protection",
        gradient: "from-blue-500 via-cyan-500 to-indigo-500",
      },
      {
        number: "15+",
        label: "Years Experience",
        icon: Award,
        description: "Industry expertise",
        gradient: "from-purple-500 via-violet-500 to-indigo-500",
      },
    ],
    []
  );

  // Memoize animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 1,
          staggerChildren: 0.2,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
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

  const background2Variants = useMemo(
    () => ({
      animate: {
        scale: [1.2, 1],
        opacity: [0.1, 0.2],
        rotate: [360, 180],
      },
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
    []
  );

  // Memoize title animation variants
  const titleVariants = useMemo(
    () => ({
      animate: {
        textShadow: [
          "0 0 30px rgba(34, 211, 238, 0.3)",
          "0 0 60px rgba(34, 211, 238, 0.6)",
        ],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
    []
  );

  // Memoize subtitle animation variants
  const subtitleVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.5, duration: 0.8 },
    }),
    []
  );

  // Memoize button animation variants
  const buttonVariants = useMemo(
    () => ({
      whileHover: { scale: 1.05, y: -5 },
      whileTap: { scale: 0.95 },
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

  // Memoize learn more content variants
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

  // Memoize floating element variants
  const floatingElementVariants = useMemo(
    () => ({
      initial: { opacity: 0, scale: 0 },
      animate: {
        opacity: [0.3, 0.6],
        scale: [1, 1.1],
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
      whileHover: {
        scale: 1.2,
      },
    }),
    []
  );

  // Memoize mouse glow variants
  const mouseGlowVariants = useMemo(
    () => ({
      animate: {
        opacity: [0.3, 0.5],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
    []
  );

  // Memoize scroll indicator variants
  const scrollIndicatorVariants = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 2.5, duration: 0.8 },
    }),
    []
  );

  const scrollIndicatorContentVariants = useMemo(
    () => ({
      animate: {
        y: [0, 5],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
    []
  );

  // Memoize data point renderer
  const renderDataPoint = useCallback(
    (point) => (
      <motion.div
        key={point.id}
        className="absolute bg-cyan-400 rounded-full"
        style={{
          left: `${point.x}%`,
          top: `${point.y}%`,
          width: `${point.size}px`,
          height: `${point.size}px`,
          boxShadow: `0 0 ${point.size * 1.5}px rgba(34, 211, 238, ${
            point.intensity
          })`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [
            point.intensity * 0.7,
            point.intensity,
            point.intensity * 0.7,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ),
    []
  );

  // Memoize data spike renderer
  const renderDataSpike = useCallback(
    (spike) => (
      <motion.div
        key={spike.id}
        className="absolute bg-gradient-to-t from-cyan-400 to-transparent"
        style={{
          left: `${spike.x}%`,
          top: `${spike.y}%`,
          width: "2px",
          height: `${spike.height}px`,
          boxShadow: `0 0 ${spike.height / 2}px rgba(34, 211, 238, ${
            spike.intensity
          })`,
        }}
        animate={{
          opacity: [
            spike.intensity * 0.6,
            spike.intensity,
            spike.intensity * 0.6,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ),
    []
  );

  // Memoize wave point renderer
  const renderWavePoint = useCallback(
    (point) => (
      <motion.div
        key={point.id}
        className="absolute bg-blue-400 rounded-full"
        style={{
          left: `${point.x}%`,
          top: `${point.y}%`,
          width: `${point.size}px`,
          height: `${point.size}px`,
          boxShadow: `0 0 ${point.size}px rgba(59, 130, 246, ${point.intensity})`,
        }}
        animate={{
          opacity: [
            point.intensity * 0.6,
            point.intensity,
            point.intensity * 0.6,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ),
    []
  );

  // Memoize event handlers
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleMouseMove, handleResize]);

  return (
    <section
      className="section-padding relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/22920.jpg)" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 transition-colors duration-300"></div>

      {/* Optimized Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          {...backgroundVariants}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"
          {...background2Variants}
        />
      </div>

      {/* Simplified Interactive Background */}
      <div className="absolute inset-0">
        {/* Base gradient background with transparency */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/60 to-indigo-900/60" />

        {/* Static gradient overlay instead of animated */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-cyan-800/20 to-indigo-800/20" />

        {/* Reduced data points grid */}
        <div className="absolute inset-0">
          {dataPoints.map(renderDataPoint)}
        </div>

        {/* Reduced data spikes */}
        <div className="absolute inset-0">
          {dataSpikes.map(renderDataSpike)}
        </div>

        {/* Simplified wave surface */}
        <div className="absolute inset-0">
          {wavePoints.map(renderWavePoint)}
        </div>

        {/* Simplified connected lines - only 5 connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {dataPoints.slice(0, 5).map((point, index) => {
            const nextPoint = dataPoints[(index + 1) % dataPoints.length];
            return (
              <motion.line
                key={`line-${index}`}
                x1={`${point.x}%`}
                y1={`${point.y}%`}
                x2={`${nextPoint.x}%`}
                y2={`${nextPoint.y}%`}
                stroke="rgba(34, 211, 238, 0.3)"
                strokeWidth="1"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.2, 0.4] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>

        {/* Simplified mouse interactive glow */}
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full pointer-events-none blur-lg"
          style={{
            x: mousePosition.x - 64,
            y: mousePosition.y - 64,
          }}
          {...mouseGlowVariants}
        />
      </div>

      {/* Reduced Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/20`}
            style={{
              left: `calc(50% + ${element.x}px)`,
              top: `calc(50% + ${element.y}px)`,
            }}
            {...floatingElementVariants}
            transition={{
              ...floatingElementVariants.transition,
              delay: element.delay,
            }}
          >
            <element.icon className="w-5 h-5 text-white" />
          </motion.div>
        ))}
      </div>

      {/* Glassmorphic Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Glassmorphic Hero Title */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent transition-colors duration-300"
            {...titleVariants}
          >
            PRAKASH ENTERPRISES
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed transition-colors duration-300"
            {...subtitleVariants}
          >
            Your Trusted Partner for Loans & Insurance
          </motion.p>
        </motion.div>

        {/* Glassmorphic Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.div {...buttonVariants}>
            <Button
              size="lg"
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md text-lg px-10 py-6 border border-white/20 shadow-xl hover:shadow-2xl text-white font-bold"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 font-bold">Get Started Today</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div {...buttonVariants}>
            <Button
              size="lg"
              variant="outline"
              className="group bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 mobile-touch mobile-glow text-lg px-10 py-6 shadow-xl"
            >
              <Play className="mr-3 w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Simplified Learn More Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <motion.div className="group relative" {...learnMoreVariants}>
            <motion.button
              className="relative px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white font-bold text-lg overflow-hidden group-hover:border-cyan-300 group-hover:text-cyan-200 transition-all duration-500 shadow-xl"
              whileHover={{
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                borderColor: "rgba(34, 211, 238, 0.6)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Simplified Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-3">
                <motion.span {...learnMoreContentVariants}>
                  Learn More
                </motion.span>
                <motion.div {...learnMoreIconVariants}>
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </span>

              {/* Simplified Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)",
                }}
                {...glowVariants}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Glassmorphic Stats Section */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer bg-white/10 backdrop-blur-md rounded-xl sm:rounded-3xl p-3 sm:p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                >
                  <motion.div
                    className={`w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r ${stat.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <stat.icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                  <motion.h3
                    className="text-lg sm:text-3xl font-black mb-1 sm:mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent transition-colors duration-300"
                    animate={{
                      scale: [1, 1.02],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2,
                    }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-xs sm:text-lg font-bold text-white mb-1 sm:mb-2 transition-colors duration-300">
                    {stat.label}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-200 transition-colors duration-300">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Simplified Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 text-white transition-colors duration-300"
        {...scrollIndicatorVariants}
      >
        <motion.div
          {...scrollIndicatorContentVariants}
          className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg"
        >
          <span className="text-sm font-medium text-white">Scroll</span>
          <ArrowRight className="w-4 h-4 rotate-90 text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(AnimatedHero);
