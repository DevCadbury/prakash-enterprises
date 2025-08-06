import React, { useState, useCallback, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";

const SimpleThemeToggle = () => {
  const [theme, setTheme] = useState("system");

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const applyTheme = useCallback((selectedTheme) => {
    const root = document.documentElement;
    const actualTheme =
      selectedTheme === "system" ? getSystemTheme() : selectedTheme;

    // Remove all theme classes
    root.classList.remove("light", "dark");

    // Add the appropriate theme class
    root.classList.add(actualTheme);

    // Set data attribute for CSS custom properties
    root.setAttribute("data-theme", actualTheme);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, [applyTheme]);

  const handleThemeChange = () => {
    const themes = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5 text-yellow-400 drop-shadow-lg" />;
      case "dark":
        return <Moon className="h-5 w-5 text-blue-400 drop-shadow-lg" />;
      case "system":
        return <Monitor className="h-5 w-5 text-green-400 drop-shadow-lg" />;
      default:
        return <Monitor className="h-5 w-5 text-green-400 drop-shadow-lg" />;
    }
  };

  const getTooltip = () => {
    switch (theme) {
      case "light":
        return "Light Mode";
      case "dark":
        return "Dark Mode";
      case "system":
        return "System Theme";
      default:
        return "System Theme";
    }
  };

  return (
    <motion.button
      onClick={handleThemeChange}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={getTooltip()}
      className="w-12 h-12 rounded-xl bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 hover:bg-gray-700 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl relative z-50"
      style={{
        position: "relative",
        zIndex: 9999,
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        border: "2px solid rgba(75, 85, 99, 1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{
          rotate: theme === "dark" ? 180 : theme === "light" ? -180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  );
};

export default SimpleThemeToggle;
