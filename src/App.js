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

const stripePromise = loadStripe(
    'pk_test_51JcVgwJRPNNdaytq72fJ1d3Pz9O3cPAONkDEAs09gAM7S5KXPHOgHNdpckgkAeH5qXwbkJABjG81ZX669ekuqnI800yr8fv97I'
);
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
                                    width: '100%',
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
