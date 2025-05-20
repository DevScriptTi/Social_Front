import { getAdmins } from "@/lib/server/actions/admin/getAdmins";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "../DashCrudContent";
import AdminActions from "@/lib/ui/forms/admin/actions";
import CreateAdminKey from "@/lib/ui/forms/admin/createKey";

interface AdminsTableProps {
    page: string;
}

export default async function AdminsTable({ page }: AdminsTableProps) {
    const currentPage = parseInt(page) || 1;
    const admins = await getAdmins(currentPage);

    return (
        <>
            <DashContentTable>
                <TableThead list={['Username', 'Key', 'Name', 'Last', 'Email', 'Settings']} />
                <tbody>
                    {admins?.data.map((admin) => (
                        <TableTr key={admin.id}>
                            <TableTdMain value={admin.username} />
                            <TableTd>
                                {admin.key?.value || <CreateAdminKey admin={admin} />}
                            </TableTd>
                            <TableTd>
                                {admin.name}
                            </TableTd>
                            <TableTd>
                                {admin.last}
                            </TableTd>
                            <TableTd>
                                {admin.key?.user?.email || 'No Account'}
                            </TableTd>
                            <TableTd>
                                <AdminActions admin={admin} />
                            </TableTd>
                        </TableTr>
                    ))}
                </tbody>
            </DashContentTable>
        </>
    )
}

