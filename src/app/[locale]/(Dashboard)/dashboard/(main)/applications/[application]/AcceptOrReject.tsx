"use client"

import { ApplicationResponse } from "@/lib/server/types/join/applicationUpdate";
import Button from "@/lib/ui/components/global/Buttons/Button";
import { Check, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { acceptOrRejectApplication } from "./action";


export default function AcceptOrReject({ applicationData }: { applicationData: ApplicationResponse }) {
    const t = useTranslations('Dashboard.content.applications.view');
    const { handleSubmit, formState: {  isSubmitting, isSubmitted } } = useForm();
    const onSubmit = async () => {
        try {
            await acceptOrRejectApplication(applicationData);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                !isSubmitting && !isSubmitted && <Button type="submit" mode="filled" icon={<Pencil className={`${isSubmitting ? 'animate-spin' : ''}`} size={24} />}>
                    {t('change_status')}
                </Button>
            }
            {isSubmitting && <Button type="submit" mode="filled" icon={<Pencil className={`${isSubmitting ? 'animate-spin' : ''}`} size={24} />}>
                {t('change_status')}
            </Button>}
            {isSubmitted && <div className="flex  gap-4 px-4 py-2 rounded-lg ">

                <Check size={24} className="text-green-700 dark:text-green-400" />
                <p className="text-green-700 dark:text-green-400">{t('status_changed')}</p>
            </div>}
        </form>
    )
}
