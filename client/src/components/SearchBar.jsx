import { Paper, ToggleButton, ToggleButtonGroup, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchType, setSearchType] = useState('rent');
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch({ type: searchType, query });
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2 }}>
      <ToggleButtonGroup
        value={searchType}
        exclusive
        onChange={(e, value) => setSearchType(value)}
        sx={{ width: '100%' }}
      >
        <ToggleButton value="rent" sx={{ width: '50%' }}>
          Rent
        </ToggleButton>
        <ToggleButton value="buy" sx={{ width: '50%' }}>
          Buy
        </ToggleButton>
      </ToggleButtonGroup>
      <TextField
        fullWidth
        placeholder="Type in a city, address, or ZIP code"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        InputProps={{
          endAdornment: (
            <Search onClick={handleSearch} sx={{ cursor: 'pointer' }} />
          )
        }}
        sx={{ p: 2 }}
      />
    </Paper>
  );
};

export default SearchBar;