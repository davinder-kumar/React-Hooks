import React, { useState, useEffect, useCallback, useReducer, useMemo } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';
import ErrorModel from '../../components/UI/ErrorModal'
// import Spinner from '../../components/UI/LoadingIndicator'


const ingredientReducer = (ingredients, action) => {
  switch (action.type) {
    case "ADD":
      // console.log(ingredients, action.ingredient,"FITSTs")
      const state = [
        ...ingredients,
        action.ingredient
      ]
      // console.log(state,"KAST")
      return state
    case "SET":
      return action.ingredients
    case "DELETE":
      return ingredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error("Please pass a valid action")

  }
}

const Ingredients = (props) => {
  // const [userIngredients, setUserIngredients] = useState([]);
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [isLoading, SetLoadingStatus] = useState(false)
  const [isError, SetErrorStatus] = useState(false)
  useEffect(() => {
    console.log("RENDERED [ingredients]", userIngredients)
  });

  const testUpdate = () => {
    // alert()
    SetLoadingStatus(true);
    SetErrorStatus(true);
  }


  const onFilterHandler = useCallback(ingredients => {
    // setUserIngredients(ingredients)
    dispatch({ type: "SET", ingredients: ingredients })
  }, [])


  const addIngredient = useCallback((ingredient) => {
    SetLoadingStatus(true);
    fetch("https://react-hooks-704c6.firebaseio.com/ingredients.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ingredient)
    })
      .then((response) => {
        SetLoadingStatus(false);
        return response.json()
      })
      .then((resData) => {
        dispatch({ type: "ADD", ingredient: { ...ingredient, id: resData.name } })
      })
      .catch((error) => {
        SetErrorStatus(error.message)
      })
  }, [])

  const removeItem = useCallback(ingID => {
    SetLoadingStatus(true);
    fetch("https://react-hooks-704c6.firebaseio.com/ingredients/" + ingID + '.json', {
      method: "DELETE",
    }).then((response) => {
      SetLoadingStatus(false);
      dispatch({ type: "DELETE", id: ingID })
    })
  }, [])

  const closeModal = () => {
    SetErrorStatus(false);
    SetLoadingStatus(false);

  }
  const errorModel = useMemo(() => {
    return isError && <ErrorModel onClose={closeModal} >{isError}</ErrorModel>
  }, [isError])

  const IngList = useMemo(() => {
    return <IngredientList ingredients={userIngredients} onRemoveItem={removeItem} />
  }, [userIngredients,removeItem])
  return (
    <div className="App">
      <IngredientForm isLoading={isLoading} onAddIngredient={addIngredient} />
      {errorModel}
      <section>
        <Search onFilterHandler={onFilterHandler} />
        <button onClick={(e) => { e.preventDefault(); testUpdate() }} >TEST</button>
        {IngList}
      </section>
    </div>
  );
}

export default Ingredients;
