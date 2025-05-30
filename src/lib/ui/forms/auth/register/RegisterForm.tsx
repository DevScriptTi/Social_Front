"use client";

import { Input } from "@/lib/ui/components/global/Inputs/inputs";
import Form, { FormSection } from "../Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterData } from "@/lib/server/types/auth/register/Register";
import { z } from "zod";
import Button from "@/lib/ui/components/global/Buttons/Button";
import { register } from "@/lib/server/actions/auth/register";
import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
const FormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string()
        .min(8, {
            message: "Password must be at least 8 characters long"
        }
        ),
    password_confirmation: z.string(),
    key: z.string().min(1, {
        message: "Key is required"
    })
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

export default function RegisterForm() {
    const locale = useLocale();
    const { handleSubmit, register: registerField, formState: { errors, isSubmitting, isSubmitSuccessful }, setError } = useForm<RegisterData>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        try {
            const response = await register({ data });
            if (response.error) {
                if (response.error.errors.email) {
                    setError("email", {
                        message: response.error.errors.email[0]
                    });
                }
                if (response.error.errors.password) {
                    setError("password", {
                        message: response.error.errors.password[0]
                    });
                }
                if (response.error.errors.password_confirmation) {
                    setError("password_confirmation", {
                        message: response.error.errors.password_confirmation[0]
                    });
                }
                if (response.error.errors.key) {
                    setError("key", {
                        message: response.error.errors.key[0]
                    });
                }
            }
        } catch (error) {
            console.error('Register error:', error);
        }
    }
    const t = useTranslations('auth.register');

    return (
        <Form title={t('title')}>
            <FormSection onSubmit={handleSubmit(onSubmit)}>
                {isSubmitSuccessful && (
                    <div className="flex flex-col gap-2 py-4 items-center">
                        <div className="flex items-center gap-2  text-green-700 dark:text-dark-green-400">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>{t('success')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-on-surface dark:text-dark-on-surface">{t('login')}</span>
                            <Link href={`/${locale}/login`} className="text-primary dark:text-dark-primary hover:underline">
                                {t('title')}
                            </Link>
                        </div>
                    </div>
                )}
                <Input<RegisterData>
                    label="email"
                    type="email"
                    title={t('email')}
                    placeholder={t('placeholder_email')}
                    register={registerField}
                    error={errors.email?.message}
                />
                <Input<RegisterData>
                    label="password"
                    title={t('password')}
                    placeholder={t('placeholder_password')}
                    register={registerField}
                    type="password"
                    error={errors.password?.message}
                />
                <Input<RegisterData>
                    label="password_confirmation"
                    title={t('password_confirmation')}
                    placeholder={t('placeholder_password_confirmation')}
                    register={registerField}
                    type="password"
                    error={errors.password_confirmation?.message}
                />
                <Input<RegisterData>
                    label="key"
                    title={t('key')}
                    placeholder={t('placeholder_key')}
                    register={registerField}
                    error={errors.key?.message}
                />
                <Button
                    type="submit"
                    mode="filled"
                    icon={isSubmitting ? <Loader2 className="animate-spin" /> : undefined}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t('registering') : t('register')}
                </Button>
                <div className="text-center text-sm">
                    {t('already_have_account')}
                    <Link href={`/${locale}/login`} className="text-primary dark:text-dark-primary hover:underline">
                        {t('login')}
                    </Link>
                </div>
            </FormSection>
        </Form>
    )
}
