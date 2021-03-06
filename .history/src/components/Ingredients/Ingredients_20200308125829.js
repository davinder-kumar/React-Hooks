import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = () => {
  const addIngredient = (ingredient) => {
    setUserIngredients([
      
    ])
  }
  const [userIngredients, setUserIngredients] = useState([]);
  return (
    <div className="App">
      <IngredientForm />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} />
      </section>
    </div>
  );
}

export default Ingredients;
