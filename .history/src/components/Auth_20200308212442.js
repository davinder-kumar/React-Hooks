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

  // <AuthContext.Consumer>
    
    // </AuthContext.Consumer>
  return (
    // <AuthContext.Consumer>
    
    // </AuthContext.Consumer>
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
