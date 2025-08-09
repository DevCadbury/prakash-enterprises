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
      if (process.env.NODE_ENV === "production") {
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
    return (
      typeof window !== "undefined" && window.location.hostname !== "localhost"
    );
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
      reply: "/api/admin/reply",
      createUser: "/api/admin/create-user",
      deleteUser: "/api/admin/delete-user",
      editContact: "/api/admin/edit-contact",
      sendEmail: "/api/admin/send-email",
      sendPromotion: "/api/admin/send-promotion",
      testPromotion: "/api/admin/test-promotion",
      promotionHistory: "/api/admin/promotion-history",
      notificationEmails: "/api/admin/notification-emails",
      updateNotificationEmails: "/api/admin/update-notification-emails",
      adminLogs: "/api/admin/logs",
      markNotificationRead: "/api/admin/mark-notification-read",
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
};

export default API_CONFIG;
