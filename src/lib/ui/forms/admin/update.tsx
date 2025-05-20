import { getAdmin } from "@/lib/server/actions/admin/getAdmin";
import UpdateAdminForm from "./UpdateForm";
import { Suspense } from "react";
import AdminUpdateSkeleton from "@/lib/ui/components/local/Dashboard/Admin/AdminUpdateSkeleton";

export default async function UpdateAdmin({ admin }: { admin: number }) {
    return (
        <Suspense fallback={<AdminUpdateSkeleton />}>
            <UpdateAdminContent admin={admin} />
        </Suspense>
    );
}

async function UpdateAdminContent({ admin }: { admin: number }) {
    const admin_ = await getAdmin(Number(admin));

    return <UpdateAdminForm admin={admin_} />;
}
