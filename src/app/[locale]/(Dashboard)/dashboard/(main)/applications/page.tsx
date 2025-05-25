import { DashContent, DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import ApplicationPagination from "@/lib/ui/components/local/Dashboard/Application/ApplicationPagination";
import ApplicationsTable from "@/lib/ui/components/local/Dashboard/Application/ApplicationsTable";
import ApplicationStat from "@/lib/ui/components/local/Dashboard/Application/ApplicationStat";
import { Suspense } from "react";
import Button from "@/lib/ui/components/global/Buttons/Button";
import { getTranslations } from "next-intl/server";
interface PageProps {
    searchParams: { page?: string }
}

export default async function page({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const t = await getTranslations('Dashboard.content.applications');
    return (
        <DashContent>
            <DashContenTitle>{t('title')}</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <ApplicationStat />
            </Suspense>
            <DashContentAction>
                <Button mode="filled" >
                   {t('evaluate')}
                </Button>
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <ApplicationsTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <ApplicationPagination currentPage={parseInt(page)} />
            </Suspense>
        </DashContent>
    );
}


