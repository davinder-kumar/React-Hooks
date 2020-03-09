import React, { useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    const ingredientsData = []
    fetch("https://react-hooks-704c6.firebaseio.com/ingredients.json")
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        for (let i in responseData) {
          ingredientsData.push({
            id: i,
            title: responseData[i].title,
            amount: responseData[i].amount
          })
        }
        setUserIngredients(ingredientsData)
      })

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
