"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Check, Building2, Wallet, Receipt } from "lucide-react";
import clsx from "clsx";

export default function DirectDebit({ onComplete }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [0, 260],
    ["#f3f4f6", "#16a34a"]
  );
  
  const handleDragEnd = () => {
    if (x.get() > 200) {
      animate(x, 260);
      setIsAuthorized(true);
      setTimeout(() => {
          if(onComplete) onComplete();
      }, 3000);
    } else {
      animate(x, 0);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Repayment</h1>
        <p className="text-gray-500">Automate your loan repayments.</p>
      </div>

      {!isAuthorized ? (
        <div className="space-y-8">
          {/* Visual Flow Diagram */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center gap-6 relative overflow-hidden">
            
            {/* Source */}
            <div className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">G</div>
              <div>
                <p className="font-bold text-gray-800">GTBank</p>
                <p className="text-xs text-gray-500">Main Collection •••• 4291</p>
              </div>
            </div>

            {/* Connector */}
            <div className="h-12 w-0.5 bg-gray-200 relative">
                <motion.div 
                    className="absolute top-0 left-0 w-full bg-green-500"
                    initial={{ height: "0%" }}
                    animate={{ height: isAuthorized ? "100%" : "0%" }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-gray-200">
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
            </div>

            {/* Destination */}
            <div className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 z-10">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">W</div>
              <div>
                <p className="font-bold text-gray-800">Wema Bank</p>
                <p className="text-xs text-gray-500">Loan Repayment •••• 8822</p>
              </div>
            </div>
          </div>

          {/* Slide to Authorize */}
          <div className="relative h-16 rounded-full overflow-hidden cursor-pointer">
            <motion.div
              style={{ background }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className={clsx("font-bold transition-colors", isAuthorized ? "text-white" : "text-gray-400")}>
                {isAuthorized ? "AUTHORIZED" : "Slide to Authorize GSI"}
              </span>
            </motion.div>
            
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 260 }}
              dragElastic={0}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              style={{ x }}
              className="absolute left-1 top-1 w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center z-20"
            >
              <ArrowRight className="w-6 h-6 text-gray-900" />
            </motion.div>
          </div>
          
          <p className="text-center text-xs text-gray-400 px-8">
            By sliding, you agree to the Global Standing Instruction (GSI) mandate for auto-debit.
          </p>
        </div>
      ) : (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center"
        >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Receipt className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mandate Active</h2>
            <p className="text-gray-500 mb-8">Your repayment schedule has been set up successfully.</p>
            
            <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Next Repayment</span>
                    <span className="text-sm font-bold text-gray-900">Dec 1st, 2025</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount</span>
                    <span className="text-sm font-bold text-gray-900">₦172,500.00</span>
                </div>
            </div>

            <button 
                onClick={onComplete}
                className="text-green-600 font-bold hover:underline"
            >
                Return to Dashboard
            </button>
        </motion.div>
      )}
    </div>
  );
}
