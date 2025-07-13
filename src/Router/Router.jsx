import MainLayout from "@/Layouts/MainLayout";
import Home from "@/Pages/Home";
import SignIn from "@/Pages/SignIn";
import SignUp from "@/Pages/SignUp";
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
            }
        ]
    }
])

export default Router