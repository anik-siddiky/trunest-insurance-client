"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import happyFamily from '../assets/happy-family.jpg'
import { useForm } from "react-hook-form"
import SocialLoginButtons from "@/components/SocialLoginButtons"
import useAuth from "@/Hooks/useAuth"
import { toast } from "sonner"
import axios from "axios"

const SignUp = () => {
    const [profilePic, setProfilePic] = useState('');
    const { createUser } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {

                toast("Account created successfully!", {
                    description: "Welcome to TruNest!",
                });

                console.log(result);
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image)

        const formData = new FormData();
        formData.append('image', image);


        const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_bb_key}`
        const res = await axios.post(imagUploadUrl, formData)

        setProfilePic(res.data.data.url);
    }

    console.log(profilePic)

    return (
        <div className="flex min-h-screen lg:min-h-[calc(100vh-72px)] flex-col items-center justify-center md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Create your account</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Sign up to join TruNest
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input {...register('name', { required: true })} id="name" type="text" placeholder="Enter your full name" />
                                    {errors.name?.type === 'required' && <span className="text-red-500 text-xs">Please enter your full name.</span>}
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="picture">Photo</Label>
                                    <Input onChange={handleImageUpload} {...register('file', { required: true })} id="picture" type="file" />
                                    {errors.file?.type === 'required' && <span className="text-red-500 text-xs">Please upload a profile photo.</span>}
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input {...register('email', { required: true })} id="email" type="email" placeholder="Enter your email" />
                                    {errors.email?.type === 'required' && <span className="text-red-500 text-xs">A valid email address is required.</span>}
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input {...register('password', {
                                        required: true, minLength: 6,
                                        validate: {
                                            hasUpperCase: value =>
                                                /[A-Z]/.test(value) || 'Password must include at least one uppercase letter.',
                                            hasLowerCase: value =>
                                                /[a-z]/.test(value) || 'Password must include at least one lowercase letter.',
                                            hasNumber: value =>
                                                /[0-9]/.test(value) || 'Password must include at least one number.',
                                            hasSpecialChar: value =>
                                                /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must include at least one special character.',
                                        }
                                    })} id="password" type="password" placeholder="Enter a secure password." />
                                    {errors.password?.type === 'required' && <span className="text-red-500 text-xs">Please create a secure password.</span>}
                                    {errors.password?.type === 'minLength' && <span className="text-red-500 text-xs">Password must be at least 6 characters long.</span>}
                                    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                                    {errors.password?.types?.hasUpperCase && <span className="text-red-500 text-xs">{errors.password.types.hasUpperCase}</span>}
                                    {errors.password?.types?.hasLowerCase && <span className="text-red-500 text-xs">{errors.password.types.hasLowerCase}</span>}
                                    {errors.password?.types?.hasNumber && <span className="text-red-500 text-xs">{errors.password.types.hasNumber}</span>}
                                    {errors.password?.types?.hasSpecialChar && <span className="text-red-500 text-xs">{errors.password.types.hasSpecialChar}</span>}
                                </div>
                                <Button type="submit" className="w-full text-white">
                                    Create account
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
                                    Already have an account?{" "}
                                    <Link to="/signin" className="underline underline-offset-4">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </form>
                        <div className="bg-muted relative hidden md:block">
                            <img
                                src={happyFamily}
                                alt="Sign up image"
                                className="absolute inset-0 h-full w-full object-cover brightness-90"
                            />
                            {/* Black overlay */}
                            <div className="absolute inset-0 bg-black opacity-40"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                                <h2 className="text-2xl font-bold drop-shadow-lg">
                                    Protect What Matters Most
                                </h2>
                                <p className="mt-2 max-w-xs drop-shadow-md">
                                    Secure your family's future with trusted insurance plans tailored for you.
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
    )
}

export default SignUp
