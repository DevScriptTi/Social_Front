"use client";

import { Input } from "@/lib/ui/components/global/Inputs/inputs";
import { createAdmin } from "@/lib/server/actions/admin/adminActions";
import { useForm } from "react-hook-form";
import Button from "@/lib/ui/components/global/Buttons/Button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
const createAdminSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .regex(/^[A-Z]/, "First letter must be capital")
        .regex(/^[A-Z][a-z]*$/, "Only letters are allowed"),
    last: z.string()
        .min(1, "Last name is required")
        .regex(/^[A-Z]/, "First letter must be capital")
        .regex(/^[A-Z][a-z]*$/, "Only letters are allowed"),
});

type CreateAdminFormData = z.infer<typeof createAdminSchema>;

export default function CreateAdminForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<CreateAdminFormData>({
        resolver: zodResolver(createAdminSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            const timer = setTimeout(() => {
                router.refresh();
                router.push('/dashboard');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitSuccessful, router]);

    const onSubmit = async (data: CreateAdminFormData) => {
        try {
            await createAdmin(data);
        } catch (error) {
            console.error('Error creating admin:', error);
        }
    };
    const t = useTranslations('Dashboard.content.admins.createAdmin');


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
            {isSubmitSuccessful && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 animate-fade-in">
                    <CheckCircle2 size={20} />
                    <span>{t('success')}</span>
                </div>
            )}
            <Input
                label="name"
                title={t('name')}
                placeholder={t('placeholder_name')}
                error={errors.name?.message}
                register={register}
            />
            <Input
                label="last"
                title={t('last')}
                placeholder={t('placeholder_last')}
                error={errors.last?.message}
                register={register}
            />
            <Button
                type="submit"
                mode="filled"
                disabled={isSubmitting}
            >
                {isSubmitting ? t('submitting') : t('create')}
            </Button>
        </form>
    );
}