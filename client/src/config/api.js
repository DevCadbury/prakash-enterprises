// API Configuration
const API_CONFIG = {
  // Base URLs
  PRODUCTION_URL: "https://prakash-enterprises.vercel.app",
  DEVELOPMENT_URL: "http://localhost:5000",

  // Get the appropriate base URL based on environment
  getBaseURL: () => {
    // For client-side code, we need to handle both development and production
    if (typeof window !== "undefined") {
      // Client-side code
      if (
        process.env.NODE_ENV === "production" ||
        API_CONFIG.isProductionClient()
      ) {
        // In production, always use the current domain for API calls
        // This ensures API calls go to the same deployment
        return window.location.origin;
      }
      return API_CONFIG.DEVELOPMENT_URL;
    } else {
      // Server-side code
      if (process.env.NODE_ENV === "production") {
        return API_CONFIG.PRODUCTION_URL;
      }
      return API_CONFIG.DEVELOPMENT_URL;
    }
  },

  // Alternative method for explicit production URL
  getProductionURL: () => {
    return API_CONFIG.PRODUCTION_URL;
  },

  // Environment detection helper
  isProduction: () => {
    return process.env.NODE_ENV === "production";
  },

  // Environment detection helper for client-side
  isProductionClient: () => {
    if (typeof window === "undefined") return false;

    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    // Check if we're on a production domain
    return (
      hostname !== "localhost" &&
      hostname !== "127.0.0.1" &&
      protocol === "https:" &&
      (hostname.includes("vercel.app") ||
        hostname.includes("netlify.app") ||
        hostname.includes("prakash-enterprises"))
    );
  },

  // Check if we're on Vercel
  isVercel: () => {
    if (typeof window === "undefined") return false;
    return window.location.hostname.includes("vercel.app");
  },

  // Get current domain for API calls
  getCurrentDomain: () => {
    if (typeof window === "undefined") return null;
    return window.location.origin;
  },

  // API Endpoints
  endpoints: {
    // Public endpoints
    health: "/api/health",
    contact: "/api/contact",
    quote: "/api/quote",
    visitor: "/api/visitor",

    // Admin endpoints
    admin: {
      login: "/api/admin/login",
      logout: "/api/admin/logout",
      verifyToken: "/api/admin/verify-token",
      forgotPassword: "/api/admin/forgot-password",
      resetPassword: "/api/admin/reset-password",
      dashboard: "/api/admin/dashboard",
      contacts: "/api/admin/contacts",
      users: "/api/admin/users",
      visitorStats: "/api/admin/visitor-stats",
      notifications: "/api/admin/notifications",
      notificationCount: "/api/admin/notifications/count",
      reply: "/api/admin/contacts/:id/reply",
      createUser: "/api/admin/users",
      deleteUser: "/api/admin/users/:id",
      editContact: "/api/admin/contacts/:id",
      sendEmail: "/api/admin/contacts/:id/email",
      sendPromotion: "/api/admin/promotions/send",
      testPromotion: "/api/admin/test-promotional-email",
      promotionHistory: "/api/admin/promotions",
      notificationEmails: "/api/admin/notification-emails",
      updateNotificationEmails: "/api/admin/notification-emails/:type",
      adminLogs: "/api/admin/logs",
      markNotificationRead: "/api/admin/notifications/:id/read",
    },
  },

  // Helper function to get full URL
  getURL: (endpoint) => {
    return `${API_CONFIG.getBaseURL()}${endpoint}`;
  },

  // Helper function to get admin URL
  getAdminURL: (endpoint) => {
    return `${API_CONFIG.getBaseURL()}${
      API_CONFIG.endpoints.admin[endpoint] || endpoint
    }`;
  },

  // Helper function to replace URL parameters
  getAdminURLWithParams: (endpoint, params = {}) => {
    let url = API_CONFIG.getAdminURL(endpoint);

    // Replace URL parameters
    Object.keys(params).forEach((key) => {
      url = url.replace(`:${key}`, params[key]);
    });

    return url;
  },

  // CORS and request configuration
  requestConfig: {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },

  // Error handling
  handleError: (error, defaultMessage = "An error occurred") => {
    console.error("API Error:", error);

    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        message: error.response.data?.message || defaultMessage,
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      // Request made but no response received
      return {
        success: false,
        message: "No response from server. Please check your connection.",
        status: 0,
        data: null,
      };
    } else {
      // Something else happened
      return {
        success: false,
        message: error.message || defaultMessage,
        status: 0,
        data: null,
      };
    }
  },
};

export default API_CONFIG;
