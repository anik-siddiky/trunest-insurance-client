import Loading from '@/components/Loading';
import useAuth from '@/Hooks/useAuth';
import React from 'react';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/signin" state={location.pathname}></Navigate>
};

export default PrivateRoute;