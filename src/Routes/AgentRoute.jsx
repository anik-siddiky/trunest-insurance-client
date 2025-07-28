import Loading from '@/components/Loading';
import useAuth from '@/Hooks/useAuth';
import useUserRole from '@/Hooks/useUserRole';
import React from 'react';
import { Navigate } from 'react-router';

const AgentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading />;
    }

    if (!user || role !== 'agent') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
    }

    return children;
};

export default AgentRoute;
