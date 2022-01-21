import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Badge } from 'antd';
import PageRoutes from './components/Routes';
import { ConfigContextProvider } from './contexts/ConfigContext';
import { UserContextProvider } from './contexts/UserContext';
import { NavBar } from './components';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);
const App = () => {
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
                    </ConfigContextProvider>
                </UserContextProvider>
            </Elements>
        </div>
    );
};

export default App;
