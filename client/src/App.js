import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import AnimatedHero from "./components/AnimatedHero";
import LoanServices from "./components/LoanServices";
import InsuranceServices from "./components/InsuranceServices";
import CustomerReviews from "./components/CustomerReviews";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import ThemeToggle from "./components/ThemeToggle";
import VisitorTracker from "./components/VisitorTracker";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-300">
          <VisitorTracker />
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <ThemeToggle />
                  <AnimatedHero />
                  <LoanServices />
                  <InsuranceServices />
                  <CustomerReviews />
                  <ContactForm />
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
