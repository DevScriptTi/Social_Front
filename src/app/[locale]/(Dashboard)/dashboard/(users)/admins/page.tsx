import { getAdmins } from "@/lib/server/actions/admin/getAdmins";
import Button from "@/lib/ui/components/global/Buttons/Button";
import DashSection from "@/lib/ui/components/global/Section/Section";
import AdminPagination from "@/lib/ui/components/local/Dashboard/Admin/AdminPagination";
import AdminsTable from "@/lib/ui/components/local/Dashboard/Admin/AdminsTable";
import AdminStat from "@/lib/ui/components/local/Dashboard/Admin/AdminStat";
import { DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    searchParams: { page?: string }
}

export default async function AdminPage({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const admins = await getAdmins(parseInt(page));

    return (
        <DashSection>
            <DashContenTitle>Admins</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <AdminStat />
            </Suspense>
            <DashContentAction>
                <CreateAdmin />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <AdminsTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <AdminPagination data={admins} currentPage={parseInt(page)} />
            </Suspense>
        </DashSection>
    )
}

function CreateAdmin() {
    return (
        <Link href="/dashboard/admins/create">
            <Button mode="filled" icon={<Plus />}>
                Create Admin
            </Button>
        </Link>
    )
}