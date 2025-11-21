"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Building2, ArrowRight, CheckCircle, Loader2, Banknote } from "lucide-react";

const banks = [
  { id: "zenith", name: "Zenith Bank", color: "bg-red-600" },
  { id: "gtb", name: "GTBank", color: "bg-orange-500" },
  { id: "access", name: "Access Bank", color: "bg-blue-800" },
  { id: "opay", name: "Opay", color: "bg-green-500" },
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "HealthPlus Pharmacy",
    rcNumber: "RC123456",
    address: "123 Admiralty Way, Lekki Phase 1, Lagos",
    bank: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [creditScore, setCreditScore] = useState(0);

  const handleNext = () => {
    if (step === 1 && (!formData.businessName || !formData.rcNumber)) return;
    if (step === 2 && !formData.bank) return;
    
    if (step === 2) {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
            animateCreditScore();
        }, 3000);
    } else {
        setStep(step + 1);
    }
  };

  const animateCreditScore = () => {
    let start = 0;
    const end = 780;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      
      setCreditScore(Math.floor(start + (end - start) * ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
            if(onComplete) onComplete();
        }, 1500);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {step === 1 ? "Business Profile" : step === 2 ? "Connect Bank" : "Financial Health"}
        </h1>
        <p className="text-gray-500">
            {step === 1 ? "Tell us about your pharmacy." : step === 2 ? "Link your primary account for analysis." : "Analyzing your creditworthiness."}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
            {step === 1 && (
                <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 flex flex-col gap-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            placeholder="e.g. HealthPlus Pharmacy"
                            value={formData.businessName}
                            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">RC Number</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            placeholder="e.g. RC123456"
                            value={formData.rcNumber}
                            onChange={(e) => setFormData({...formData, rcNumber: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea 
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                            placeholder="Pharmacy Address"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                    </div>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1"
                >
                    {isProcessing ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
                            <h3 className="font-bold text-gray-800">Analyzing Transactions...</h3>
                            <p className="text-sm text-gray-500 mt-2">This usually takes a few seconds.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            {banks.map((bank) => (
                                <button
                                    key={bank.id}
                                    onClick={() => setFormData({...formData, bank: bank.id})}
                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                                        formData.bank === bank.id 
                                        ? "border-green-500 bg-green-50" 
                                        : "border-gray-100 hover:border-gray-200"
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-full ${bank.color} flex items-center justify-center text-white font-bold`}>
                                        {bank.name[0]}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{bank.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}

            {step === 3 && (
                <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center"
                >
                    <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="#f3f4f6"
                                strokeWidth="12"
                                fill="transparent"
                            />
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke={creditScore > 700 ? "#16a34a" : creditScore > 500 ? "#eab308" : "#dc2626"}
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={440}
                                strokeDashoffset={440 - (440 * creditScore) / 850}
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-gray-800">{creditScore}</span>
                            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Credit Score</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-bold">Excellent Standing</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {!isProcessing && step < 3 && (
            <button
                onClick={handleNext}
                className="w-full mt-6 bg-gray-900 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
                {step === 1 ? "Continue" : "Securely Connect"} <ArrowRight className="w-4 h-4" />
            </button>
        )}
      </div>
    </div>
  );
}
