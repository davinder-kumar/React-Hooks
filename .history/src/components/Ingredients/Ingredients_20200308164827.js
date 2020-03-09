import React, { useState, useEffect, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = (props) => {
  const [userIngredients, setUserIngredients] = useState([]);
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
  }, [])

  const onFilterHandler= useCallback( ingredients =>{
    setUserIngredients(ingredients)
  },[])


  const addIngredient = (ingredient) => {
    fetch("https://react-hooks-704c6.firebaseio.com/ingredients.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ingredient)
    }).then((response) => {
      return response.json()
    })
      .then((resData) => {
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
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredient} />

      <section>
        <Search onFilterHandler={onFilterHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={() => { }} />
      </section>
    </div>
  );
}

export default Ingredients;
