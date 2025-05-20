"use client";

import { Input } from "@/lib/ui/components/global/Inputs/inputs";
import { Admin } from "@/lib/server/types/admin/admin";
import { updateAdmin } from "@/lib/server/actions/admin/adminActions";
import { useForm } from "react-hook-form";
import Button from "@/lib/ui/components/global/Buttons/Button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";

const updateAdminSchema = z.object({
    name: z.string()
        .min(1, "name is required")
        .regex(/^[A-Z]/, "First letter must be capital")
        .regex(/^[A-Z][a-z]*$/, "Only letters are allowed"),
    last: z.string()
        .min(1, "Last name is required")
        .regex(/^[A-Z]/, "First letter must be capital")
        .regex(/^[A-Z][a-z]*$/, "Only letters are allowed"),
});

type UpdateAdminFormData = z.infer<typeof updateAdminSchema>;

interface UpdateAdminFormProps {
    admin: Admin;
}

export default function UpdateAdminForm({ admin }: UpdateAdminFormProps) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<UpdateAdminFormData>({
        resolver: zodResolver(updateAdminSchema),
        defaultValues: {
            name: admin.name,
            last: admin.last,
        },
    });

    const onSubmit = async (data: UpdateAdminFormData) => {
        try {
            await updateAdmin(admin.id, data);
            
        } catch (error) {
            console.error('Error updating admin:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
            {isSubmitSuccessful && (
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <p className="font-medium text-green-800 dark:text-green-200">Admin updated successfully!</p>
                </div>
            )}
            <Input
                label="name"
                title="Name"
                placeholder="Enter name (First letter capital)"
                error={errors.name?.message}
                register={register}
            />
            <Input
                label="last"
                title="Last Name"
                placeholder="Enter last name (First letter capital)"
                error={errors.last?.message}
                register={register}
            />
            <Button 
                type="submit" 
                mode="filled"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Updating..." : "Update Admin"}
            </Button>
        </form>
    );
}
