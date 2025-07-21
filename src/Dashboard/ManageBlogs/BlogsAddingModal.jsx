import { useForm } from "react-hook-form";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAxios from "@/Hooks/useAxios";
import { toast } from "sonner";
import useAuth from "@/Hooks/useAuth";

const BlogsAddingModal = ({ open, setOpen, onBlogAdded }) => {
    const { user } = useAuth();

    const { register, handleSubmit, formState: { errors }, reset, } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const axios = useAxios();

    const onSubmit = async (data) => {
        const imageFile = data.image?.[0];

        if (!imageFile) {
            toast.error("Please upload an image");
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            if (!result.success) {
                toast.error("Image upload failed");
                setIsSubmitting(false);
                return;
            }

            const imageUrl = result.data.url;

            const blogData = {
                title: data.title,
                author: {
                    email: user?.email || "",
                    displayName: user?.displayName || "",
                },
                content: data.content,
                publishDate: new Date().toISOString(),
                image: imageUrl,
                viewCount: 0,
            };

            console.log(blogData);

            await axios.post("/blogs", blogData);

            toast.success("Blog added successfully!");
            reset();
            onBlogAdded();
            setOpen(false);
        } catch (error) {
            toast.error("Failed to add blog: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px] w-full max-h-[80vh] flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow overflow-hidden">
                    <DialogHeader>
                        <DialogTitle>Add New Blog</DialogTitle>
                        <DialogDescription>
                            Fill out the details to add a new blog.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Scrollable content area */}
                    <div className="flex-grow overflow-y-auto space-y-4 mb-4 mt-3 px-1">
                        {/* ... all your input fields here ... */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Blog title"
                                {...register("title", { required: "Title is required" })}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Rest of inputs ... */}

                        <div className="space-y-2 px-1">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                rows={5}
                                placeholder="Write your blog content here..."
                                {...register("content", { required: "Content is required" })}
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm">{errors.content.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 mb-3 px-1">
                            <Label htmlFor="image">Blog Image</Label>
                            <Input
                                className="cursor-pointer"
                                id="image"
                                type="file"
                                {...register("image", { required: "Image is required" })}
                            />
                            {errors.image && (
                                <p className="text-red-500 text-sm">{errors.image.message}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="cursor-pointer" variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button className="cursor-pointer text-white" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Blog"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    );
};

export default BlogsAddingModal;
