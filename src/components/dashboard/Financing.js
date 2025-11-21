"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Shield, Info, Building2, PieChart, CreditCard, ArrowRight, CheckCircle2, Lock } from "lucide-react";

export default function Financing({ linkedAccounts = [] }) {
  const [leverage, setLeverage] = useState(1);
  
  const totalMonthlyInflow = linkedAccounts.reduce((acc, curr) => acc + curr.inflow, 0);
  const totalBalance = linkedAccounts.reduce((acc, curr) => acc + curr.balance, 0);
  const totalAverageBalance = linkedAccounts.reduce((acc, curr) => acc + curr.averageBalance, 0);
  
  // Limit Calculation Logic: Based on average cash balance (Policy)
  // Example: 80% of average balance across all accounts
  const calculatedLimit = totalAverageBalance * 0.8;
  
  const usedCredit = 1250000;
  const availableCredit = calculatedLimit - usedCredit;
  const utilization = (usedCredit / calculatedLimit) * 100;
  const interestRate = 2.5; // Monthly

  const buyingPower = availableCredit * leverage;

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Inventory Finance</h2>
          <p className="text-sm text-gray-500">Revolving credit facility backed by your cash flow.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold">Active Facility</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Limit Calculation & Sources */}
        <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    Linked Accounts
                </h3>
                <div className="space-y-3">
                    {linkedAccounts.map((acc, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm text-gray-700">{acc.bank}</span>
                                <span className="text-xs text-gray-400">{acc.account}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">Avg Balance</p>
                                    <p className="text-sm font-medium text-gray-600">₦{acc.averageBalance.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">Current</p>
                                    <p className="text-sm font-bold text-gray-900">₦{acc.balance.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase">Total Avg Balance</span>
                    <span className="font-bold text-gray-900">₦{totalAverageBalance.toLocaleString()}</span>
                </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2 text-sm">Limit Calculation Policy</h3>
                <p className="text-xs text-blue-700 mb-4 leading-relaxed">
                    Your credit limit is determined by the policy of your current partner bank, calculated as 80% of your average daily cash balance across all linked accounts.
                </p>
                <div className="flex items-center justify-between bg-white/50 p-3 rounded-lg">
                    <span className="text-xs font-bold text-blue-800">Calculated Limit</span>
                    <span className="font-bold text-blue-900 text-lg">₦{calculatedLimit.toLocaleString()}</span>
                </div>
            </div>
        </div>

        {/* Middle & Right: Credit Status & Repayment */}
        <div className="lg:col-span-2 space-y-6">
            {/* Main Credit Card */}
            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Available Credit</p>
                            <h3 className="text-4xl font-bold text-white">
                                ₦{availableCredit.toLocaleString()}
                            </h3>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                            <span className="text-xs font-bold text-green-400">{interestRate}% Interest / Mo</span>
                        </div>
                    </div>

                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Utilization ({utilization.toFixed(1)}%)</span>
                            <span className="text-gray-400">₦{usedCredit.toLocaleString()} used</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${utilization}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-full rounded-full ${utilization > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
                            />
                        </div>
                    </div>
                    
                    {/* Removed Withdraw/Increase Limit buttons as requested */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <Info className="w-4 h-4 text-blue-400" />
                        <span>Credit limits are automatically reviewed every 30 days based on account activity.</span>
                    </div>
                </div>
            </div>

            {/* Repayment / Direct Debit Section */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-gray-500" />
                        Repayment & Collections
                    </h3>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase">
                        Direct Debit Active
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Next Collection</p>
                        <p className="text-xl font-bold text-gray-900">Nov 25, 2025</p>
                        <p className="text-sm text-gray-600 mt-1">Amount: ₦42,500</p>
                    </div>
                    
                    <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Source Account</p>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold">Z</div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Zenith Bank</p>
                                <p className="text-xs text-gray-500">**** 4521</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Collections are automatically triggered on the due date. Ensure sufficient funds to avoid penalties.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
