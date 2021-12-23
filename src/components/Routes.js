import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyleConfigContainer } from '../pages/StyleConfig';
import { AccountInfoContainer } from '../pages/AccountInfo';
import { SignIn } from '../pages/SignIn';

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/configs" element={<StyleConfigContainer />} />
            <Route path="/account" element={<AccountInfoContainer />} />
        </Routes>
    );
};

export default PageRoutes;
