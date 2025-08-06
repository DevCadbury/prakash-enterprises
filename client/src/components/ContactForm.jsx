import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Navigation,
  Route,
  ExternalLink,
  MessageCircle,
  Building,
  Calendar,
  User,
  FileText,
} from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    amount: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteType, setQuoteType] = useState(""); // "apply" or "quote"

  // Memoize contact info to prevent unnecessary re-renders
  const contactInfo = useMemo(
    () => [
      {
        icon: Building,
        title: "Contact Information",
        details: [
          {
            label: "Primary Phone",
            value: "+91-7383948447",
            action: "tel:+917383948447",
            type: "phone",
            icon: Phone,
          },
          {
            label: "Alternative Phone",
            value: "+91-9712729535",
            action: "tel:+919712729535",
            type: "phone",
            icon: Phone,
          },
          {
            label: "Primary WhatsApp",
            value: "+91-7383948447",
            action:
              "https://wa.me/917383948447?text=Hi! I'm interested in your financial services. Can you help me?",
            type: "whatsapp",
            icon: MessageCircle,
          },
          {
            label: "Alternative WhatsApp",
            value: "+91-9712729535",
            action:
              "https://wa.me/919712729535?text=Hi! I'm interested in your financial services. Can you help me?",
            type: "whatsapp",
            icon: MessageCircle,
          },
          {
            label: "Email",
            value: "prakashenterprise051@gmail.com",
            action: "mailto:prakashenterprise051@gmail.com",
            type: "email",
            icon: Mail,
          },
          {
            label: "Business Hours",
            value: "Monday - Saturday: 10:00 AM - 1:30 PM, 5:30 PM - 9:00 PM",
            action: null,
            type: "hours",
            icon: Clock,
          },
          {
            label: "Office Address",
            value:
              "Star Chambers 229, Doctor Rajendra Prasad Road, Panchnath Plot, Sadar, Rajkot, Gujarat, India",
            action:
              "https://maps.google.com/?q=Star+Chambers+229+Doctor+Rajendra+Prasad+Road+Panchnath+Plot+Sadar+Rajkot+Gujarat+India",
            type: "address",
            icon: MapPin,
          },
        ],
        description: "Get in touch with us anytime",
        color: "from-blue-500 to-purple-500",
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
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 },
      },
    }),
    []
  );

  const formVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay: 0.2 },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      },
    }),
    []
  );

  const buttonVariants = useMemo(
    () => ({
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
    }),
    []
  );

  const iconVariants = useMemo(
    () => ({
      whileHover: { scale: 1.1 },
      transition: { duration: 0.3, ease: "easeOut" },
    }),
    []
  );

  // Memoize form handlers
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleQuoteChange = useCallback((e) => {
    setQuoteData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const response = await fetch(
          process.env.NODE_ENV === "production"
            ? "https://prakash-enterprises.vercel.app/api/contact"
            : "http://localhost:5000/api/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();

        if (result.success) {
          setSubmitStatus("success");
          setFormData({ name: "", email: "", phone: "", message: "" });
          setTimeout(() => setSubmitStatus(null), 3000);
        } else {
          setSubmitStatus("error");
          setTimeout(() => setSubmitStatus(null), 3000);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 3000);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  const handleQuoteSubmit = useCallback(
    async (e) => {
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

        const result = await response.json();

        if (result.success) {
          setShowQuoteModal(false);
          setQuoteData({
            name: "",
            email: "",
            phone: "",
            service: "",
            amount: "",
            message: "",
          });
          setQuoteType("");
          // Show success toast
          setTimeout(() => {
            alert(
              `${
                quoteType === "apply" ? "Application" : "Quote request"
              } submitted successfully! We'll get back to you soon.`
            );
          }, 100);
        } else {
          alert("Failed to submit. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting quote:", error);
        alert("Failed to submit. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [quoteData, quoteType]
  );

  // Memoize contact action handlers
  const handleContactAction = useCallback((action, type) => {
    if (!action) return;

    if (type === "phone" || type === "email") {
      window.open(action, "_self");
    } else if (type === "address" || type === "whatsapp") {
      window.open(action, "_blank");
    }
  }, []);

  const handleGetDirections = useCallback(() => {
    const address = encodeURIComponent(
      "Star Chambers 229, Doctor Rajendra Prasad Road, Panchnath Plot, Sadar, Rajkot, Gujarat, India"
    );
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${address}`,
      "_blank"
    );
  }, []);

  const openQuoteModal = useCallback((type) => {
    setQuoteType(type);
    setShowQuoteModal(true);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300 max-w-2xl mx-auto leading-relaxed"
          >
            Ready to transform your financial future? Let's start the
            conversation today.
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.div {...buttonVariants}>
            <Button
              onClick={() => openQuoteModal("apply")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FileText className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
          </motion.div>
          <motion.div {...buttonVariants}>
            <Button
              onClick={() => openQuoteModal("quote")}
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Get Quote
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start"
        >
          {/* Contact Information - Left Side */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/95 dark:bg-gray-900/95 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-stretch min-h-[120px]">
                        {/* Icon Section */}
                        <div
                          className={`w-20 bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0 relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                          <motion.div
                            {...iconVariants}
                            className="relative z-10"
                          >
                            <info.icon className="w-8 h-8 text-white drop-shadow-lg" />
                          </motion.div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 p-6 flex flex-col justify-center">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                            {info.title}
                          </h3>
                          <div className="space-y-4">
                            {info.details.map((detail, idx) => (
                              <div key={idx} className="space-y-2">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 transition-colors duration-300 uppercase tracking-wider">
                                  {detail.label}
                                </p>
                                {detail.action ? (
                                  <button
                                    onClick={() =>
                                      handleContactAction(
                                        detail.action,
                                        detail.type
                                      )
                                    }
                                    className="text-left w-full group/btn"
                                  >
                                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-700">
                                      {detail.icon && (
                                        <detail.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover/btn:text-blue-700 dark:group-hover/btn:text-blue-300 transition-colors duration-300 flex-shrink-0" />
                                      )}
                                      <span className="text-gray-900 dark:text-white font-semibold group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 transition-colors duration-300 break-words text-base flex-1">
                                        {detail.value}
                                      </span>
                                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 transition-colors duration-300 flex-shrink-0" />
                                    </div>
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-3 p-3">
                                    {detail.icon && (
                                      <detail.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-300 flex-shrink-0" />
                                    )}
                                    <p className="text-gray-900 dark:text-white font-semibold transition-colors duration-300 text-base flex-1">
                                      {detail.value}
                                    </p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 transition-colors duration-300 font-medium">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Interactive Map */}
            <motion.div
              variants={cardVariants}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-white/95 dark:bg-gray-900/95 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-900 dark:text-white text-center text-xl font-bold transition-colors duration-300">
                    Visit Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Embedded Google Maps */}
                  <div className="h-64 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.5!2d70.8!3d22.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzAwLjAiTiA3MMKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-t-lg"
                      title="Prakash Enterprises Location"
                    ></iframe>
                  </div>

                  {/* Location Details */}
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <MapPin className="w-8 h-8 text-red-500 mx-auto mb-3 drop-shadow-lg" />
                      <p className="text-gray-900 dark:text-white text-lg font-bold transition-colors duration-300 mb-2">
                        Prakash Enterprises
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300 leading-relaxed">
                        Star Chambers 229, Doctor Rajendra Prasad Road,
                        Panchnath Plot, Sadar, Rajkot, Gujarat, India
                      </p>
                    </div>

                    {/* Map Action Buttons */}
                    <div className="flex gap-4">
                      <motion.div {...buttonVariants} className="flex-1">
                        <Button
                          size="lg"
                          className="w-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() =>
                            handleContactAction(
                              "https://maps.google.com/?q=Star+Chambers+229+Doctor+Rajendra+Prasad+Road+Panchnath+Plot+Sadar+Rajkot+Gujarat+India",
                              "address"
                            )
                          }
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Open in Maps
                        </Button>
                      </motion.div>
                      <motion.div {...buttonVariants} className="flex-1">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full text-sm font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
                          onClick={handleGetDirections}
                        >
                          <Route className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            variants={formVariants}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/95 dark:bg-gray-900/95 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 h-fit overflow-hidden">
              <CardHeader className="pb-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white text-3xl font-bold transition-colors duration-300 mb-3">
                  Send Message
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300 text-base transition-colors duration-300 leading-relaxed">
                  Tell us about your requirements and we'll get back to you
                  within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-gray-900 dark:text-white mb-3 block text-sm font-semibold transition-colors duration-300">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="h-12 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-900 dark:text-white mb-3 block text-sm font-semibold transition-colors duration-300">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="h-12 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-900 dark:text-white mb-3 block text-sm font-semibold transition-colors duration-300">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="h-12 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-gray-900 dark:text-white mb-3 block text-sm font-semibold transition-colors duration-300">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-xl resize-none"
                      rows={5}
                      required
                    />
                  </div>

                  {/* Submit Status */}
                  {submitStatus && (
                    <div
                      className={`p-4 rounded-xl text-sm font-medium ${
                        submitStatus === "success"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
                          : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
                      }`}
                    >
                      {submitStatus === "success"
                        ? "✅ Message sent successfully! We'll get back to you soon."
                        : "❌ Failed to send message. Please try again."}
                    </div>
                  )}

                  <motion.div {...buttonVariants} className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative cursor-pointer py-4 px-8 text-center font-bold inline-flex justify-center text-base uppercase text-white rounded-xl border-solid transition-all duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl"
                    >
                      <span className="relative z-20 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </span>

                      <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

                      <span className="w-1/2 transition-all duration-300 block border-white/30 absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
                      <span className="w-1/2 transition-all duration-300 block border-white/30 absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
                      <span className="w-1/2 transition-all duration-300 block border-white/30 absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
                      <span className="w-1/2 transition-all duration-300 block border-white/30 absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
                    </button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Quote/Apply Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {quoteType === "apply" ? "Apply Now" : "Get Quote"}
              </h3>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div>
                <label className="text-gray-900 dark:text-white mb-2 block text-sm font-semibold">
                  Full Name *
                </label>
                <Input
                  name="name"
                  value={quoteData.name}
                  onChange={handleQuoteChange}
                  placeholder="Enter your full name"
                  className="h-10 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-gray-900 dark:text-white mb-2 block text-sm font-semibold">
                  Email Address *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={quoteData.email}
                  onChange={handleQuoteChange}
                  placeholder="Enter your email address"
                  className="h-10 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-gray-900 dark:text-white mb-2 block text-sm font-semibold">
                  Phone Number *
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={quoteData.phone}
                  onChange={handleQuoteChange}
                  placeholder="Enter your phone number"
                  className="h-10 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-gray-900 dark:text-white mb-2 block text-sm font-semibold">
                  Service Type *
                </label>
                <select
                  name="service"
                  value={quoteData.service}
                  onChange={handleQuoteChange}
                  className="w-full h-10 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-lg px-3"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="personal-loan">Personal Loan</option>
                  <option value="business-loan">Business Loan</option>
                  <option value="home-loan">Home Loan</option>
                  <option value="vehicle-loan">Vehicle Loan</option>
                  <option value="insurance">Insurance</option>
                  <option value="investment">Investment</option>
                </select>
              </div>

              {quoteType === "quote" && (
                <div>
                  <label className="text-gray-900 dark:text-white mb-2 block text-sm font-semibold">
                    Required Amount (₹)
                  </label>
                  <Input
                    name="amount"
                    type="number"
                    value={quoteData.amount}
                    onChange={handleQuoteChange}
                    placeholder="Enter amount"
                    className="h-10 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-lg"
                  />
                </div>
              )}

              <div>
                <label className="text-gray-900 dark:text-white mb-2 block text-sm font-semibold">
                  Additional Details
                </label>
                <Textarea
                  name="message"
                  value={quoteData.message}
                  onChange={handleQuoteChange}
                  placeholder="Tell us more about your requirements..."
                  className="bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-lg resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <FileText className="w-4 h-4 mr-2" />
                  )}
                  {quoteType === "apply" ? "Submit Application" : "Get Quote"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowQuoteModal(false)}
                  className="flex-1 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default React.memo(ContactForm);
