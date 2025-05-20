import DashSection from "@/lib/ui/components/global/Section/Section";
import { DashContenTitle } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import CreateAdminForm from "@/lib/ui/forms/admin/CreateAdminForm";

export default function Create() {
    return (
        <DashSection>
            <DashContenTitle>Create Admin</DashContenTitle>
            <div className="mb-5"></div>
            <CreateAdminForm />
        </DashSection>
    )
}