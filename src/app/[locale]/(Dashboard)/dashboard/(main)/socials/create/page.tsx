import DashSection from "@/lib/ui/components/global/Section/Section";
import { DashContenTitle } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import CreateSocialForm from "@/lib/ui/forms/social/CreateSocialForm";
import { getTranslations } from "next-intl/server";

export default async function CreateSocialPage() {
    const t = await getTranslations('Dashboard.content.socials.createSocial');
    return (
        <DashSection>
            <DashContenTitle>{t('title')}</DashContenTitle>
            <div className="mb-5"></div>
            <CreateSocialForm />
        </DashSection>
    )
} 