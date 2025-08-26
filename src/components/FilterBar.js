import React from 'react';

function FilterBar({ filter, setFilter }) {
  return (
    <div className="btn-group mb-3">
      <button className={`btn btn-outline-secondary ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
      <button className={`btn btn-outline-secondary ${filter === 'Completed' ? 'active' : ''}`} onClick={() => setFilter('Completed')}>Completed</button>
      <button className={`btn btn-outline-secondary ${filter === 'Pending' ? 'active' : ''}`} onClick={() => setFilter('Pending')}>Pending</button>
    </div>
  );
}

export default FilterBar;