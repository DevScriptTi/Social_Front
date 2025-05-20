import DashSection from "@/lib/ui/components/global/Section/Section";
import { DashContenTitle } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import CreateCommitteeForm from "@/lib/ui/forms/committee/CreateCommitteeForm";

export default function Create() {
    return (
        <DashSection>
            <DashContenTitle>Create Committee</DashContenTitle>
            <div className="mb-5"></div>
            <CreateCommitteeForm />
        </DashSection>
    )
} 