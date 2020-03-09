import React, {useContext} from 'react';
import {AuthContext} from '../context/auth-context'
import Card from './UI/Card';
import './Auth.css';

const Auth = props => {
  const contextVal = useContext(AuthContext)
  
  // console.log(contextVal)
 

  return (
  
    <div className="auth">
        <AuthContext.Consumer>
          {
            (context) => {
              loginHandler = context.login
            }
          }
        </AuthContext.Consumer>
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
