import { getEmployees } from "@/lib/server/actions/employee/getEmployees";
import { DashContentStat, DashContentStatItem } from "../DashCrudContent";
import { Users } from "lucide-react";

export default async function EmployeeStat() {
    try {
        const response = await getEmployees();
        
        if (!response || !response.data) {
            return null;
        }

        return (
            <DashContentStat>
                <DashContentStatItem 
                    title="Employees" 
                    value={response.data.total.toString()} 
                    icon={<Users size={80} />} 
                />
            </DashContentStat>
        )
    } catch (error) {
        console.error('Error in EmployeeStat:', error);
        return null;
    }
} 