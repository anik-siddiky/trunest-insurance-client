import MainLayout from "@/Layouts/MainLayout";
import Home from "@/Pages/Home";
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

            }
        ]
    }
])

export default Router