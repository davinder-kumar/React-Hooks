import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = () => {
  const addIngredient = (ingredient) => {
    setUserIngredients((prevState) => {
      console.log(prevState, ingredient)
      return [
        ...prevState,
        {
          id: Math.random().toString(),
          ...ingredient
        }
      ]

    })
  }
  const [userIngredients, setUserIngredients] = useState([]);
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredient} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
