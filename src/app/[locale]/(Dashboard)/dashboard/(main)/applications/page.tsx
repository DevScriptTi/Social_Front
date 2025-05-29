import { DashContent, DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import ApplicationPagination from "@/lib/ui/components/local/Dashboard/Application/ApplicationPagination";
import ApplicationsTable from "@/lib/ui/components/local/Dashboard/Application/ApplicationsTable";
import ApplicationStat from "@/lib/ui/components/local/Dashboard/Application/ApplicationStat";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Evaluate from "./Evaluate";
interface PageProps {
    searchParams: { page?: string, status?: string, sort?: string }
}

export default async function page({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const status = (await searchParams).status || "";
    const sort = (await searchParams).sort || "";
    const t = await getTranslations('Dashboard.content.applications');
    return (
        <DashContent>
            <DashContenTitle>{t('title')}</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <ApplicationStat status={status} sort={sort} />
            </Suspense>
            <DashContentAction>
                <Evaluate />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <ApplicationsTable page={page} status={status} sort={sort} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <ApplicationPagination currentPage={parseInt(page)} />
            </Suspense>
        </DashContent>
    );
}


