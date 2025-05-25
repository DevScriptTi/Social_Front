import DashSection from "@/lib/ui/components/global/Section/Section";
import { DashContenTitle } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import CreateAdminForm from "@/lib/ui/forms/admin/CreateAdminForm";
import { getTranslations } from "next-intl/server";

export default async function CreateAdminPage() {
    const t = await getTranslations('Dashboard.content.admins.createAdmin');
    return (
        <DashSection>
            <DashContenTitle>{t('title')}</DashContenTitle>
            <div className="mb-5"></div>
            <CreateAdminForm />
        </DashSection>
    )
}