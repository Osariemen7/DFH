"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { Check, ShieldCheck, Building2, ArrowRight } from "lucide-react";
import clsx from "clsx";

const banks = [
  { id: "zenith", name: "Zenith Bank", color: "bg-red-600" },
  { id: "gtb", name: "GTBank", color: "bg-orange-500" },
  { id: "access", name: "Access Bank", color: "bg-blue-800" },
  { id: "opay", name: "Opay", color: "bg-green-500" },
];

const mockData = [
  { value: 2000 },
  { value: 3000 },
  { value: 2500 },
  { value: 4500 },
  { value: 3800 },
  { value: 5200 },
  { value: 4800 },
  { value: 6000 },
];

export default function Onboarding({ onComplete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [creditScore, setCreditScore] = useState(0);

  const handleSync = () => {
    setIsModalOpen(true);
  };

  const handleConnect = () => {
    setIsModalOpen(false);
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      animateCreditScore();
    }, 3000);
  };

  const animateCreditScore = () => {
    let start = 0;
    const end = 780;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      
      setCreditScore(Math.floor(start + (end - start) * ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Show toast or auto-proceed
        setTimeout(() => {
            if(onComplete) onComplete();
        }, 2000);
      }
    };

    requestAnimationFrame(animate);
  };

  const toggleBank = (id) => {
    if (selectedBanks.includes(id)) {
      setSelectedBanks(selectedBanks.filter((b) => b !== id));
    } else {
      setSelectedBanks([...selectedBanks, id]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Financial Health</h1>
        <p className="text-gray-500">Connect your accounts to verify creditworthiness.</p>
      </div>

      {/* Financial Health Widget */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 mb-8 min-h-[300px] flex flex-col justify-center relative overflow-hidden">
        {!analysisComplete ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ShieldCheck className="w-12 h-12 text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">No Data Available</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col"
          >
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Credit Score</p>
                <div className="text-5xl font-bold text-green-600">{creditScore}</div>
                <p className="text-sm text-green-600 font-medium">Excellent</p>
              </div>
              <div className="text-right">
                 <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Cash Flow</p>
                 <p className="text-xl font-bold text-gray-800">₦4.2M<span className="text-sm font-normal text-gray-500">/mo</span></p>
              </div>
            </div>
            
            <div className="h-32 w-full mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#16a34a" 
                    strokeWidth={3} 
                    dot={false} 
                  />
                  <YAxis hide domain={['dataMin', 'dataMax']} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Data Stream Simulation Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 z-10 flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 opacity-30 font-mono text-xs text-green-500 p-4 break-all">
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: -500, opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: Math.random() * 2,
                      ease: "linear"
                    }}
                  >
                    {`TXN_${Math.random().toString(36).substr(2, 9).toUpperCase()} | AMOUNT: ₦${(Math.random() * 100000).toFixed(2)} | DATE: 2025-11-${Math.floor(Math.random() * 30)}`}
                  </motion.div>
                ))}
              </div>
              <div className="z-20 text-center">
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-green-400 font-mono">ANALYZING TRANSACTIONS...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Button */}
      {!analysisComplete && !isAnalyzing && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSync}
          className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/30 flex items-center justify-center gap-2"
        >
          <Building2 className="w-5 h-5" />
          Sync Transaction History
        </motion.button>
      )}
      
      {analysisComplete && (
         <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          Continue to Marketplace
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      )}

      {/* Bank Selection Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl z-50 p-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-4">Select Your Banks</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => toggleBank(bank.id)}
                    className={clsx(
                      "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                      selectedBanks.includes(bank.id)
                        ? "border-green-500 bg-green-50"
                        : "border-gray-100 hover:border-gray-200"
                    )}
                  >
                    <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold", bank.color)}>
                      {bank.name[0]}
                    </div>
                    <span className="font-medium text-sm">{bank.name}</span>
                    {selectedBanks.includes(bank.id) && (
                      <div className="absolute top-2 right-2 text-green-600">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                disabled={selectedBanks.length === 0}
                onClick={handleConnect}
                className="w-full bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl"
              >
                Connect & Analyze
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
