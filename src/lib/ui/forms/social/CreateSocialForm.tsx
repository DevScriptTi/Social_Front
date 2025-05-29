"use client";

import { Input } from "@/lib/ui/components/global/Inputs/inputs";
import { createSocial } from "@/lib/server/actions/social/socialActions";
import { useForm } from "react-hook-form";
import Button from "@/lib/ui/components/global/Buttons/Button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
const createSocialSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .regex(/^[A-Z][a-z]*$/, "Only letters allowed, first letter must be capital"),
    max_application: z.number().min(1, "Max application is required")       
});

type CreateSocialFormData = z.infer<typeof createSocialSchema>;

export default function CreateSocialForm() {
    const router = useRouter();
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        reset,
    } = useForm<CreateSocialFormData>({
        resolver: zodResolver(createSocialSchema),
    });

   

    useEffect(() => {
        if (isSubmitSuccessful) {
            const timer = setTimeout(() => {
                router.refresh();
                router.push('/dashboard/socials');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitSuccessful, router]);

   

    const onSubmit = async (data: CreateSocialFormData) => {
        try {
            await createSocial(data);
            reset(); // Reset form after successful submission
        } catch (error) {
            console.error('Error creating social:', error);
        }
    };
    const t = useTranslations('Dashboard.content.socials.createSocial');
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
                label="max_application"
                title={t('max_application')}
                placeholder={t('placeholder_max_application')}
                error={errors.max_application?.message}
                register={register}
            />
            <Button
                type="submit"
                mode="filled"
                disabled={isSubmitting}
            >
                {isSubmitting ? t('submitting') : t('submit')}
            </Button>
        </form>
    );
}
