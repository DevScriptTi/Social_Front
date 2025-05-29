"use client"

import Button from "@/lib/ui/components/global/Buttons/Button";
import {  Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { evaluateApplication } from "./applicationSocialAction";


export default function EvaluateApplication({ socialId }: { socialId: number }) {
    const t = useTranslations('Dashboard.content.socials.view');
    const { handleSubmit, formState: { isSubmitting, isSubmitted } } = useForm();
    const onSubmit = async () => {
        try {
            await evaluateApplication(socialId);
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Button type="submit" mode="filled" icon={<Pencil className={`${isSubmitting || isSubmitted ? 'animate-spin' : ''}`} size={24} />}>
                {t('evaluate')}
            </Button>
        </form>
    )
}
