import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Badge } from 'antd';
import PageRoutes from './components/Routes';
import LogoutButton from './components/LogoutButton';
import { ConfigContextProvider } from './contexts/ConfigContext';
import { UserContextProvider } from './contexts/UserContext';

const App = () => {
    const isSignInPage = window.location.pathname === '/';
    return (
        <div>
            <ConfigContextProvider>
                <UserContextProvider>
                    <Badge.Ribbon
                        style={{ right: 0 }}
                        placement="end"
                        text="Beta"
                    ></Badge.Ribbon>
                    <Router>{<PageRoutes />}</Router>
                    {!isSignInPage && (
                        <footer
                            style={{
                                width: '100%',
                                position: 'absolute',
                                bottom: 0,
                                backgroundColor: 'rgb(38, 38, 38)',
                                display: 'flex',
                                flexDirection: 'row',
                                padding: '1em',
                                marginTop: '1em',
                            }}
                        >
                            <LogoutButton />
                        </footer>
                    )}
                </UserContextProvider>
            </ConfigContextProvider>
        </div>
    );
};

export default App;
