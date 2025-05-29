import { getSocials } from "@/lib/server/actions/social/getSocials";
import { DashContentStat, DashContentStatItem } from "../DashCrudContent";
import { Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function SocialStat() {
    const t = await getTranslations('Dashboard.content.socials.stat');
    try {
        const response = await getSocials();
        
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
        console.error('Error in SocialStat:', error);
        return null;
    }
} 