import { useEffect } from "react";
import API_CONFIG from "../config/api";

const VisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get device information
        const userAgent = navigator.userAgent;
        let device = "desktop";
        let browser = "";
        let os = "";

        // Detect device type
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            userAgent
          )
        ) {
          device = "mobile";
        } else if (/iPad|Android/i.test(userAgent)) {
          device = "tablet";
        }

        // Detect browser
        if (userAgent.includes("Chrome")) {
          browser = "Chrome";
        } else if (userAgent.includes("Firefox")) {
          browser = "Firefox";
        } else if (userAgent.includes("Safari")) {
          browser = "Safari";
        } else if (userAgent.includes("Edge")) {
          browser = "Edge";
        } else {
          browser = "Other";
        }

        // Detect OS
        if (userAgent.includes("Windows")) {
          os = "Windows";
        } else if (userAgent.includes("Mac")) {
          os = "macOS";
        } else if (userAgent.includes("Linux")) {
          os = "Linux";
        } else if (userAgent.includes("Android")) {
          os = "Android";
        } else if (userAgent.includes("iOS")) {
          os = "iOS";
        } else {
          os = "Other";
        }

        // Generate session ID
        const sessionId =
          localStorage.getItem("sessionId") ||
          Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

        localStorage.setItem("sessionId", sessionId);

        // Track visitor
        const response = await fetch(
          API_CONFIG.getURL(API_CONFIG.endpoints.visitor),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              page: window.location.pathname || "home",
              referrer: document.referrer || "",
              device,
              browser,
              os,
              sessionId,
            }),
          }
        );

        if (!response.ok) {
          console.warn(
            `Visitor tracking failed: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        // Only log as error if it's not a network/CORS issue
        if (
          error.name === "TypeError" &&
          error.message.includes("Failed to fetch")
        ) {
          console.warn(
            "Visitor tracking unavailable - server may not be running"
          );
        } else {
          console.error("Error tracking visitor:", error);
        }
      }
    };

    // Track on page load
    trackVisitor();

    // Track on page visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackVisitor();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default VisitorTracker;
