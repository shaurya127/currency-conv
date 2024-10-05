// src/components/SortControls.js
import React from 'react';

const SortControls = ({ sortCriteria, sortDirection, onSort }) => {
  const renderSortIcon = (criteria) => {
    if (sortCriteria === criteria) {
      return sortDirection === 'asc' ? '▲' : '▼';
    }
    return '▲▼';
  };

  return (
    <div className="sort-controls">
      <button
        onClick={() => onSort('created')}
        className={`sort-button ${sortCriteria === 'created' ? 'active' : ''}`}
      >
        SORT BY CREATED {renderSortIcon('created')}
      </button>
      <button
        onClick={() => onSort('rate')}
        className={`sort-button ${sortCriteria === 'rate' ? 'active' : ''}`}
      >
        SORT BY FX RATE {renderSortIcon('rate')}
      </button>
      <button
        onClick={() => onSort('lastUpdated')}
        className={`sort-button ${sortCriteria === 'lastUpdated' ? 'active' : ''}`}
      >
        SORT BY LAST UPDATED {renderSortIcon('lastUpdated')}
      </button>
    </div>
  );
};

export default SortControls;