import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa";
import Loading from "@/components/Loading";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, } from "@/components/ui/alert-dialog";

const ManageUsers = () => {
    const axios = useAxios();
    const queryClient = useQueryClient();

    const [userToDelete, setUserToDelete] = useState(null);

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("/users");
            return res.data;
        },
    });

    const { mutate: updateRole } = useMutation({
        mutationFn: async ({ id, role }) => {
            const res = await axios.patch(`/users/${id}`, { role });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            toast.success("User role updated");
        },
        onError: () => {
            toast.error("Failed to update role");
        },
    });

    const {
        mutate: deleteUser,
        isLoading: isDeleting,
    } = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            toast.success("User deleted");
            setUserToDelete(null);
        },
        onError: () => {
            toast.error("Failed to delete user");
        },
    });

    const handleConfirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete._id);
        }
    };

    return (
        <div className="p-4 lg:p-6">
            <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="overflow-x-auto border rounded-md dark:border-[#171717] hidden lg:block">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-3">Photo</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Registered</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y dark:divide-[#171717]">
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-gray-50 dark:hover:bg-[#1717176b] transition"
                                    >
                                        <td className="px-4 py-2"><img className="w-12 rounded-full" src={user.photoURL} alt="" /></td>
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-3">
                                            {format(new Date(user.registrationDate), "PPpp")}
                                        </td>
                                        <td className="px-4 py-2">
                                            <Select
                                                value={user.role}
                                                onValueChange={(newRole) =>
                                                    updateRole({ id: user._id, role: newRole })
                                                }
                                            >
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="customer">Customer</SelectItem>
                                                    <SelectItem value="agent">Agent</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>

                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => setUserToDelete(user)}
                                                className="inline-flex items-center gap-2 rounded bg-black text-white dark:bg-white dark:text-black px-3 py-1 text-xs shadow-sm hover:bg-red-600 transition cursor-pointer"
                                            >
                                                <FaTrash />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="lg:hidden space-y-4">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="border rounded-md p-4 shadow-sm dark:border-[#171717] dark:bg-[#1f1f1f]"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {user.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    <strong>Registered:</strong>{" "}
                                    {format(new Date(user.registrationDate), "PPpp")}
                                </p>
                                <div className="my-2">
                                    <p className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                        Role
                                    </p>
                                    <Select
                                        value={user.role}
                                        onValueChange={(newRole) =>
                                            updateRole({ id: user._id, role: newRole })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="customer">Customer</SelectItem>
                                            <SelectItem value="agent">Agent</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex justify-end mt-3">
                                    <button
                                        onClick={() => setUserToDelete(user)}
                                        className="inline-flex items-center gap-2 rounded bg-black text-white dark:bg-white dark:text-black px-3 py-1 text-xs shadow-sm hover:bg-red-600 transition"
                                    >
                                        <FaTrash />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <AlertDialog
                        open={!!userToDelete}
                        onOpenChange={(open) => {
                            if (!open) setUserToDelete(null);
                        }}
                    >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the
                                    user "{userToDelete?.name}".
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="text-white cursor-pointer"
                                    disabled={isDeleting}
                                    onClick={handleConfirmDelete}>
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </div>
    );
};

export default ManageUsers;
