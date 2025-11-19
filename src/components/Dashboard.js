"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Package, TrendingUp, Wallet, LogOut } from "lucide-react";
import Overview from "./dashboard/Overview";
import Inventory from "./dashboard/Inventory";
import Marketplace from "./dashboard/Marketplace";
import Financing from "./dashboard/Financing";

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory & Sales", icon: Package },
    { id: "marketplace", label: "Marketplace", icon: TrendingUp },
    { id: "financing", label: "Inventory Finance", icon: Wallet },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <Overview setActiveTab={setActiveTab} />;
      case "inventory": return <Inventory />;
      case "marketplace": return <Marketplace />;
      case "financing": return <Financing />;
      default: return <Overview />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-screen md:min-h-0 md:h-[800px] bg-white/90 backdrop-blur-xl rounded-none md:rounded-3xl shadow-2xl border-x-0 md:border border-white/20 overflow-visible md:overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-gray-50/50 border-b md:border-b-0 md:border-r border-gray-100 p-4 md:p-6 flex flex-col shrink-0">
        <div className="mb-6 md:mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-green-600/20">
            D
          </div>
          <div>
            <h2 className="font-bold text-gray-800">DFH Terminal</h2>
            <p className="text-xs text-gray-500">Pro Edition</p>
          </div>
        </div>

        <nav className="flex-1 grid grid-cols-2 gap-2 md:block md:space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-green-600 shadow-md shadow-gray-100"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="mt-4 md:mt-auto flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white/50 p-4 md:p-6 overflow-visible md:overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
