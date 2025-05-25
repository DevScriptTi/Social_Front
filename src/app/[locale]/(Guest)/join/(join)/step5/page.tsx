import Step5Form from "@/lib/ui/forms/join/Step5Form";
import { getTranslations } from "next-intl/server";

export default async function Step1() {
    const t = await getTranslations('join.step5');
    return (
        <div className="w-2/3 flex flex-col items-center gap-8">
            <h1 className="text-headline-large mx-auto text-primary dark:text-dark-primary">{t('title')}</h1>
            <Step5Form/>
        </div>
    )
}