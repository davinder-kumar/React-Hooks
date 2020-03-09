import React, { useState, useEffect } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = () => {
  useEffect(() => {
  })

  fetch("https://react-hooks-704c6.firebaseio.com/ingredients.json")
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      
    })

  const addIngredient = (ingredient) => {
    fetch("https://react-hooks-704c6.firebaseio.com/ingredients.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ingredient)
    }).then((response) => {
      return response.json()
    })
      .then((resData) => {
        console.log(resData)
        setUserIngredients((prevState) => {
          return [
            ...prevState,
            {
              id: resData.name,
              ...ingredient
            }
          ]

        })
      })

  }
  const [userIngredients, setUserIngredients] = useState([]);
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredient} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => { }} />
      </section>
    </div>
  );
}

export default Ingredients;
