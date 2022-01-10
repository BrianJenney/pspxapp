import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import 'antd/dist/antd.css';

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_OAUTH_DOMAIN}
            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            redirectUri={window.location.origin}
            useRefreshTokens
            cacheLocation="localstorage"
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
