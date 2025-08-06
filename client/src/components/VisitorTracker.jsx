import { useEffect } from "react";

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
        await fetch(
          process.env.NODE_ENV === "production"
            ? "https://prakash-enterprises.vercel.app/api/visitor"
            : "http://localhost:5000/api/visitor",
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
      } catch (error) {
        console.error("Error tracking visitor:", error);
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
