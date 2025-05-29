import { getApplications } from "@/lib/server/actions/application/getApplications";
import { DashContentStat, DashContentStatItem } from "../DashCrudContent";
import { Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface ApplicationStatProps {
    status: string;
    sort: string;
}

export default async function ApplicationStat({ status, sort }: ApplicationStatProps) {
    const t = await getTranslations('Dashboard.content.applications');
    try {
        const response = await getApplications(1, status, sort);

        if (!response || !response.applications.data) {
            return null;
        }

        return (
            <DashContentStat>
                <DashContentStatItem
                    title={t('title')}
                    value={response.applications.total.toString()}
                    icon={<Users size={80} />}
                />
            </DashContentStat>
        )
    } catch (error) {
        console.error('Error in ApplicationStat:', error);
        return null;
    }
} 