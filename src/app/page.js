"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TrendingUp, ShieldCheck, Wallet } from "lucide-react";
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
    <main className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col lg:flex-row min-h-screen"
          >
            {/* Left Side - Value Proposition */}
            <div className="lg:w-1/2 bg-gray-900 text-white p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
                    <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-500/20">
                            D
                        </div>
                        <span className="text-2xl font-bold tracking-tight">DFH Terminal</span>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                        Financial Intelligence for <span className="text-green-400">Retail Pharmacies</span>
                    </h1>
                    
                    <p className="text-lg text-gray-400 mb-12 leading-relaxed">
                        Stop guessing. Start growing. Access inventory finance, optimize procurement with real-time market data, and track sales performance in one unified platform.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <Wallet className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Instant Inventory Finance</h3>
                                <p className="text-gray-400 text-sm">Get credit based on your actual sales data, not collateral.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Smart Procurement</h3>
                                <p className="text-gray-400 text-sm">Compare prices across suppliers and restock at the best rates.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <ShieldCheck className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Financial Health Score</h3>
                                <p className="text-gray-400 text-sm">Monitor your business creditworthiness in real-time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Onboarding/Login */}
            <div className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 lg:p-8">
                <div className="w-full max-w-md">
                    <Onboarding onComplete={handleOnboardingComplete} />
                </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-screen"
          >
            <Dashboard onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
