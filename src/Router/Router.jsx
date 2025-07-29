import { createBrowserRouter, Navigate } from "react-router";
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
import PolicyDetails from "@/Pages/Policy Details/PolicyDetails";
import ManageUsers from "@/Dashboard/ManageUsers/ManageUsers";
import ManageBlogs from "@/Dashboard/ManageBlogs/ManageBlogs";
import Blogs from "@/Pages/Blogs/Blogs";
import BlogDetails from "@/Pages/BlogDetails/BlogDetails";
import UpdateProfile from "@/Pages/UpdateProfile/UpdateProfile";
import Quote from "@/Pages/QuotePage/Quote";
import ApplyForPolicy from "@/Pages/ApplyForPolicy/ApplyForPolicy";
import ManageApplication from "@/Dashboard/ManageApplication/ManageApplication";
import AssignedCustomers from "@/Dashboard/AssignedCustomers/AssignedCustomers";
import MyPolicies from "@/Dashboard/MyPolicies/MyPolicies";
import PaymentStatus from "@/Dashboard/PaymentStatus/PaymentStatus";
import Payment from "@/Pages/Payment/Payment";
import PaymentHistory from "@/Dashboard/PaymentHistory/PaymentHistory";
import ClaimAPolicy from "@/Dashboard/ClaimAPolicy/ClaimAPolicy";
import PolicyClearance from "@/Dashboard/PolicyClearance/PolicyClearance";
import Forbidden from "@/Pages/Forbidden/Forbidden";
import AdminRoute from "@/Routes/AdminRoute";
import AgentRoute from "@/Routes/AgentRoute";
import AdminAndAgentRoute from "@/Routes/AdminAndAgentRoute";
import CustomerRoute from "@/Routes/CustomerRoute";


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
                element: <AllPolicies></AllPolicies>
            },
            {
                path: 'policy-details/:id',
                element: <PolicyDetails></PolicyDetails>
            },
            {
                path: 'blogs',
                element: <Blogs></Blogs>
            },
            {
                path: 'blog-details/:id',
                element: <BlogDetails></BlogDetails>
            },
            {
                path: 'update-profile',
                element: <PrivateRoute><UpdateProfile></UpdateProfile> </PrivateRoute>
            },
            {
                path: "quote/:id",
                element: <PrivateRoute><Quote></Quote></PrivateRoute>
            },
            {
                path: 'apply/:id',
                element: <PrivateRoute><ApplyForPolicy></ApplyForPolicy></PrivateRoute>
            },
            {
                path: 'payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: 'forbidden',
                element: <Forbidden></Forbidden>
            }
        ]
    },

    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashboardHome></DashboardHome>
            },

            {
                path: 'manage-policies',
                element: <AdminRoute><ManagePolicies></ManagePolicies></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'manage-application',
                element: <AdminRoute><ManageApplication></ManageApplication></AdminRoute>
            },


            {
                path: 'manage-blogs',
                element: <AdminAndAgentRoute><ManageBlogs></ManageBlogs></AdminAndAgentRoute>
            },


            {
                path: 'assigned-customers',
                element: <AgentRoute><AssignedCustomers></AssignedCustomers></AgentRoute>
            },
            {
                path: 'policy-clearance',
                element: <AgentRoute><PolicyClearance></PolicyClearance></AgentRoute>
            },


            {
                path: 'my-policies',
                element: <CustomerRoute><MyPolicies></MyPolicies></CustomerRoute>
            },
            {
                path: 'payment-status',
                element: <CustomerRoute><PaymentStatus></PaymentStatus></CustomerRoute>
            },
            {
                path: 'payment-history',
                element: <CustomerRoute><PaymentHistory></PaymentHistory></CustomerRoute>
            },
            {
                path: 'claim-policy',
                element: <CustomerRoute><ClaimAPolicy></ClaimAPolicy></CustomerRoute>
            },

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