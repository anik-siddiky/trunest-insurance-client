import MainLayout from "@/Layouts/MainLayout";
import AllPolicies from "@/Pages/AllPolicies";
import Home from "@/Pages/Home/Home";
import SignIn from "@/Pages/SignIn";
import SignUp from "@/Pages/SignUp";
import PrivateRoute from "@/Routes/PrivateRoute";
import { createBrowserRouter } from "react-router";


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
    }
])

export default Router