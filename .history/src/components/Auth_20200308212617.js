import React, {useContext} from 'react';
import {AuthContext} from '../context/auth-context'
import Card from './UI/Card';
import './Auth.css';

const Auth = props => {
  const contextVal = useContext(AuthContext)
  
  // console.log(contextVal)
  const loginHandler = () => {
    contextVal.login()
  };

  return <AuthContext.Consumer>
      (context) => {
        alert()
      }
  </AuthContext.Consumer>
};

export default Auth;
