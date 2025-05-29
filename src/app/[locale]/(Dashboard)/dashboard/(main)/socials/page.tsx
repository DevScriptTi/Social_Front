import Button from "@/lib/ui/components/global/Buttons/Button";
import { DashContent, DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import SocialPagination from "@/lib/ui/components/local/Dashboard/Social/SocialPagination";
import SocialsTable from "@/lib/ui/components/local/Dashboard/Social/SocialsTable";
import SocialStat from "@/lib/ui/components/local/Dashboard/Social/SocialStat";
import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    searchParams: { page?: string }
}

export default async function page({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const t = await getTranslations('Dashboard.content.socials');
    return (
        <DashContent>
            <DashContenTitle>{t('title')}</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <SocialStat />
            </Suspense>
            <DashContentAction>
                <CreateSocial />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <SocialsTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <SocialPagination currentPage={parseInt(page)} />
            </Suspense>
        </DashContent>
    );
}


async function CreateSocial() {
    const t = await getTranslations('Dashboard.content.socials');
    return (
        <Link href="/dashboard/socials/create">
            <Button mode="filled" icon={<Plus />}>
                {t('create')}
            </Button>
        </Link>
    )
}