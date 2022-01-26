import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyleConfigContainer } from '../pages/StyleConfig';
import { AccountInfoContainer } from '../pages/AccountInfo';
import { SignIn } from '../pages/SignIn';
import { Docs } from '../pages/Docs';
import { LogoutButton } from '../components';
import { Loader } from '../components';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <Loader />;
    if (!isLoading && !isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

const PageRoutes = () => {
    const [isSignInPage, setIsSignInPage] = useState(true);

    const { pathname } = useLocation();

    useEffect(() => {
        console.log(pathname);
        if (pathname === '/') {
            setIsSignInPage(true);
        } else {
            setIsSignInPage(false);
        }
    }, [pathname]);

    return (
        <>
            <div style={{ minHeight: '500px' }}>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route
                        path="/configs"
                        element={
                            <ProtectedRoute>
                                <StyleConfigContainer />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/account"
                        element={
                            <ProtectedRoute>
                                <AccountInfoContainer />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/docs" element={<Docs />} />
                </Routes>
            </div>
            {!isSignInPage && (
                <footer
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: '1em',
                        marginTop: '1em',
                    }}
                >
                    <LogoutButton />
                </footer>
            )}
        </>
    );
};

export default PageRoutes;
