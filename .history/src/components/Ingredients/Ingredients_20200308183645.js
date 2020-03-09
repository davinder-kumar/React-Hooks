import React, { useState, useEffect, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';
import Model from '../../components/UI/ErrorModal'
// import Spinner from '../../components/UI/LoadingIndicator'



const Ingredients = (props) => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, SetLoadingStatus] = useState(false)
  useEffect(() => {
    console.log("RENDERED [ingredients]", userIngredients)
  });


  const onFilterHandler = useCallback(ingredients => {
    setUserIngredients(ingredients)
  }, [])


  const addIngredient = (ingredient) => {
    SetLoadingStatus(true);
    fetch("https://react-hooks-704c6.firebaseio.com/ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ingredient)
    })
      .then((response) => {
        SetLoadingStatus(false);
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
      .catch((error) => {
        console.log(error)
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

      setUserIngredients(Ings)
    })


  }
  return (
    <div className="App">
      <IngredientForm isLoading={isLoading} onAddIngredient={addIngredient} />

      <section>
        <Search onFilterHandler={onFilterHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeItem} />
      </section>
    </div>
  );
}

export default Ingredients;
