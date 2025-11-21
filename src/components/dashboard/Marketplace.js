"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Clock, ShoppingCart, MapPin, Truck, Star, CheckCircle, Loader2, X, CreditCard, Building2 } from "lucide-react";

// Buy Modal Component
const BuyModal = ({ isOpen, onClose, product, supplier, linkedAccounts, marginRatio, onConfirm }) => {
  const [quantity, setQuantity] = useState(100); // Default quantity
  const [localMargin, setLocalMargin] = useState(marginRatio ? marginRatio * 100 : 30); // Slider value 20-100

  if (!isOpen || !supplier) return null;

  const totalCost = supplier.price * quantity;
  const equityContribution = totalCost * (localMargin / 100);
  const creditContribution = totalCost - equityContribution;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
      <motion.div 
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
            <h3 className="text-lg font-bold text-gray-900">Complete Purchase</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
            </button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto">
            {/* Order Summary */}
            <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
                    Rx
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">{supplier.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            ₦{supplier.price.toFixed(2)} / unit
                        </span>
                    </div>
                </div>
            </div>

            {/* Quantity Input */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Order Quantity</label>
                <input 
                    type="number" 
                    min="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-lg"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">Min. Order: 10 Units</p>
            </div>

            {/* Payment Split Slider */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-700">Payment Split</label>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {localMargin}% Equity / {100 - localMargin}% Credit
                    </span>
                </div>
                <input 
                    type="range" 
                    min="20" 
                    max="100" 
                    value={localMargin} 
                    onChange={(e) => setLocalMargin(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Min Equity (20%)</span>
                    <span>Full Cash (100%)</span>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-1 text-gray-500">
                        <Building2 className="w-3 h-3" />
                        <span className="text-xs font-bold uppercase">Pay from Bank</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">₦{equityContribution.toLocaleString()}</p>
                </div>
                <div className="p-3 border border-blue-100 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1 text-blue-600">
                        <CreditCard className="w-3 h-3" />
                        <span className="text-xs font-bold uppercase">Financed</span>
                    </div>
                    <p className="text-lg font-bold text-blue-900">₦{creditContribution.toLocaleString()}</p>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-500">Total Cost</span>
                <span className="text-2xl font-bold text-gray-900">₦{totalCost.toLocaleString()}</span>
            </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 shrink-0 pb-8 sm:pb-6">
            <button 
                onClick={() => onConfirm({ quantity, totalCost, equityContribution, creditContribution })}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
                Confirm Purchase <ArrowUpRight className="w-4 h-4" />
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function Marketplace({ selectedProduct, linkedAccounts, marginRatio }) {
  const defaultProduct = { name: "Coartem 80/480", price: 1450 };
  const product = selectedProduct || defaultProduct;
  
  // Generate consistent data based on product price (deterministic, no Math.random during render)
  const generateData = (basePrice) => Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: basePrice + (i % 3) * (basePrice * 0.02) - (basePrice * 0.02),
  }));

  const [data, setData] = useState(() => generateData(product.price));
  const [currentPrice, setCurrentPrice] = useState(product.price);
  const [trend, setTrend] = useState("up");
  const [timeframe, setTimeframe] = useState("24H");
  const [purchasing, setPurchasing] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Modal State
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = (supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = (details) => {
    if (!selectedSupplier) return;
    
    const supplierId = selectedSupplier.id;
    setIsModalOpen(false);
    setPurchasing(supplierId);
    
    // Simulate API call
    setTimeout(() => {
        setPurchasing(null);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  // Update data when product changes
  useEffect(() => {
    const basePrice = product.price;
    setData(generateData(basePrice));
    setCurrentPrice(basePrice);
  }, [product]);

  // Dynamic suppliers based on current price
  const suppliers = [
    { id: 1, name: "Fidson Healthcare", price: currentPrice, location: "Ikeja, Lagos", distance: 5.2, delivery: 1500, rating: 4.8, filled: 1240, lastDelivery: "2h ago" },
    { id: 2, name: "Emzor Pharma", price: currentPrice * 1.02, location: "Isolo, Lagos", distance: 12.5, delivery: 2500, rating: 4.6, filled: 850, lastDelivery: "1d ago" },
    { id: 3, name: "May & Baker", price: currentPrice * 1.05, location: "Ota, Ogun", distance: 28.0, delivery: 4500, rating: 4.9, filled: 2100, lastDelivery: "4h ago" },
  ].sort((a, b) => a.price - b.price);

  // Simulate live market data
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const lastPrice = prev[prev.length - 1].price;
        const newPrice = lastPrice + (Math.random() * (product.price * 0.02) - (product.price * 0.01));
        const newData = [...prev.slice(1), { time: prev[prev.length - 1].time, price: newPrice }];
        
        setCurrentPrice(newPrice);
        setTrend(newPrice > lastPrice ? "up" : "down");
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [product]);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {isModalOpen && (
            <BuyModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
                supplier={selectedSupplier}
                linkedAccounts={linkedAccounts}
                marginRatio={marginRatio}
                onConfirm={handleConfirmPurchase}
            />
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative">
        <AnimatePresence>
            {showSuccess && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
                >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold">Order Placed Successfully!</span>
                </motion.div>
            )}
        </AnimatePresence>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">TABLETS</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Generic • Standard Pack</p>
        </div>
        <div className={`text-right ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
          <div className="text-4xl font-mono font-bold flex items-center justify-end gap-2">
            ₦{currentPrice.toFixed(2)}
            {trend === "up" ? <ArrowUpRight className="w-8 h-8" /> : <ArrowDownRight className="w-8 h-8" />}
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Best Market Price</p>
        </div>
      </header>

      {/* Chart Section */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Price History</h3>
            <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
                {["1H", "24H", "1W", "1M"].map((tf) => (
                    <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`flex-1 sm:flex-none px-3 py-1 text-xs font-bold rounded-md transition-all ${
                            timeframe === tf ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {tf}
                    </button>
                ))}
            </div>
        </div>
        <div className="h-64 md:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#9ca3af'}} 
                    interval={4}
                />
                <YAxis 
                    domain={['auto', 'auto']} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#9ca3af'}} 
                    tickFormatter={(value) => `₦${value}`}
                    width={50}
                />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`₦${value.toFixed(2)}`, "Price"]}
                />
                <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={trend === "up" ? "#16a34a" : "#dc2626"} 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Top Suppliers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Top Supplier Offers</h3>
                <span className="text-xs text-gray-500">Sorted by Best Value</span>
            </div>
            <div className="divide-y divide-gray-100">
                {suppliers.map((supplier, i) => (
                    <div key={supplier.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${i === 0 ? 'bg-green-500' : 'bg-gray-400'}`}>
                                {i + 1}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                    {supplier.name}
                                    {i === 0 && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">BEST PRICE</span>}
                                </h4>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {supplier.location}</span>
                                    <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> {supplier.distance}km</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between w-full md:w-auto gap-6">
                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">₦{supplier.price.toFixed(2)}</p>
                                <p className="text-xs text-gray-400 font-medium">+ ₦{supplier.delivery} Delivery</p>
                            </div>
                            <button 
                                onClick={() => handleBuyClick(supplier)}
                                disabled={purchasing === supplier.id}
                                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] flex justify-center"
                            >
                                {purchasing === supplier.id ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Buy Now"
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Supplier Performance / Stats */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-6">
            <div>
                <h4 className="font-bold text-gray-800 mb-4">Supplier Performance</h4>
                <div className="space-y-4">
                    {suppliers.map((s) => (
                        <div key={s.id} className="bg-white p-3 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-sm text-gray-700">{s.name}</span>
                                <div className="flex items-center gap-1 text-orange-500">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span className="text-xs font-bold">{s.rating}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="bg-gray-50 p-2 rounded-lg">
                                    <span className="block text-gray-400">Orders Filled</span>
                                    <span className="font-bold text-gray-800">{s.filled}</span>
                                </div>
                                <div className="bg-gray-50 p-2 rounded-lg">
                                    <span className="block text-gray-400">Last Delivery</span>
                                    <span className="font-bold text-gray-800">{s.lastDelivery}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
