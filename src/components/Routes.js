import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyleConfigContainer } from '../pages/StyleConfig';
import { AccountInfoContainer } from '../pages/AccountInfo';
import { SignIn } from '../pages/SignIn';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PageRoutes = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/');
        }
    }, [isAuthenticated, isLoading, navigate]);

    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/configs" element={<StyleConfigContainer />} />
            <Route path="/account" element={<AccountInfoContainer />} />
        </Routes>
    );
};

export default PageRoutes;
