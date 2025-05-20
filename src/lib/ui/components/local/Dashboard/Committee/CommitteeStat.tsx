import { getCommittees } from "@/lib/server/actions/committee/getCommittees";
import { DashContentStat, DashContentStatItem } from "../DashCrudContent";
import { Users } from "lucide-react";

export default async function CommitteeStat() {
    try {
        const response = await getCommittees();
        
        if (!response || !response.data) {
            return null;
        }

        return (
            <DashContentStat>
                <DashContentStatItem 
                    title="Committees" 
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