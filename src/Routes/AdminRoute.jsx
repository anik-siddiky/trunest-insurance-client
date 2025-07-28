import Loading from '@/components/Loading';
import useAuth from '@/Hooks/useAuth';
import useUserRole from '@/Hooks/useUserRole';
import React from 'react';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;