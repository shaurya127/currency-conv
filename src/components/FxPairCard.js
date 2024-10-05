import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FxPairCard = ({ card, onDelete, onRefresh, onSwap, onUpdate }) => {
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(card.rate);

  useEffect(() => {
    setToAmount((fromAmount * card.rate).toFixed(4));
  }, [fromAmount, card.rate]);

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
    setToAmount((value * card.rate).toFixed(4));
  };

  const handleToAmountChange = (value) => {
    setToAmount(value);
    setFromAmount((value / card.rate).toFixed(4));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white relative">
        <button onClick={onDelete} className="absolute top-2 right-2 text-white hover:text-red-200 transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{card.fromCurrency}</span>
          <button onClick={onSwap} className="text-white hover:text-blue-200 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          <span className="text-2xl font-bold">{card.toCurrency}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4 text-center">
          <span className="text-3xl font-bold text-blue-800">
            {card.rate ? card.rate.toFixed(4) : 'Loading...'}
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(parseFloat(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-gray-600 font-medium">{card.fromCurrency}</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={toAmount}
              onChange={(e) => handleToAmountChange(parseFloat(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-gray-600 font-medium">{card.toCurrency}</span>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500 flex justify-between">
          <span>Created: {card.created.toLocaleString()}</span>
          <span>Updated: {card.lastUpdated.toLocaleString()}</span>
        </div>
        <button
          onClick={onRefresh}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Refresh
        </button>
      </div>
    </motion.div>
  );
};

export default FxPairCard;