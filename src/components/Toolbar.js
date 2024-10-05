import React, { useState } from 'react';

const Toolbar = ({ currencies, onAddCard, onDeleteAllCards }) => {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');

  const handleAddCard = () => {
    if (fromCurrency && toCurrency) {
      onAddCard(fromCurrency, toCurrency);
      setFromCurrency('');
      setToCurrency('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0 w-full md:w-auto">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="border border-blue-300 rounded-md px-3 py-2 bg-blue-50 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">From Currency</option>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border border-blue-300 rounded-md px-3 py-2 bg-blue-50 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">To Currency</option>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button
          onClick={handleAddCard}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          ADD CARD
        </button>
      </div>
      <button
        onClick={onDeleteAllCards}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        DELETE ALL CARDS
      </button>
    </div>
  );
};

export default Toolbar;