import React, {  useEffect, useCallback, useReducer, useMemo, useState } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';
import ErrorModel from '../../components/UI/ErrorModal'
import useHttp from '../../hooks/useHttp'
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
  const {data, loading, error, sendRequest} = useHttp()
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [state,dsds] = useState(123)
  useEffect(() => {
    console.log("RENDERED [ingredients]", userIngredients)
  });

  


  const onFilterHandler = useCallback(ingredients => {
    dispatch({ type: "SET", ingredients: ingredients })
  }, [])


  const addIngredient = useCallback((ingredient) => {
    sendRequest("https://react-hooks-704c6.firebaseio.com/ingredients.json",
      "POST",
      JSON.stringify(ingredient))
      console.log(data)
      dsds(32)
      console.log(state)
      setTimeout(()=>{
        
        console.log(data)
      },5000)
      // .then((resData) => {
      //   dispatch({ type: "ADD", ingredient: { ...ingredient, id: resData.name } })
      // })
      // .catch((error) => {
      //   SetErrorStatus(error.message)
      // })
  }, [sendRequest,data,state])

  const removeItem = useCallback(ingID => {
    // SetLoadingStatus(true);
    // fetch("https://react-hooks-704c6.firebaseio.com/ingredients/" + ingID + '.json', {
    //   method: "DELETE",
    // }).then((response) => {
    //   SetLoadingStatus(false);
    //   dispatch({ type: "DELETE", id: ingID })
    // })
  }, [])

  const closeModal = () => {
    // SetErrorStatus(false);
    // SetLoadingStatus(false);

  }
  const errorModel = useMemo(() => {
    return error && <ErrorModel onClose={closeModal} >{error}</ErrorModel>
  }, [error])

  const IngList = useMemo(() => {
    return <IngredientList ingredients={userIngredients} onRemoveItem={removeItem} />
  }, [userIngredients, removeItem])
  return (
    <div className="App">
      <IngredientForm isLoading={loading} onAddIngredient={addIngredient} />
      {errorModel}
      <section>
        <Search onFilterHandler={onFilterHandler} />
        {IngList}
      </section>
    </div>
  );
}

export default Ingredients;
