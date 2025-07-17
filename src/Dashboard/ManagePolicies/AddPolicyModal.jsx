import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "../../components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import useAxios from "@/Hooks/useAxios";
import { toast } from "sonner";

const AddPolicyModal = ({ open, setOpen, onPolicyAdded }) => {

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [category, setCategory] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axios = useAxios();

    const handleCategoryChange = (value) => {
        setCategory(value);
        setValue("category", value, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        const imageFile = data.image[0];

        if (!imageFile) {
            console.error("No image file provided.");
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
            const policyPurchased = 0;

            if (result.success) {
                const imageUrl = result.data.url;

                const policyData = {
                    ...data,
                    minAge: Number(data.minAge),
                    maxAge: Number(data.maxAge),
                    duration: Number(data.duration),
                    basePremiumRate: Number(data.basePremiumRate),
                    image: imageUrl,
                    category,
                    purchasedCount: policyPurchased,
                };

                console.log("Final submitted data:", policyData);

                axios.post('/policies', policyData)
                    .then(() => {
                        toast("Policy was added successfully")
                        reset();
                        setCategory('');
                        onPolicyAdded();
                    })
                    .catch(error => {
                        console.log(error);
                    })

                setOpen(false);
            } else {
                console.error("Image upload failed:", result);
            }
        } catch (err) {
            console.error("Upload error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[700px] w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Add New Policy</DialogTitle>
                        <DialogDescription>
                            Fill out the policy details to add a new policy.
                        </DialogDescription>
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
                            <Select onValueChange={handleCategoryChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Insurance Categories</SelectLabel>
                                        <SelectItem value="life">Life Insurance</SelectItem>
                                        <SelectItem value="health">Health Insurance</SelectItem>
                                        <SelectItem value="critical-illness">Critical Illness</SelectItem>
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
                                id="image"
                                type="file"
                                {...register("image", { required: "This field is required" })}
                            />
                            {errors.image && (
                                <p className="text-red-500 text-sm">{errors.image.message}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-2">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button className="text-white" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Policy"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPolicyModal;
