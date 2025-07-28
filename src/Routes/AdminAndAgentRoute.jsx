import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '@/Hooks/useAuth';
import useUserRole from '@/Hooks/useUserRole';
import Loading from '@/components/Loading';

const AdminAndAgentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading />;
    }

    const isAuthorized = role === 'admin' || role === 'agent';

    if (!user || !isAuthorized) {
        return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
    }

    return children;
};

export default AdminAndAgentRoute;
