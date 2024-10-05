// src/components/FxPairCard.js
import React, { useState, useEffect } from 'react';

const FxPairCard = ({ card, onDelete, onRefresh, onSwap }) => {
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(card.rate || '');

  useEffect(() => {
    if (card.rate) {
      setToAmount((fromAmount * card.rate).toFixed(6));
    }
  }, [fromAmount, card.rate]);

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
    if (card.rate) {
      setToAmount((value * card.rate).toFixed(6));
    }
  };

  const handleToAmountChange = (value) => {
    setToAmount(value);
    if (card.rate) {
      setFromAmount((value / card.rate).toFixed(6));
    }
  };

  return (
    <div className="fx-pair-card">
      <div className="currency-pair">
        <span className="currency">{card.fromCurrency}</span>
        <button onClick={onSwap} className="action-button">↕</button>
        <span className="currency">{card.toCurrency}</span>
      </div>
      <div className="exchange-rate">
        {card.isLoading ? (
          <span className="loader">Loading...</span>
        ) : (
          card.rate ? card.rate.toFixed(6) : 'N/A'
        )}
      </div>
      <input
        type="number"
        value={fromAmount}
        onChange={(e) => handleFromAmountChange(parseFloat(e.target.value))}
        disabled={card.isLoading}
      />
      <input
        type="number"
        value={toAmount}
        onChange={(e) => handleToAmountChange(parseFloat(e.target.value))}
        disabled={card.isLoading}
      />
      <div className="actions">
        <button onClick={onRefresh} className="action-button" disabled={card.isLoading}>
          {card.isLoading ? '⏳' : '↻'}
        </button>
        <button onClick={onDelete} className="action-button" disabled={card.isLoading}>✕</button>
      </div>
      <div className="last-updated">
        Last updated: {card.lastUpdated ? card.lastUpdated.toLocaleString() : 'Never'}
      </div>
    </div>
  );
};

export default FxPairCard;