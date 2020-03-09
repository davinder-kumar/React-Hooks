import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [inputValue, setInputValue] = useState('')
  const { onFilterHandler } = props
  useEffect(() => {

    setTimeout(() =>{

    },1000)

    const prop = inputValue === '' ? '' : `?orderBy="title"&equalTo="${inputValue}"`
    const ingredientsData = []
    fetch("https://react-hooks-704c6.firebaseio.com/ingredients.json" + prop)
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
        onFilterHandler(ingredientsData)
      })

  }, [inputValue, onFilterHandler])
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
