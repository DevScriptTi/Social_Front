import { DashContent, DashContenTitle } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import UpdateAdminm from "@/lib/ui/forms/admin/update";

export default async function EditAdminPage({ params }: { params: { admin: string } }) {
    return (
        <DashContent>
            <DashContenTitle>Edit Admin</DashContenTitle>
            <div className="mb-5"></div>
            <UpdateAdminm admin={Number((await params).admin)} />
        </DashContent>
    )
}