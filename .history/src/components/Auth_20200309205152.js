import React, { useContext } from 'react';
import { AuthContext } from '../context/auth-context'
import Card from './UI/Card';
import './Auth.css';

const Auth = props => {
  // const contextVal = useContext(AuthContext)

  // console.log(contextVal)


  return (

    <div className="auth">

      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <AuthContext.Consumer>
          {
            (context) => {
              return <button onClick={context.login}>Log In</button>
            }
          }
        </AuthContext.Consumer>

      </Card>
    </div>
  );
};

export default Auth;
