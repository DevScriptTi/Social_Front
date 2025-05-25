import { getLocale, getTranslations } from "next-intl/server";
import NavJoinItem from "../../global/Navigations/NavJoin/NavJoinItem"
import { cookies } from "next/headers";

export default async function JoinNavBar() {
    const locale = await getLocale();
    const t = await getTranslations('join.joinUpBar');
    const cookieStore = await cookies();
    const step = Number(cookieStore.get('step')?.value);
    return (
        <div className="h-full flex justify-center gap-8  flex-col w-1/3">
            <NavJoinItem currentStep={step} step={1} disabled={false}  title={t('step1')} href={`/${locale}/join/step1`} />
            <NavJoinItem currentStep={step} step={2} disabled={false}  title={t('step2')} href={`/${locale}/join/step2`} />
            <NavJoinItem currentStep={step} step={3} disabled={false}  title={t('step3')} href={`/${locale}/join/step3`} />
            <NavJoinItem currentStep={step} step={4} disabled={false}  title={t('step4')} href={`/${locale}/join/step4`} />
            <NavJoinItem currentStep={step} step={5} disabled={false}  title={t('step5')} href={`/${locale}/join/step5`} />
        </div>
    )
}

