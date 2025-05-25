import { getCommittees } from "@/lib/server/actions/committee/getCommittees";
import { DashContentStat, DashContentStatItem } from "../DashCrudContent";
import { Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function CommitteeStat() {
    const t = await getTranslations('Dashboard.content.committees.stat');
    try {
        const response = await getCommittees();
        
        if (!response || !response.data) {
            return null;
        }

        return (
            <DashContentStat>
                <DashContentStatItem 
                    title={t('title')} 
                    value={response.data.total.toString()} 
                    icon={<Users size={80} />} 
                />
            </DashContentStat>
        )
    } catch (error) {
        console.error('Error in CommitteeStat:', error);
        return null;
    }
} 