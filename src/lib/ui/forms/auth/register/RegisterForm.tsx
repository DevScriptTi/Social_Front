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
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

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
    const router = useRouter();
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

    return (
        <Form title="register now">
            <FormSection onSubmit={handleSubmit(onSubmit)}>
                {isSubmitSuccessful && (
                    <div className="flex flex-col gap-2 py-4 items-center">
                        <div className="flex items-center gap-2  text-green-700 dark:text-dark-green-400">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Registration successful!</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-on-surface dark:text-dark-on-surface">Login now</span>
                            <Link href={`/${locale}/login`} className="text-primary dark:text-dark-primary hover:underline">
                                Login here
                            </Link>
                        </div>
                    </div>
                )}
                <Input<RegisterData>
                    label="email"
                    placeholder="Enter your email"
                    register={registerField}
                    error={errors.email?.message}
                />
                <Input<RegisterData>
                    label="password"
                    placeholder="Enter your password"
                    register={registerField}
                    type="password"
                    error={errors.password?.message}
                />
                <Input<RegisterData>
                    label="password_confirmation"
                    placeholder="Confirm your password"
                    register={registerField}
                    type="password"
                    error={errors.password_confirmation?.message}
                />
                <Input<RegisterData>
                    label="key"
                    placeholder="Enter your registration key"
                    register={registerField}
                    error={errors.key?.message}
                />
                <Button
                    type="submit"
                    mode="filled"
                    icon={isSubmitting ? <Loader2 className="animate-spin" /> : undefined}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </Button>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href={`/${locale}/login`} className="text-primary dark:text-dark-primary hover:underline">
                        Login here
                    </Link>
                </div>
            </FormSection>
        </Form>
    )
}
