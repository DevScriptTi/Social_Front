import { DashContent, DashContenTitle } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import UpdateAdminm from "@/lib/ui/forms/admin/update";
import { getTranslations } from "next-intl/server";

export default async function EditAdminPage({ params }: { params: { admin: string } }) {
    const t = await getTranslations('Dashboard.content.admins.update');
    return (
        <DashContent>
            <DashContenTitle>{t('title')}</DashContenTitle>
            <div className="mb-5"></div>
            <UpdateAdminm admin={Number((await params).admin)} />
        </DashContent>
    )
}