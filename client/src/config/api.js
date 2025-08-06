// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: "http://localhost:5000",
    adminURL: "http://localhost:5000/api/admin",
    visitorURL: "http://localhost:5000/api/visitor",
    contactURL: "http://localhost:5000/api/contact",
    quoteURL: "http://localhost:5000/api/quote",
  },
  production: {
    baseURL: "https://prakash-enterprises.vercel.app",
    adminURL: "https://prakash-enterprises.vercel.app/api/admin",
    visitorURL: "https://prakash-enterprises.vercel.app/api/visitor",
    contactURL: "https://prakash-enterprises.vercel.app/api/contact",
    quoteURL: "https://prakash-enterprises.vercel.app/api/quote",
  },
};

// Get current environment
const isProduction = process.env.NODE_ENV === "production";
const currentConfig = isProduction
  ? API_CONFIG.production
  : API_CONFIG.development;

export default currentConfig;
