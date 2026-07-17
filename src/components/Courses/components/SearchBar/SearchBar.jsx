import React, { useState } from 'react';

import { Input } from '../../../../common/Input/Input';
import { Button } from '../../../../common/Button/Button';
import { BUTTON_TEXTS, PLACEHOLDER_TEXTS } from '../../../../constants';

import './searchBar.css';

export const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val === '') {
      onSearch('');
    }
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };

  return (
    <div className='search-bar-container'>
      <div className='search-input-wrapper'>
        <Input
          placeholderText={PLACEHOLDER_TEXTS.SEARCH}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <Button buttonText={BUTTON_TEXTS.SEARCH} onClick={handleSearchSubmit} />
    </div>
  );
};