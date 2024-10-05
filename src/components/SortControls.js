import React from 'react';

const SortControls = ({ sortCriteria, sortDirection, onSort }) => {
  const renderSortIcon = (criteria) => {
    if (sortCriteria === criteria) {
      return sortDirection === 'asc' ? '↑' : '↓';
    }
    return '↕';
  };

  const buttonClass = (criteria) =>
    `px-4 py-2 rounded-md transition duration-300 ease-in-out ${
      sortCriteria === criteria
        ? 'bg-blue-500 text-white shadow-md'
        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    }`;

  return (
    <div className="flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0">
      <button
        onClick={() => onSort('created')}
        className={buttonClass('created')}
      >
        Created {renderSortIcon('created')}
      </button>
      <button
        onClick={() => onSort('rate')}
        className={buttonClass('rate')}
      >
        FX Rate {renderSortIcon('rate')}
      </button>
      <button
        onClick={() => onSort('lastUpdated')}
        className={buttonClass('lastUpdated')}
      >
        Last Updated {renderSortIcon('lastUpdated')}
      </button>
    </div>
  );
};

export default SortControls;