"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Onboarding from "../components/Onboarding";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOnboardingComplete = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center md:py-12 p-0 md:px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content Area */}
      <div className="z-10 w-full">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md mx-auto"
            >
              <Onboarding onComplete={handleOnboardingComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full"
            >
              <Dashboard onLogout={handleLogout} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
