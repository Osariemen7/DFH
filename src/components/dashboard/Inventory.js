"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, FileText, CheckCircle, Loader2, Plus } from "lucide-react";

export default function Inventory() {
  const [mode, setMode] = useState("list"); // list | manual | upload | scan
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setMode("list");
      }, 2000);
    }, 2500);
  };

  const InventoryList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Inventory & Sales</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setMode("manual")}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800"
          >
            <Plus className="w-4 h-4" /> Record Sale
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          onClick={() => setMode("upload")}
          className="p-4 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-green-500 hover:bg-green-50 transition-colors"
        >
          <Upload className="w-6 h-6" />
          <span className="text-xs font-medium">Upload Excel/CSV</span>
        </button>
        <button 
          onClick={() => setMode("scan")}
          className="p-4 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-green-500 hover:bg-green-50 transition-colors"
        >
          <Camera className="w-6 h-6" />
          <span className="text-xs font-medium">Scan Logbook</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[500px]">
          <thead className="bg-gray-50 text-gray-500 font-medium">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: "Panadol Extra", stock: 45, status: "Good" },
              { name: "Artemether/Lumefantrine", stock: 5, status: "Low" },
              { name: "Amoxicillin", stock: 120, status: "Good" },
              { name: "Vitamin C", stock: 8, status: "Low" },
            ].map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{item.name}</td>
                <td className="p-4 text-gray-600">{item.stock}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    item.status === "Low" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UploadSimulation = ({ type }) => (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6">
      <AnimatePresence mode="wait">
        {!isProcessing && !showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-sm"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {type === "scan" ? <Camera className="w-10 h-10 text-gray-400" /> : <FileText className="w-10 h-10 text-gray-400" />}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {type === "scan" ? "Upload Logbook Photo" : "Upload Sales Sheet"}
            </h3>
            <p className="text-gray-500 mb-8 text-sm">
              {type === "scan" 
                ? "Take a clear photo of your handwritten sales log. Our AI will digitize it." 
                : "Upload your daily sales CSV or Excel file."}
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setMode("list")}
                className="flex-1 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleProcess}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700"
              >
                {type === "scan" ? "Snap & Process" : "Select File"}
              </button>
            </div>
          </motion.div>
        )}

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
            <p className="font-mono text-green-600 text-sm">
              {type === "scan" ? "ANALYZING HANDWRITING..." : "PARSING DATA..."}
            </p>
            <div className="w-64 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
              <motion.div 
                className="h-full bg-green-600"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5 }}
              />
            </div>
          </motion.div>
        )}

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Inventory Updated!</h3>
            <p className="text-gray-500 text-sm mt-2">14 new sales records added.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="h-full">
      {mode === "list" && <InventoryList />}
      {mode === "manual" && (
        <div className="p-4">
            <h3 className="font-bold mb-4">Manual Entry</h3>
            <p className="text-sm text-gray-500 mb-4">Enter product details manually.</p>
            <button onClick={() => setMode("list")} className="text-sm text-blue-600">Back to list</button>
            {/* Placeholder for manual form */}
        </div>
      )}
      {mode === "upload" && <UploadSimulation type="upload" />}
      {mode === "scan" && <UploadSimulation type="scan" />}
    </div>
  );
}
