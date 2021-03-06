import React, { useState } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = () => {
  const addIngredient = (ingredient) => {
    fetch("https://react-hooks-704c6.firebaseio.com/",{
      method: "POST",
      headers : "application/json",
      body : JSON.stringify(ingredient)
    }).then(response){
      
    }
    setUserIngredients((prevState) => {
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
