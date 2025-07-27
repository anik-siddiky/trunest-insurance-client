import useAuth from './useAuth';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axios = useAxios();

    const { data: role = 'customer', isLoading: roleLoading, refetch } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/users/${user.email}/role`);
            return res.data.role;
        },
    });

    return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;