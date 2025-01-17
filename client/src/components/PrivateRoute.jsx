import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import React from 'react'

const PrivateRoute = () => {
    const { currentUser } = useSelector(state => state.user);
    return currentUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

export default PrivateRoute
