import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme, setSystemTheme, isSystemTheme } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* System Theme Button */}
      <motion.button
        onClick={setSystemTheme}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isSystemTheme
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Use system theme"
      >
        <Monitor className="w-4 h-4" />
      </motion.button>

      {/* Light/Dark Toggle */}
      <motion.button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-all duration-200 ${
          theme === "dark"
            ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
            : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === "dark" ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;
