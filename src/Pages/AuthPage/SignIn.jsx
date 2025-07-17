import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useLocation, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import oldCouple from '../../assets/old-couple.jpg'
import SocialLoginButtons from "@/components/SocialLoginButtons"
import useAuth from "@/Hooks/useAuth"
import { toast } from "sonner"

const SignIn = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/';
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)

        signIn(data.email, data.password)
            .then(result => {

                toast("Signed in successfully!", {
                    description: "Welcome back to TruNest!",
                });

                console.log(result);
                navigate(from);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="flex min-h-screen lg:min-h-[calc(100vh-72px)] flex-col items-center justify-center md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input {...register('email', { required: true })} id="email" type="email" placeholder="Enter your email" />
                                    {errors.email?.type === 'required' && <span className="text-red-500 text-xs">Please enter your email address.</span>}
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input {...register('password', { required: true })} id="password" type="password" placeholder="Enter your password." />
                                    {errors.password?.type === 'required' && <span className="text-red-500 text-xs">Please your password.</span>}
                                </div>

                                <Button type="submit" className="w-full text-white">
                                    Sign In
                                </Button>

                                {/* Or continue with */}
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        Or continue with
                                    </span>
                                </div>

                                {/* Google button */}
                                <SocialLoginButtons></SocialLoginButtons>

                                <div className="text-center text-sm">
                                    Don't have an account?{" "}
                                    <Link to="/signup" className="underline underline-offset-4">
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </form>
                        <div className="bg-muted relative hidden md:block">
                            <img
                                src={oldCouple}
                                alt="Login image"
                                className="absolute inset-0 h-full w-full object-cover brightness-90"
                            />
                            {/* Black overlay */}
                            <div className="absolute inset-0 bg-black opacity-40"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                                <h2 className="text-2xl font-bold drop-shadow-lg">
                                    Peace of Mind for Every Stage of Life
                                </h2>
                                <p className="mt-2 max-w-xs drop-shadow-md">
                                    Welcome back. Continue your journey with coverage you can count on.
                                </p>
                            </div>
                        </div>

                    </CardContent>
                </Card>
                <div className="text-muted-foreground text-center text-xs mt-4 *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
                    By signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
                    <a href="#">Privacy Policy</a>.
                </div>
            </div>
        </div>
    );
};

export default SignIn;