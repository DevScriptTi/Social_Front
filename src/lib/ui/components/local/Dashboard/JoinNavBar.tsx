import { getLocale } from "next-intl/server";
import NavJoinItem from "../../global/Navigations/NavJoin/NavJoinItem"

export default async function JoinNavBar() {
    const locale = await getLocale();
    return (
        <div className="h-full flex justify-center gap-8  flex-col w-1/3">
            <NavJoinItem disabled={false} mode="donne" title="Civil Status" href={`/${locale}/join/step1`} />
            <NavJoinItem disabled={false} mode="curent" title="Professional Status" href={`/${locale}/join/step2`} />
            <NavJoinItem disabled={false} mode="error" title="Property " href={`/${locale}/join/step3`} />
            <NavJoinItem disabled={false} mode="normal" title="Medical Condition" href={`/${locale}/join/step4`} />
            <NavJoinItem disabled={false} mode="normal" title="Uploading Documents" href={`/${locale}/join/step5`} />
        </div>
    )
}