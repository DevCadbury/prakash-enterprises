import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnimatedHero from "./components/AnimatedHero";
import InsuranceServices from "./components/InsuranceServices";
import LoanServices from "./components/LoanServices";
import CustomerReviews from "./components/CustomerReviews";
import ContactForm from "./components/ContactForm";
import AdminDashboard from "./components/AdminDashboard";
import VisitorTracker from "./components/VisitorTracker";
import "./index.css";

function App() {
  useEffect(() => {
    // Production-ready initialization
    // No console logs in production
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <AnimatedHero />
                    <InsuranceServices />
                    <LoanServices />
                    <CustomerReviews />
                    <ContactForm />
                  </>
                }
              />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/visitor-tracker" element={<VisitorTracker />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
