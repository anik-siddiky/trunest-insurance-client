import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAxios from "@/Hooks/useAxios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const BlogsUpdatingModal = ({ open, setOpen, blog, onBlogUpdated }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axios = useAxios();

    useEffect(() => {
        if (blog) {
            setValue("title", blog.title);
            setValue("content", blog.content);
        }
    }, [blog, setValue]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            let imageUrl = blog.image;

            const imageFile = data.image?.[0];
            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);

                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
                    { method: "POST", body: formData }
                );

                const result = await res.json();
                if (result.success) {
                    imageUrl = result.data.url;
                }
            }

            const updatedBlog = {
                title: data.title,
                content: data.content,
                image: imageUrl,
            };

            await axios.put(`/blogs/${blog._id}`, updatedBlog);
            toast("Blog updated successfully");
            onBlogUpdated();
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast("Failed to update blog");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[700px] w-full max-h-[80vh] flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Update Blog</DialogTitle>
                        <DialogDescription>Edit and update the selected blog post.</DialogDescription>
                    </DialogHeader>

                    {/* Scrollable content area */}
                    <div className="flex-grow overflow-y-auto space-y-4 mb-4 mt-3 px-1">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Blog title"
                                {...register("title", { required: "Title is required" })}
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                rows={5}
                                placeholder="Write the blog content here..."
                                {...register("content", { required: "Content is required" })}
                            />
                            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                        </div>

                        <div className="space-y-2 mb-3">
                            <Label htmlFor="image">Image</Label>
                            <Input
                                className="cursor-pointer"
                                id="image"
                                type="file"
                                accept="image/*"
                                {...register("image")}
                            />
                        </div>
                    </div>

                    {/* Sticky footer */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" className='cursor-pointer'>Cancel</Button>
                        </DialogClose>
                        <Button className="text-white cursor-pointer" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Update Blog"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BlogsUpdatingModal;
