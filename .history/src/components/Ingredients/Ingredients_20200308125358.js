import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

function Ingredients() {
  const [userIngredients,setUserIngredients] = useState([]);
  return (
    <div className="App">
      <IngredientForm />

      <section>
        <Search />
        <IngredientList Ingredients={userIngredients} />
      </section>
    </div>
  );
}

export default Ingredients;
