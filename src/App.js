import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyleConfigContainer } from './pages/StyleConfig';
import { SignIn } from './pages/SignIn';
import { ConfigContextProvider } from './contexts/ConfigContext';
import { Auth0Provider } from '@auth0/auth0-react';

const App = () => {
    return (
        <div>
            <Auth0Provider
                domain={process.env.OAUTH_DOMAIN}
                clientId={process.env.OAUTH_CLIENT_ID}
                redirectUri={window.location.origin}
            >
                <ConfigContextProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<SignIn />} />
                            <Route
                                path="/configs"
                                element={<StyleConfigContainer />}
                            />
                        </Routes>
                    </Router>
                </ConfigContextProvider>
            </Auth0Provider>
        </div>
    );
};

export default App;
