import DashboardHome from "@/Dashboard/Home/DashboardHome";
import ManagePolicies from "@/Dashboard/ManagePolicies/ManagePolicies";
import DashboardLayout from "@/Layouts/DashboardLayout";
import ErrorLayout from "@/Layouts/ErrorLayout";
import MainLayout from "@/Layouts/MainLayout";
import AllPolicies from "@/Pages/All Policies/AllPolicies";
import ErrorPage from "@/Pages/Error/ErrorPage";
import Home from "@/Pages/Home/Home";
import SignIn from "@/Pages/AuthPage/SignIn";
import SignUp from "@/Pages/AuthPage/SignUp";
import PrivateRoute from "@/Routes/PrivateRoute";
import { createBrowserRouter, Navigate } from "react-router";
import PolicyDetails from "@/Pages/Policy Details/PolicyDetails";


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
            },
            {
                path: 'policy-details/:id',
                element: <PolicyDetails></PolicyDetails>
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