"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Package, TrendingUp, Wallet, LogOut, Menu, X } from "lucide-react";
import Overview from "./dashboard/Overview";
import Inventory from "./dashboard/Inventory";
import Marketplace from "./dashboard/Marketplace";
import Financing from "./dashboard/Financing";

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [marginRatio, setMarginRatio] = useState(0.3); // Default 30% equity contribution
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shared financial data
  const linkedAccounts = [
    { id: "zenith", bank: "Zenith Bank", account: "**** 4521", balance: 2450000, inflow: 12500000, averageBalance: 1800000 },
    { id: "gtb", bank: "GTBank", account: "**** 8892", balance: 850000, inflow: 4200000, averageBalance: 650000 },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory & Sales", icon: Package },
    { id: "marketplace", label: "Marketplace", icon: TrendingUp },
    { id: "financing", label: "Inventory Finance", icon: Wallet },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <Overview setActiveTab={setActiveTab} />;
      case "inventory": return <Inventory setActiveTab={setActiveTab} setSelectedProduct={setSelectedProduct} />;
      case "marketplace": return <Marketplace selectedProduct={selectedProduct} linkedAccounts={linkedAccounts} marginRatio={marginRatio} />;
      case "financing": return <Financing linkedAccounts={linkedAccounts} marginRatio={marginRatio} setMarginRatio={setMarginRatio} />;
      default: return <Overview />;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center z-30 shrink-0">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-green-600/20">
                D
            </div>
            <div>
                <h2 className="font-bold text-gray-800 text-sm">DFH Terminal</h2>
            </div>
         </div>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
            />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 p-6 flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-green-600/20">
            D
          </div>
          <div>
            <h2 className="font-bold text-gray-800">DFH Terminal</h2>
            <p className="text-xs text-gray-500">Pro Edition</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-green-50 text-green-600 shadow-sm border border-green-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50 p-4 md:p-8 overflow-y-auto relative w-full">
        <div className="max-w-7xl mx-auto h-full">
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
    </div>
  );
}
