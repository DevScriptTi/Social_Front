import { getApplication } from "@/lib/server/actions/join/applicant";
import Step1Form from "@/lib/ui/forms/join/Step1Form";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function Step1() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Step1_ />
        </Suspense>
    )
}

async function Step1_() {
    const t = await getTranslations('join.step1');
    const application = await getApplication();
    return (
        <div className="w-2/3 flex flex-col items-center gap-8">
            <h1 className="text-headline-large mx-auto text-primary dark:text-dark-primary">{t('title')}</h1>
            <Step1Form applicationResponse={application} />
        </div>
    )
}