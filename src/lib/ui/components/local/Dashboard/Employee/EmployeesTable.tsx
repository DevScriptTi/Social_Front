import { getEmployees } from "@/lib/server/actions/employee/getEmployees";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "../DashCrudContent";
import EmployeeActions from "@/lib/ui/forms/employee/actions";
import CreateEmployeeKey from "@/lib/ui/forms/employee/createKey";

interface EmployeesTableProps {
    page: string;
}

export default async function EmployeesTable({ page }: EmployeesTableProps) {
    try {
        const currentPage = parseInt(page) || 1;
        const response = await getEmployees(currentPage);

        if (!response || !response.data || !response.data.data) {
            return null;
        }

        const Employees = response.data.data;

        return (
            <>
                <DashContentTable>
                    <TableThead list={['Username', 'Name', 'Last', 'Key', 'Email', 'Wilaya-Daira', 'committee', 'Applicants', 'Settings']} />
                    <tbody>
                        {Employees.map((Employee) => (
                            <TableTr key={Employee.id}>
                                <TableTdMain value={Employee.username} />
                                <TableTd>
                                    {Employee.name}
                                </TableTd>
                                <TableTd>
                                    {Employee.last}
                                </TableTd>
                                <TableTd>
                                    {Employee.key?.value || <CreateEmployeeKey employee={Employee} />}
                                </TableTd>
                                <TableTd>
                                    {Employee.key?.user?.email || 'No Account'}
                                </TableTd>
                                <TableTd>
                                    {Employee.daira?.wilaya?.name} - {Employee.daira?.name}
                                </TableTd>
                                <TableTd>
                                    {Employee.committee?.daira?.wilaya?.name} - {Employee.committee?.daira?.name}
                                </TableTd>
                                <TableTd>
                                    {Employee?.applications_count || 0}
                                </TableTd>
                                <TableTd>
                                    <EmployeeActions Employee={Employee} />
                                </TableTd>
                            </TableTr>
                        ))}
                    </tbody>
                </DashContentTable>
            </>
        )
    } catch (error) {
        console.error('Error in EmployeesTable:', error);
        return null;
    }
} 