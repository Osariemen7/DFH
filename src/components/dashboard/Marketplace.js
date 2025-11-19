"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Clock, ShoppingCart, MapPin, Truck, Star } from "lucide-react";

const initialData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  price: 1450 + Math.random() * 100 - 50,
}));

const suppliers = [
  { id: 1, name: "Fidson Healthcare", price: 1450, location: "Ikeja, Lagos", distance: 5.2, delivery: 1500, rating: 4.8, filled: 1240, lastDelivery: "2h ago" },
  { id: 2, name: "Emzor Pharma", price: 1480, location: "Isolo, Lagos", distance: 12.5, delivery: 2500, rating: 4.6, filled: 850, lastDelivery: "1d ago" },
  { id: 3, name: "May & Baker", price: 1520, location: "Ota, Ogun", distance: 28.0, delivery: 4500, rating: 4.9, filled: 2100, lastDelivery: "4h ago" },
];

export default function Marketplace() {
  const [data, setData] = useState(initialData);
  const [currentPrice, setCurrentPrice] = useState(1450);
  const [trend, setTrend] = useState("up");
  const [timeframe, setTimeframe] = useState("24H");

  // Simulate live market data
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const lastPrice = prev[prev.length - 1].price;
        const newPrice = lastPrice + (Math.random() * 20 - 10);
        const newData = [...prev.slice(1), { time: prev[prev.length - 1].time, price: newPrice }];
        
        setCurrentPrice(newPrice);
        setTrend(newPrice > lastPrice ? "up" : "down");
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-gray-900">Coartem 80/480</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">TABLETS</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Artemether/Lumefantrine • 6 Tablets</p>
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
                        
                        <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-gray-500">Delivery</p>
                                <p className="font-bold text-gray-900">₦{supplier.delivery.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">₦{supplier.price.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">per pack</p>
                            </div>
                            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800">
                                Buy
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
