import React, { useContext } from 'react';
import { AuthContext } from './context/auth-context'
import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth'

const App = props => {
  const contextVal = useContext(AuthContext)
  console.log(contextVal)
  return <Auth  />;
};

export default App;
