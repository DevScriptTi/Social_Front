import DashSection from "@/lib/ui/components/global/Section/Section";
import { DashContenTitle } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import CreateEmployeeForm from "@/lib/ui/forms/employee/CreateEmployeeForm";
import { getTranslations } from "next-intl/server";

export default async function CreateEmployeePage() {
    const t = await getTranslations('Dashboard.content.employees.createEmployee');
    return (
        <DashSection>
            <DashContenTitle>{t('title')}</DashContenTitle>
            <div className="mb-5"></div>
            <CreateEmployeeForm />
        </DashSection>
    )
} 