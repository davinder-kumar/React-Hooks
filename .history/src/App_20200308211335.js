import React, { useContext } from 'react';
import { context } from './context/auth-context'
import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth'

const App = props => {
  const contextVal = useContext(context)
  return <Auth  />;
};

export default App;
