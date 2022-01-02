import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Badge } from 'antd';
import PageRoutes from './components/Routes';
import { LogoutButton } from './components';
import { ConfigContextProvider } from './contexts/ConfigContext';
import { UserContextProvider } from './contexts/UserContext';
import { NavBar } from './components';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);
const App = () => {
    const isSignInPage = window.location.pathname === '/';
    return (
        <div>
            <Elements stripe={stripePromise}>
                <UserContextProvider>
                    <ConfigContextProvider>
                        <Badge.Ribbon
                            style={{ right: 0 }}
                            placement="end"
                            text="Beta"
                        ></Badge.Ribbon>
                        <Router>
                            <NavBar />
                            {<PageRoutes />}
                        </Router>
                        {!isSignInPage && (
                            <footer
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    padding: '1em',
                                    marginTop: '1em',
                                }}
                            >
                                <LogoutButton />
                            </footer>
                        )}
                    </ConfigContextProvider>
                </UserContextProvider>
            </Elements>
        </div>
    );
};

export default App;
