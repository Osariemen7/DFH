"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Clock, Package, Lock, ArrowRight } from "lucide-react";

export default function SupplyMarketplace({ onComplete }) {
  const [price, setPrice] = useState(150000);
  const [isLocked, setIsLocked] = useState(false);
  const [roundTime, setRoundTime] = useState(100); // percentage
  const [stock, setStock] = useState(42);
  
  // Price drops every 3 seconds
  useEffect(() => {
    if (isLocked) return;

    const priceInterval = setInterval(() => {
      setPrice((prev) => Math.max(prev - Math.floor(Math.random() * 2000 + 1000), 120000));
      setStock((prev) => Math.max(prev - 1, 5)); // Simulate stock depleting
      setRoundTime(100); // Reset round timer visual
    }, 3000);

    const timerInterval = setInterval(() => {
        setRoundTime((prev) => Math.max(prev - 1, 0));
    }, 30);

    return () => {
      clearInterval(priceInterval);
      clearInterval(timerInterval);
    };
  }, [isLocked]);

  const handleLockPrice = () => {
    setIsLocked(true);
    setTimeout(() => {
        if(onComplete) onComplete();
    }, 2500);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Supply Marketplace</h1>
        <p className="text-gray-500">Live Dutch Auctions for best value.</p>
      </div>

      {/* Live Deal Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
        {/* Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Artemether/Lumefantrine</h3>
              <p className="text-xs text-gray-500">100 Packs • Bulk Deal</p>
            </div>
          </div>
          <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            LIVE
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 text-center">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-2">Current Price</p>
          
          <motion.div 
            key={price}
            initial={{ scale: 1.1, color: "#ef4444" }}
            animate={{ scale: 1, color: isLocked ? "#16a34a" : "#1f2937" }}
            className="text-5xl font-black tracking-tight mb-6"
          >
            {formatCurrency(price)}
          </motion.div>

          {/* Progress Bars */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-gray-500 mb-2 text-xs font-medium">
                <Clock className="w-3 h-3" /> Next Drop
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500"
                  style={{ width: `${roundTime}%` }}
                />
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-gray-500 mb-2 text-xs font-medium">
                <ShoppingCart className="w-3 h-3" /> Stock Left
              </div>
              <div className="flex items-end gap-1">
                <span className="text-xl font-bold text-gray-800">{stock}</span>
                <span className="text-xs text-gray-400 mb-1">/ 100</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <AnimatePresence mode="wait">
            {!isLocked ? (
              <motion.button
                key="lock-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLockPrice}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                LOCK PRICE & BUY NOW
              </motion.button>
            ) : (
              <motion.div
                key="success-msg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-green-100 text-green-700 font-bold py-4 rounded-xl border-2 border-green-500 flex items-center justify-center gap-2"
              >
                DEAL SECURED!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stamp Animation */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              initial={{ opacity: 0, scale: 2, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-600 text-green-600 font-black text-4xl p-4 rounded-lg uppercase tracking-widest opacity-80 mix-blend-multiply pointer-events-none"
            >
              SOLD
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {isLocked && (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-gray-500"
         >
            Redirecting to financing...
         </motion.div>
      )}
    </div>
  );
}
