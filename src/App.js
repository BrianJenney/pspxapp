import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Badge } from 'antd';
import PageRoutes from './components/Routes';
import { LogoutButton } from './components';
import { ConfigContextProvider } from './contexts/ConfigContext';
import { UserContextProvider } from './contexts/UserContext';
import { NavBar } from './components';

const App = () => {
    const isSignInPage = window.location.pathname === '/';
    return (
        <div>
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
        </div>
    );
};

export default App;
