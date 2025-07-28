import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '@/Hooks/useAuth';
import useUserRole from '@/Hooks/useUserRole';
import Loading from '@/components/Loading';

const CustomerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading />;
    }

    if (!user || role !== 'customer') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
    }

    return children;
};

export default CustomerRoute;
