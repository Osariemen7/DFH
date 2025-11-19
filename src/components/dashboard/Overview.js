"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Truck, ArrowRight, DollarSign } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const salesData = [
  { day: "Mon", sales: 120000 },
  { day: "Tue", sales: 145000 },
  { day: "Wed", sales: 132000 },
  { day: "Thu", sales: 190000 },
  { day: "Fri", sales: 150000 },
  { day: "Sat", sales: 210000 },
  { day: "Sun", sales: 180000 },
];

export default function Overview({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Good Morning, Chinedu</h1>
          <p className="text-gray-500 text-sm">Here's what's happening with your pharmacy today.</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Net Equity</p>
          <p className="text-xl font-bold text-gray-900">₦4,250,000.00</p>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-500">Daily Sales</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">₦180,000</p>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+12% vs yesterday</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-500">Low Stock Alerts</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">3 Items</p>
          <p className="text-xs text-gray-400 mt-1">Requires immediate attention</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-500">Pending Deliveries</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">2 Orders</p>
          <p className="text-xs text-gray-400 mt-1">Arriving by 2:00 PM</p>
        </div>
      </div>

      {/* JIT Recommendations */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                JIT Sourcing Alert
              </h3>
              <p className="text-gray-400 text-sm">Artemether/Lumefantrine is running low (5 packs left).</p>
            </div>
            <button 
              onClick={() => setActiveTab('marketplace')}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Best Price Found</span>
              <span className="font-bold text-green-400">₦1,450/pack</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Supplier: Fidson Healthcare</span>
              <span>Distance: 5.2km (Fast Delivery)</span>
            </div>
          </div>
        </div>
        
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64">
        <h3 className="font-bold text-gray-800 mb-4">Weekly Sales Performance</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#16a34a" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#16a34a", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
