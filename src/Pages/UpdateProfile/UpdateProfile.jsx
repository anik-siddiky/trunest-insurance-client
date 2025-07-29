import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import useAuth from "@/Hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import useAxios from "@/Hooks/useAxios";

const UpdateProfile = () => {
    const { user } = useAuth();
    const auth = getAuth();
    const axios = useAxios();

    const [name, setName] = useState(user?.displayName || "");
    const [photoFile, setPhotoFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_bb_key}`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (data.success) {
            return data.data.url;
        } else {
            throw new Error("Image upload failed");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = photoURL;

            if (photoFile) {
                toast("Uploading image...");
                imageUrl = await handleImageUpload(photoFile);
                setPhotoURL(imageUrl);
            }

            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: imageUrl,
            });

            await axios.patch(`/users/email/${user.email}`, {
                name,
                photoURL: imageUrl,
            });

            toast("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            toast("Profile update failed.");
        } finally {
            setLoading(false);
        }
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case "admin":
                return <Badge variant="destructive">Admin</Badge>;
            case "agent":
                return <Badge className="bg-blue-500 hover:bg-blue-600">Agent</Badge>;
            case "customer":
            default:
                return <Badge className="bg-green-500 hover:bg-green-600">Customer</Badge>;
        }
    };

    console.log(user)

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 min-h-screen">
            <Card className="shadow-lg border-none">
                <CardHeader className="flex flex-col items-center text-center">
                    <img
                        src={photoURL}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border object-cover shadow-md mb-4"
                    />
                    <CardTitle className="text-2xl font-bold">{user?.displayName || "Your Name"}</CardTitle>
                    <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                    <div className="mt-2">{getRoleBadge(user?.role)}</div>
                    <p className="text-sm text-gray-400 mt-1">
                        Last login: {new Date(user?.metadata?.lastSignInTime).toLocaleString()}
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="photo">Upload Profile Picture</Label>
                            <Input
                                type="file"
                                id="photo"
                                accept="image/*"
                                onChange={(e) => setPhotoFile(e.target.files[0])}
                            />
                        </div>

                        <Button type="submit" className="w-full text-white cursor-pointer" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin w-4 h-4" /> Updating...
                                </span>
                            ) : (
                                "Update Profile"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateProfile;
