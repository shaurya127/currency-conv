// src/App.js
import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import SortControls from './components/SortControls';
import FxPairCard from './components/FxPairCard';
import './index.css';

const API_KEY = "fca_live_mUfh69l80rvj90pW9Jr48OOvMtQ8IR4TZSnlHkVN";
const API_BASE_URL = 'https://api.freecurrencyapi.com/v1';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [cards, setCards] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('created');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/currencies?apikey=${API_KEY}`);
      const data = await response.json();
      setCurrencies(Object.keys(data.data));
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const addCard = (fromCurrency, toCurrency) => {
    const newCard = {
      id: Date.now(),
      fromCurrency,
      toCurrency,
      rate: null,
      created: new Date(),
      lastUpdated: null,
      isLoading: false,
    };
    setCards(prevCards => [...prevCards, newCard]);
    fetchExchangeRate(newCard.id);
  };

  const fetchExchangeRate = async (cardId) => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;

    setCards(prevCards => prevCards.map(c => 
      c.id === cardId ? { ...c, isLoading: true } : c
    ));

    try {
      const response = await fetch(`${API_BASE_URL}/latest?apikey=${API_KEY}&base_currency=${card.fromCurrency}&currencies=${card.toCurrency}`);
      const data = await response.json();
      const rate = data.data[card.toCurrency];
      
      setCards(prevCards => prevCards.map(c => 
        c.id === cardId ? { ...c, rate, lastUpdated: new Date(), isLoading: false } : c
      ));
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      setCards(prevCards => prevCards.map(c => 
        c.id === cardId ? { ...c, isLoading: false } : c
      ));
    }
  };

  const deleteCard = (id) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  const deleteAllCards = () => {
    setCards([]);
  };

  const sortCards = (criteria) => {
    if (criteria === sortCriteria) {
      setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortDirection('asc');
    }
  };

  const getSortedCards = () => {
    return [...cards].sort((a, b) => {
      let aValue, bValue;
      switch (sortCriteria) {
        case 'created':
          aValue = a.created;
          bValue = b.created;
          break;
        case 'rate':
          aValue = a.rate;
          bValue = b.rate;
          break;
        case 'lastUpdated':
          aValue = a.lastUpdated;
          bValue = b.lastUpdated;
          break;
        default:
          return 0;
      }
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  return (
    <div className="container">
      <Toolbar
        currencies={currencies}
        onAddCard={addCard}
        onDeleteAllCards={deleteAllCards}
      />
      <SortControls
        sortCriteria={sortCriteria}
        sortDirection={sortDirection}
        onSort={sortCards}
      />
      <div className="card-grid">
        {getSortedCards().map(card => (
          <FxPairCard
            key={card.id}
            card={card}
            onDelete={() => deleteCard(card.id)}
            onRefresh={() => fetchExchangeRate(card.id)}
            onSwap={() => {
              const swappedCard = {
                ...card,
                fromCurrency: card.toCurrency,
                toCurrency: card.fromCurrency,
                rate: card.rate ? 1 / card.rate : null,
                lastUpdated: null,
              };
              setCards(prevCards => prevCards.map(c => 
                c.id === card.id ? swappedCard : c
              ));
              fetchExchangeRate(card.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;