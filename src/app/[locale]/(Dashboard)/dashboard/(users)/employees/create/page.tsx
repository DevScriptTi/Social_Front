import DashSection from "@/lib/ui/components/global/Section/Section";
import { DashContenTitle } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import CreateEmployeeForm from "@/lib/ui/forms/employee/CreateEmployeeForm";

export default function Create() {
    return (
        <DashSection>
            <DashContenTitle>Create Employee</DashContenTitle>
            <div className="mb-5"></div>
            <CreateEmployeeForm />
        </DashSection>
    )
} 