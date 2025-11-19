"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Shield, Info, Building2, PieChart, CreditCard } from "lucide-react";

export default function Financing() {
  const [leverage, setLeverage] = useState(1);
  
  // Mock Financial Data
  const creditLimit = 5000000;
  const usedCredit = 1250000;
  const availableCredit = creditLimit - usedCredit;
  const utilization = (usedCredit / creditLimit) * 100;
  const interestRate = 2.5; // Monthly
  const lender = "Access Bank PLC";

  const buyingPower = availableCredit * leverage;

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Inventory Finance</h2>
          <p className="text-sm text-gray-500">Revolving credit facility for stock procurement.</p>
        </div>
        <div className="text-left sm:text-right">
           <div className="flex items-center sm:justify-end gap-2 text-gray-600 mb-1">
              <Building2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Financing Partner</span>
           </div>
           <p className="text-lg font-bold text-blue-900">{lender}</p>
        </div>
      </header>

      {/* Credit Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Usage Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Credit Limit Status
                </h3>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    {interestRate}% Monthly Interest
                </span>
            </div>

            <div className="mb-2 flex justify-between text-sm font-medium">
                <span className="text-gray-500">Used: ₦{usedCredit.toLocaleString()}</span>
                <span className="text-gray-500">Limit: ₦{creditLimit.toLocaleString()}</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-6">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${utilization}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${utilization > 80 ? 'bg-red-500' : 'bg-blue-600'}`}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Available to Draw</p>
                    <p className="text-2xl font-bold text-gray-900">₦{availableCredit.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Next Repayment</p>
                    <p className="text-2xl font-bold text-gray-900">₦42,500</p>
                    <p className="text-[10px] text-gray-400">Due via Direct Debit on Nov 25</p>
                </div>
            </div>
        </div>

        {/* Leverage / Buying Power */}
        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Projected Buying Power</p>
                <h3 className="text-3xl font-bold text-green-400 mb-1">
                    ₦{new Intl.NumberFormat('en-NG').format(buyingPower)}
                </h3>
                <p className="text-xs text-gray-500 mb-6">Based on available credit & leverage</p>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Leverage Multiplier</span>
                        <span className="font-bold text-white">{leverage}x</span>
                    </div>
                    <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        step="0.5"
                        value={leverage}
                        onChange={(e) => setLeverage(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>

      {/* Transaction History / Info */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700 text-sm">Recent Drawdowns</h3>
            <button className="text-xs text-blue-600 font-medium hover:underline">View Statement</button>
        </div>
        <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-b border-gray-100">
                <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Purpose</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                <tr>
                    <td className="p-4 text-gray-600">Nov 18, 2025</td>
                    <td className="p-4 font-medium text-gray-800">Stock Purchase (Fidson)</td>
                    <td className="p-4 font-mono">₦450,000</td>
                    <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Active</span></td>
                </tr>
                <tr>
                    <td className="p-4 text-gray-600">Nov 15, 2025</td>
                    <td className="p-4 font-medium text-gray-800">Stock Purchase (Emzor)</td>
                    <td className="p-4 font-mono">₦800,000</td>
                    <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Active</span></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
