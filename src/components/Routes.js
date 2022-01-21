import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyleConfigContainer } from '../pages/StyleConfig';
import { AccountInfoContainer } from '../pages/AccountInfo';
import { SignIn } from '../pages/SignIn';
import { LogoutButton } from '../components';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PageRoutes = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    const [isSignInPage, setIsSignInPage] = useState(true);

    let path = window.location.pathname;

    useEffect(() => {
        if (path === '/') {
            setIsSignInPage(true);
        } else {
            setIsSignInPage(false);
        }
    }, [path]);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/');
        }
    }, [isAuthenticated, isLoading, navigate]);

    return (
        <>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/configs" element={<StyleConfigContainer />} />
                <Route path="/account" element={<AccountInfoContainer />} />
            </Routes>
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
