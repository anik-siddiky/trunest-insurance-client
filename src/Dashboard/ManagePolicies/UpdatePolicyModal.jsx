import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "../../components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAxios from "@/Hooks/useAxios";
import { toast } from "sonner";

const UpdatePolicyModal = ({ open, setOpen, policy, onPolicyUpdated }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [category, setCategory] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axios = useAxios();

    useEffect(() => {
        if (policy) {
            setValue("policyTitle", policy.policyTitle);
            setValue("description", policy.description);
            setValue("minAge", policy.minAge);
            setValue("maxAge", policy.maxAge);
            setValue("coverageRange", policy.coverageRange);
            setValue("duration", policy.duration);
            setValue("basePremiumRate", policy.basePremiumRate);
            setCategory(policy.category);
            setValue("category", policy.category);
        }
    }, [policy, setValue]);

    const handleCategoryChange = (value) => {
        setCategory(value);
        setValue("category", value, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            let imageUrl = policy.image;
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

            const updatedPolicy = {
                ...data,
                image: imageUrl,
                category
            };

            await axios.put(`/policies/${policy._id}`, updatedPolicy);
            toast("Policy updated successfully");
            onPolicyUpdated();
            setOpen(false);
        } catch (error) {
            toast("Failed to update policy");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[700px] w-full max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Update Policy</DialogTitle>
                        <DialogDescription>Edit and update the selected policy.</DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="policyTitle">Policy Title</Label>
                            <Input
                                id="policyTitle"
                                placeholder="e.g., Gold Health Plan"
                                {...register("policyTitle", { required: "This field is required" })}
                            />
                            {errors.policyTitle && <p className="text-red-500 text-sm">{errors.policyTitle.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={category} onValueChange={handleCategoryChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Insurance Categories</SelectLabel>
                                        <SelectItem value="life">Life Insurance</SelectItem>
                                        <SelectItem value="health">Health Insurance</SelectItem>
                                        <SelectItem value="critical-illness">Critical Illness</SelectItem>
                                        <SelectItem value="heart">Heart Insurance</SelectItem>
                                        <SelectItem value="home">Homeowners</SelectItem>
                                        <SelectItem value="renters">Renters</SelectItem>
                                        <SelectItem value="travel">Travel</SelectItem>
                                        <SelectItem value="business">Business</SelectItem>
                                        <SelectItem value="motorcycle">Motorcycle</SelectItem>
                                        <SelectItem value="earthquake">Earthquake</SelectItem>
                                        <SelectItem value="long-term-care">Long-Term Care</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <input
                                type="hidden"
                                {...register("category", { required: "This field is required" })}
                                value={category}
                            />
                            {errors.category && (
                                <p className="text-red-500 text-sm">{errors.category.message}</p>
                            )}
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                rows={3}
                                placeholder="Write a short description of the policy..."
                                {...register("description", { required: "This field is required" })}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="minAge">Minimum Age</Label>
                            <Input
                                id="minAge"
                                type="number"
                                placeholder="18"
                                {...register("minAge", { required: "This field is required" })}
                            />
                            {errors.minAge && <p className="text-red-500 text-sm">{errors.minAge.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxAge">Maximum Age</Label>
                            <Input
                                id="maxAge"
                                type="number"
                                placeholder="65"
                                {...register("maxAge", { required: "This field is required" })}
                            />
                            {errors.maxAge && <p className="text-red-500 text-sm">{errors.maxAge.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverageRange">Coverage Range</Label>
                            <Input
                                id="coverageRange"
                                placeholder="e.g., 5L - 1Cr"
                                {...register("coverageRange", { required: "This field is required" })}
                            />
                            {errors.coverageRange && (
                                <p className="text-red-500 text-sm">{errors.coverageRange.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration Years</Label>
                            <Input
                                id="duration"
                                type="number"
                                placeholder="e.g., 10, 15, 20"
                                {...register("duration", { required: "This field is required" })}
                            />
                            {errors.duration && (
                                <p className="text-red-500 text-sm">{errors.duration.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="basePremiumRate">Base Premium Rate</Label>
                            <Input
                                id="basePremiumRate"
                                type="number"
                                placeholder="৳1000"
                                {...register("basePremiumRate", { required: "This field is required" })}
                            />
                            {errors.basePremiumRate && (
                                <p className="text-red-500 text-sm">{errors.basePremiumRate.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Policy Image</Label>
                            <Input
                                className="cursor-pointer"
                                id="image"
                                type="file"
                                {...register("image")}
                            />
                            {errors.image && (
                                <p className="text-red-500 text-sm">{errors.image.message}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-2">
                        <DialogClose asChild>
                            <Button className="cursor-pointer" variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button className="text-white cursor-pointer" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Update Policy"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdatePolicyModal;
