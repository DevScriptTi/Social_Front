"use client";

import { Input } from "@/lib/ui/components/global/Inputs/inputs";
import Form, { FormSection } from "../Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginData } from "@/lib/server/types/auth/login/Login";
import { z } from "zod";
import Button from "@/lib/ui/components/global/Buttons/Button";
import { login } from "@/lib/server/actions/auth/login";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const FormSchema = z.object({
    email: z.string().email({
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    })
})

export default function LoginForm() {
    const router = useRouter();
    const locale = useLocale();
    const { handleSubmit, register, formState: { errors, isSubmitting , isSubmitSuccessful}, setError } = useForm<LoginData>({
        resolver: zodResolver(FormSchema),
    })
    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        try {
            const response = await login({ data });
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
            } else if (response.success) {
                router.replace(`/${locale}/dashboard`);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
        

    }
    return (
        <Form title="login now" >
            <FormSection onSubmit={handleSubmit(onSubmit)}>
                <Input<LoginData>
                    label="email"
                    placeholder="Enter your email"
                    register={register}
                    error={errors.email?.message}
                />
                <Input<LoginData>
                    label="password"
                    placeholder="Enter your password"
                    register={register}
                    type="password"
                    error={errors.password?.message}
                />
                <Button type="submit" mode="filled" icon={isSubmitting || isSubmitSuccessful? <Loader2 className="animate-spin" /> : undefined} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </FormSection>
        </Form>
    )
}
