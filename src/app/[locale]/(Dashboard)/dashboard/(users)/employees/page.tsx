import Button from "@/lib/ui/components/global/Buttons/Button";
import { DashContent, DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import EmployeePagination from "@/lib/ui/components/local/Dashboard/Employee/EmployeePagination";
import EmployeesTable from "@/lib/ui/components/local/Dashboard/Employee/EmployeesTable";
import EmployeeStat from "@/lib/ui/components/local/Dashboard/Employee/EmployeeStat";
import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    searchParams: { page?: string }
}

export default async function page({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const t = await getTranslations('Dashboard.content.employees');
    return (
        <DashContent>
            <DashContenTitle>{t('title')}</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <EmployeeStat />
            </Suspense>
            <DashContentAction>
                <CreateEmployee />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <EmployeesTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <EmployeePagination currentPage={parseInt(page)} />
            </Suspense>
        </DashContent>
    );
}


async function CreateEmployee() {
    const t = await getTranslations('Dashboard.content.employees');
    return (
        <Link href="/dashboard/employees/create">
            <Button mode="filled" icon={<Plus />}>
                {t('create')}
            </Button>
        </Link>
    )
}