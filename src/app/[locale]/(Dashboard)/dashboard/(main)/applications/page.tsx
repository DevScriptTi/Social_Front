import { getApplications } from "@/lib/server/actions/application/getApplications";
import { DashContent, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import ApplicationPagination from "@/lib/ui/components/local/Dashboard/Application/ApplicationPagination";
import ApplicationsTable from "@/lib/ui/components/local/Dashboard/Application/ApplicationsTable";
import ApplicationStat from "@/lib/ui/components/local/Dashboard/Application/ApplicationStat";
import { Suspense } from "react";

interface PageProps {
    searchParams: { page?: string }
}

export default async function page({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const committees = await getApplications(parseInt(page));
    return (
        <DashContent>
            <DashContenTitle>Applications</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <ApplicationStat />
            </Suspense>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <ApplicationsTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <ApplicationPagination currentPage={parseInt(page)} />
            </Suspense>
        </DashContent>
    );
}


