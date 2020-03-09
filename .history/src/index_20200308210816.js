import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import authContextProvider from './context/auth-context'

ReactDOM.render(
<authContextProvider>
<App />
</authContextProvider>
, document.getElementById('root'));
