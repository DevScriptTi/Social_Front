"use client"
import { ApplicationResponse } from "@/lib/server/types/join/applicationUpdate";
import { useTranslations } from "next-intl";
import Image from "next/image";


export default function Step6({applicationResponse}: {applicationResponse: ApplicationResponse | { success: false }}) {
    const t = useTranslations('join.step6')
    const application = applicationResponse.success === false ? null : applicationResponse.application;
    console.log("application?.status", application)
    console.log("application?.qrcode.value", application?.qrcode.value)
    return (
        <div
            className="flex flex-col gap-4"
        >
            <Image src={application?.qrcode.value} alt="step6" width={100} height={100} />
            <h1 className="text-title-large text-primary-light dark:text-primary-dark font-bold">{t('title')}</h1>      
            {
                application?.status === "pending" && (
                    <p className="text-body-large text-primary-light dark:text-primary-dark">
                        {t('pending')}
                    </p>
                )
            }
            {
                application?.status === "on-review" && (
                    <p className="text-body-large text-primary-light dark:text-primary-dark">
                        {t('on_review')}
                    </p>
                )
            }
            {
                application?.status === "not-classed" && (
                    <p className="text-body-large text-primary-light dark:text-primary-dark">
                        {t('not_classed')}
                    </p>
                )
            }
            {
                application?.status === "accepted" && (
                    <p className="text-body-large text-primary-light dark:text-primary-dark">
                        {t('accepted')}
                    </p>
                )
            }

        </div>
    )
}