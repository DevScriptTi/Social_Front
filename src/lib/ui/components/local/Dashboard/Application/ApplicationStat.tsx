import { getApplications } from "@/lib/server/actions/application/getApplications";
import { DashContentStat, DashContentStatItem } from "../DashCrudContent";
import { Users } from "lucide-react";

export default async function ApplicationStat() {
    try {
        const response = await getApplications();

        if (!response || !response.applications.data) {
            return null;
        }

        return (
            <DashContentStat>
                <DashContentStatItem
                    title="Applications"
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