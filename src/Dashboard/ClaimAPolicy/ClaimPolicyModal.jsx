import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useAxios from '@/Hooks/useAxios';

const ClaimPolicyModal = ({ policy, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axios = useAxios();

    const onSubmit = async (data) => {
        const file = data.document[0];

        if (!file) {
            toast.error("Please upload a document");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const result = await response.json();

            if (!result.success) {
                toast.error("Image upload failed");
                return;
            }

            const documentUrl = result.data.url;

            const claimPayload = {
                policyId: policy.policyId,
                policyTitle: policy.policyTitle,
                email: policy.personal.email,
                agent: policy.assignedAgent,
                reason: data.reason,
                documentUrl,
                coverage: policy.quoteInput.coverage,
                duration: policy.quoteInput.duration,
                customerName: policy.personal.name,
                claimStatus: 'pending',
                claimedAt: new Date(),
            };

            await axios.post('/claims', claimPayload);
            toast.success("Claim submitted successfully");

            reset();
            onClose();
        } catch (err) {
            toast.error("Error submitting claim");
            console.error(err);
        }
    };

    return (
        <Dialog open={!!policy} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Submit Claim Request</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label className="mb-1">Policy Title</Label>
                        <Input value={policy.policyTitle} readOnly />
                    </div>

                    <div>
                        <Label className="mb-1" htmlFor="reason">Reason for Claim</Label>
                        <Textarea
                            id="reason"
                            placeholder="Explain why you're making this claim"
                            {...register('reason', { required: 'Required' })}
                        />
                        {errors.reason && <p className="text-sm text-red-500">{errors.reason.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-1" htmlFor="document">Upload Supporting Document (Image only)</Label>
                        <Input
                            id="document"
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            {...register('document', { required: 'Required' })}
                        />
                        {errors.document && <p className="text-sm text-red-500">{errors.document.message}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Button className="cursor-pointer" type="submit">Submit Claim</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ClaimPolicyModal;
