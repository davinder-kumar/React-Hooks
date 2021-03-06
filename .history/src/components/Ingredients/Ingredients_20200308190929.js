import React, { useState, useEffect, useCallback, useReducer } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';
import ErrorModel from '../../components/UI/ErrorModal'
// import Spinner from '../../components/UI/LoadingIndicator'


const ingredientReducer = (ingredients, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...ingredients,
        action.ingredient
      ]
    case "SET":
      return action.ingredients
    case "DELETE":
      return ingredients.filter(ing => ing.id !== action.id)
    default:
      throw ("Please pass a valid action")

  }
}

const Ingredients = (props) => {
  // const [userIngredients, setUserIngredients] = useState([]);
  const [userIngredients, dispatch] = useReducer(ingredientReducer,[])
  const [isLoading, SetLoadingStatus] = useState(false)
  const [isError, SetErrorStatus] = useState(false)
  useEffect(() => {
    console.log("RENDERED [ingredients]", userIngredients)
  });


  const onFilterHandler = useCallback(ingredients => {
    // setUserIngredients(ingredients)
    dispatch({type: "SET", ingredients:ingredients})
  }, [])


  const addIngredient = (ingredient) => {
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
        dispatch({type: "ADD", ingredient:ingredient})
      })
      .catch((error) => {
        SetErrorStatus(error.message)
      })
  }

  const removeItem = ingID => {
    SetLoadingStatus(true);
    fetch("https://react-hooks-704c6.firebaseio.com/ingredients/" + ingID + '.j   son', {
      method: "DELETE",
    }).then((response) => {
      SetLoadingStatus(false);
      const Ings = userIngredients.filter((item) => {
        return item.id !== ingID
      })
      dispatch({type:"DELETE",id:ingID})
      setUserIngredients(Ings)
    })
  }

  const closeModal = () => {
    SetErrorStatus(false);
    SetLoadingStatus(false);

  }
  return (
    <div className="App">
      <IngredientForm isLoading={isLoading} onAddIngredient={addIngredient} />
      {isError && <ErrorModel onClose={closeModal} >{isError}</ErrorModel>}
      <section>
        <Search onFilterHandler={onFilterHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeItem} />
      </section>
    </div>
  );
}

export default Ingredients;
