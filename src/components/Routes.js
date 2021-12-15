import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyleConfigContainer } from '../pages/StyleConfig';
import { SignIn } from '../pages/SignIn';

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/configs" element={<StyleConfigContainer />} />
        </Routes>
    );
};

export default PageRoutes;
