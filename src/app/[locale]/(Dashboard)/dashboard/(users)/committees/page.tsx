import Button from "@/lib/ui/components/global/Buttons/Button";
import DashSection from "@/lib/ui/components/global/Section/Section";
import CommitteePagination from "@/lib/ui/components/local/Dashboard/Committee/CommitteePagination";
import CommitteesTable from "@/lib/ui/components/local/Dashboard/Committee/CommitteesTable";
import CommitteeStat from "@/lib/ui/components/local/Dashboard/Committee/CommitteeStat";
import { DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

interface PageProps {
    searchParams: { page?: string }
}

export default async function page({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const t = await getTranslations('Dashboard.content.committees');            
    return (
        <DashSection>
            <DashContenTitle>{t('title')}</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <CommitteeStat />
            </Suspense>
            <DashContentAction>
                <CreateCommittee />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <CommitteesTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <CommitteePagination currentPage={parseInt(page)} />
            </Suspense>
        </DashSection>
    )
}

async function CreateCommittee() {
    const t = await getTranslations('Dashboard.content.committees');
    return (
        <Link href="/dashboard/committees/create">
            <Button mode="filled" icon={<Plus />}>
                {t('create')}
            </Button>
        </Link>
    )
}