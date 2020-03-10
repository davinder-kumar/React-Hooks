import React, { useEffect, useCallback, useReducer, useMemo } from 'react';
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
  const { data, loading, error, sendRequest, actionName,extraData } = useHttp()
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  useEffect(() => {
    if (actionName === 'ADD')
      dispatch({ type: "ADD", ingredient: data })
    else if (actionName === 'DELETE')
      dispatch({ type: "DELETE", id: extraData })
  }, [data, actionName,extraData]);




  const onFilterHandler = useCallback(ingredients => {
    dispatch({ type: "SET", ingredients: ingredients })
  }, [])


  const addIngredient = useCallback((ingredient) => {
    sendRequest("https://react-hooks-704c6.firebaseio.com/ingredients.json",
      "POST",
      ingredient,
      "ADD",
      ingredient
    )
  }, [sendRequest])

  const removeItem = useCallback(ingID => {
    sendRequest("https://react-hooks-704c6.firebaseio.com/ingredients/" + ingID + '.json',
      "DELETE",
      null,
      "DELETE",
      ingID
    )
  }, [sendRequest])

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
      {/* <button onClick={doTest}>Do Test</button> */}
      {errorModel}
      <section>
        <Search onFilterHandler={onFilterHandler} />
        {IngList}
      </section>
    </div>
  );
}

export default Ingredients;
