import Loading from '@/components/Loading';
import useUserRole from '@/Hooks/useUserRole';
import React from 'react';
import CustomerDashboardHome from './customerDashboardHome';
import AgentDashboardHome from './AgentDashboardHome';
import AdminDashboardHome from './AdminDashboardHome';

const DashboardHome = () => {

    const { role, roleLoading } = useUserRole();

    if(roleLoading){
        return <Loading></Loading>
    }

    if(role === 'customer'){
        return <CustomerDashboardHome></CustomerDashboardHome>
    }

    if(role === 'agent'){
        return <AgentDashboardHome></AgentDashboardHome>
    }

    if(role === 'admin'){
        return <AdminDashboardHome></AdminDashboardHome>
    }
};

export default DashboardHome;