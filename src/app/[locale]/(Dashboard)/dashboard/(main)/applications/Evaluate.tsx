import Button from "@/lib/ui/components/global/Buttons/Button";
import { getLocale, getTranslations } from "next-intl/server";


export default async function Evaluate() {
    const t = await getTranslations('Dashboard.content.applications.evaluate');
    const locale = await getLocale();
    return (
        <>
            <form action={`/${locale}/dashboard/applications`}>
                <input type="hidden" name="status" value="not-classed" />
                <input type="hidden" name="sort" value="grade" />
                <Button mode="filled" type="submit">
                    {t('title')}
                </Button>
            </form>
        </>
    )
}