import { getAdmins } from "@/lib/server/actions/admin/getAdmins";
import { DashContentStat, DashContentStatItem } from "../DashCrudContent";
import { UserCog } from "lucide-react";
import { getTranslations } from "next-intl/server";
export default async function AdminStat() {
    const admins = await getAdmins()
    const t = await getTranslations('Dashboard.content.admins.stat');
    return (
        <DashContentStat>
            <DashContentStatItem title={t('title')} value={admins?.total.toString()} icon={<UserCog size={80} />} />
        </DashContentStat>
    )
}