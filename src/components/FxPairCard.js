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
        <button onClick={onSwap} className="action-button" disabled={card.isLoading}>↕</button>
        <span className="currency">{card.toCurrency}</span>
      </div>
      <div className="exchange-rate">
        {card.isLoading ? (
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <span className="rate">{card.rate ? card.rate.toFixed(6) : 'N/A'}</span>
        )}
      </div>
      <div className="conversion">
        <input
          type="number"
          value={fromAmount}
          onChange={(e) => handleFromAmountChange(parseFloat(e.target.value))}
          disabled={card.isLoading}
        />
        <span>{card.fromCurrency}</span>
      </div>
      <div className="conversion">
        <input
          type="number"
          value={toAmount}
          onChange={(e) => handleToAmountChange(parseFloat(e.target.value))}
          disabled={card.isLoading}
        />
        <span>{card.toCurrency}</span>
      </div>
      <div className="actions">
        <button onClick={onRefresh} className="action-button" disabled={card.isLoading} title="Refresh">
          ↻
        </button>
        <button onClick={onDelete} className="action-button" disabled={card.isLoading} title="Delete">
          ✕
        </button>
      </div>
      <div className="last-updated">
        Last updated: {card.lastUpdated ? card.lastUpdated.toLocaleString() : 'Never'}
      </div>
    </div>
  );
};

export default FxPairCard;