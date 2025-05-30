"use client";

import { Input } from "@/lib/ui/components/global/Inputs/inputs";
import { createEmployee } from "@/lib/server/actions/employee/employeeActions";
import { useForm } from "react-hook-form";
import Button from "@/lib/ui/components/global/Buttons/Button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Wilaya, getWilayas } from "@/lib/server/actions/employee/getWilayas";
import { SimpleSelect } from "@/lib/ui/components/global/Inputs/SimpleSelect";
import { useTranslations } from "next-intl";
const createEmployeeSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .regex(/^[A-Z][a-z]*$/, "Only letters allowed, first letter must be capital"),
    last: z.string()
        .min(1, "Last name is required")
        .regex(/^[A-Z][a-z]*$/, "Only letters allowed, first letter must be capital"),
    date_of_birth: z.string()
        .min(1, "Date of birth is required")
        .refine((date) => {
            const today = new Date();
            const birthDate = new Date(date);
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 18;
        }, "Must be at least 18 years old"),
});

type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;

export default function CreateEmployeeForm() {
    const router = useRouter();
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        setValue,
        reset,
    } = useForm<CreateEmployeeFormData>({
        resolver: zodResolver(createEmployeeSchema),
    });

   

    useEffect(() => {
        if (isSubmitSuccessful) {
            const timer = setTimeout(() => {
                router.refresh();
                router.push('/dashboard/employees');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitSuccessful, router]);

   

    const onSubmit = async (data: CreateEmployeeFormData) => {
        try {
            await createEmployee(data);
            reset(); // Reset form after successful submission
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };
    const t = useTranslations('Dashboard.content.employees.createEmployee');
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
            <Input
                label="date_of_birth"
                title={t('date_of_birth')}
                
                type="date"
                error={errors.date_of_birth?.message}
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
