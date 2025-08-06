import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Heart,
  Star,
  Zap,
  Globe,
  Award,
  Shield,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "News & Updates", href: "#" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Home Loans", href: "#" },
        { name: "Car Loans", href: "#" },
        { name: "Health Insurance", href: "#" },
        { name: "Life Insurance", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
    },
  ];

  const stats = [
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "10K+", label: "Happy Clients", icon: Users },
    { number: "₹500Cr+", label: "Loans Disbursed", icon: TrendingUp },
    { number: "50K+", label: "Insurance Policies", icon: Shield },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden border-t border-white/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/25 rounded-full blur-3xl"
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
        {/* Enhanced Footer Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">
              Your Trusted Financial Partner
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Prakesh Enterprises
          </motion.h2>

          <motion.p
            className="text-xl text-blue-200 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Empowering individuals and businesses with comprehensive financial
            solutions for over 15 years.
          </motion.p>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotateY: [0, 15],
                  y: -10,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 mobile-glow"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-t border-white/10">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mobile-glow"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Building2 className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">PRAKASH ENTERPRISES</h3>
                <p className="text-blue-200 text-sm">Your Trusted Partner</p>
              </div>
            </motion.div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              We provide comprehensive financial solutions including loans and
              insurance services. Our commitment is to help you achieve your
              financial goals with personalized service and competitive rates.
            </p>

            <div className="space-y-3">
              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm">+91-7383948447</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm">+91-9712729535</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm">prakashenterprise051@gmail.com</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm">
                  Star Chambers 229, Doctor Rajendra Prasad Road, Panchnath
                  Plot, Sadar, Rajkot, Gujarat, India
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Mon-Sat: 10:00-1:30, 5:30-9:00</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li key={linkIndex} whileHover={{ x: 5, scale: 1.02 }}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links & Newsletter */}
        <motion.div
          className="py-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group mobile-touch`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <Button
                variant="glass"
                className="group mobile-touch mobile-glow"
              >
                Subscribe to Newsletter
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="py-6 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 PRAKASH ENTERPRISES. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made with</span>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="w-4 h-4 text-red-400" />
              </motion.div>
              <span>in India</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
