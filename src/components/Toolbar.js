// src/components/Toolbar.js
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
    <div className="toolbar">
      <div>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="select"
        >
          <option value="">From CURRENCY</option>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="select"
        >
          <option value="">To CURRENCY</option>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button
          onClick={handleAddCard}
          className="button button-primary"
        >
          ADD CARD
        </button>
      </div>
      <button
        onClick={onDeleteAllCards}
        className="button button-danger"
      >
        DELETE ALL CARDS
      </button>
    </div>
  );
};

export default Toolbar;