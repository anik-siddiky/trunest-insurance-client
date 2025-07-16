import DashboardHome from "@/Dashboard/Home/DashboardHome";
import ManagePolicies from "@/Dashboard/ManagePolicies/ManagePolicies";
import DashboardLayout from "@/Layouts/DashboardLayout";
import ErrorLayout from "@/Layouts/ErrorLayout";
import MainLayout from "@/Layouts/MainLayout";
import AllPolicies from "@/Pages/AllPolicies";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home/Home";
import SignIn from "@/Pages/SignIn";
import SignUp from "@/Pages/SignUp";
import PrivateRoute from "@/Routes/PrivateRoute";
import { createBrowserRouter, Navigate } from "react-router";


const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                index: true,
                element: <Home></Home>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: 'signin',
                element: <SignIn></SignIn>
            },
            {
                path: 'all-policies',
                element: <PrivateRoute><AllPolicies></AllPolicies></PrivateRoute>
            }
        ]
    },

    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard/home" replace />
            },
            {
                path: "home",
                element: <DashboardHome></DashboardHome>
            },
            {
                path: 'manage-policies',
                element: <ManagePolicies></ManagePolicies>
            }
        ]
    },




    {
        path: "*",
        element: <ErrorLayout></ErrorLayout>,
        children: [
            {
                path: "*",
                element: <ErrorPage></ErrorPage>
            }
        ]
    }
])

export default Router