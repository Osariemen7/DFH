"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Onboarding from "../components/Onboarding";
import SupplyMarketplace from "../components/SupplyMarketplace";
import LoanRequest from "../components/LoanRequest";
import DirectDebit from "../components/DirectDebit";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(1);

  const nextScreen = () => {
    setCurrentScreen((prev) => (prev < 4 ? prev + 1 : 1));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <Onboarding onComplete={nextScreen} />;
      case 2:
        return <SupplyMarketplace onComplete={nextScreen} />;
      case 3:
        return <LoanRequest onComplete={nextScreen} />;
      case 4:
        return <DirectDebit onComplete={nextScreen} />;
      default:
        return <Onboarding onComplete={nextScreen} />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header / Progress */}
      <div className="z-10 w-full max-w-md mb-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
            <span className="font-bold text-gray-800 tracking-tight">DFH Prototype</span>
        </div>
        <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
                <div 
                    key={step}
                    className={`w-2 h-2 rounded-full transition-colors ${currentScreen === step ? 'bg-green-600' : 'bg-gray-300'}`}
                />
            ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reset Button (For Demo) */}
      <button 
        onClick={() => setCurrentScreen(1)}
        className="fixed bottom-4 right-4 text-xs text-gray-400 hover:text-gray-600 z-50"
      >
        Reset Demo
      </button>
    </main>
  );
}
