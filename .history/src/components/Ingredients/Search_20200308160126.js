import React, { useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {

  },[inputValue])
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
