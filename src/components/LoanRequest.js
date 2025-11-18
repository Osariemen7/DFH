"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Calendar, TrendingDown, CheckCircle, ArrowRight } from "lucide-react";
import clsx from "clsx";

const banks = [
  { id: "access", name: "Access Bank", color: "bg-blue-800", finalBid: 4.5 },
  { id: "sterling", name: "Sterling Bank", color: "bg-red-500", finalBid: 3.8 },
  { id: "wema", name: "Wema Bank", color: "bg-purple-600", finalBid: 3.2 },
];

export default function LoanRequest({ onComplete }) {
  const [step, setStep] = useState("setup"); // setup | bidding | result
  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(3);
  const [currentRate, setCurrentRate] = useState(5.5);
  const [activeBidder, setActiveBidder] = useState(null);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (step === "bidding") {
      let bidIndex = 0;
      
      const interval = setInterval(() => {
        if (bidIndex >= banks.length) {
          clearInterval(interval);
          setStep("result");
          return;
        }

        const bank = banks[bidIndex];
        setActiveBidder(bank.id);
        setCurrentRate(bank.finalBid);
        setBids(prev => [...prev, bank]);
        
        bidIndex++;
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [step]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Financing</h1>
        <p className="text-gray-500">Get the best loan rates instantly.</p>
      </div>

      {step === "setup" && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
            <div className="relative">
              <Banknote className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={formatCurrency(amount)}
                readOnly
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl text-xl font-bold text-gray-800 border-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tenure</label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 3, 6].map((m) => (
                <button
                  key={m}
                  onClick={() => setTenure(m)}
                  className={clsx(
                    "py-3 rounded-xl font-medium transition-all",
                    tenure === m 
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/30" 
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {m} Months
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep("bidding")}
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
          >
            Request Live Bids
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}

      {(step === "bidding" || step === "result") && (
        <div className="space-y-6">
          {/* Rate Ticker */}
          <div className="bg-gray-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-medium mb-2">Best Interest Rate</p>
            <motion.div 
                key={currentRate}
                initial={{ scale: 1.2, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-black tracking-tighter text-green-400"
            >
              {currentRate}%
            </motion.div>
            <p className="text-gray-500 text-xs mt-2">Monthly Interest</p>
          </div>

          {/* Bidding Room */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 min-h-[300px]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Live Bids</h3>
            <div className="space-y-3">
              <AnimatePresence>
                {bids.map((bank) => (
                  <motion.div
                    key={bank.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={clsx(
                        "p-4 rounded-xl flex items-center justify-between border transition-colors",
                        step === "result" && bank.id === "wema" ? "bg-green-50 border-green-500" : "bg-white border-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold", bank.color)}>
                        {bank.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{bank.name}</p>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">{bank.finalBid}%</p>
                      {step === "result" && bank.id === "wema" && (
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">WINNER</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {step === "bidding" && (
                 <div className="flex items-center justify-center gap-2 text-gray-400 py-4 animate-pulse">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-xs font-medium">Waiting for more bids...</span>
                 </div>
              )}
            </div>

            {step === "result" && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={onComplete}
                    className="w-full mt-6 bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/30 flex items-center justify-center gap-2"
                >
                    Accept 3.2% Offer
                    <CheckCircle className="w-5 h-5" />
                </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
