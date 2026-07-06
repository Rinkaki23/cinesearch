import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, initialValue }) => {
  const [input, setInput] = useState(initialValue);

  useEffect(() => {
    setInput(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center mb-4">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search movies..."
        className="input"
      />
      <button type="submit" className="btn btn-error text-white">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
