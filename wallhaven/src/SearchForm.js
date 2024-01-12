import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [sorting, setSorting] = useState('relevance');
  const [order, setOrder] = useState('desc');
  const [resolution, setResolution] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, sorting, order, resolution });
  };

  return (
    <form className="p-3 border rounded" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search wallpapers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <select className="form-select" value={sorting} onChange={(e) => setSorting(e.target.value)}>
          <option value="relevance">Relevance</option>
          <option value="date_added">Date Added</option>
        </select>
      </div>
      <div className="mb-3">
        <select className="form-select" value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter resolution (optional)"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchForm;
