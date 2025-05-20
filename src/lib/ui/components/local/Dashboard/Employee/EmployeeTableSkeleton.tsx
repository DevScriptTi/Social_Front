import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "../DashCrudContent";

export default function CommitteeTableSkeleton() {
    return (
        <DashContentTable>
            <TableThead list={['Username', 'Name', 'Last', 'Key', 'Email', 'Wilaya', 'Employees', 'Applicants', 'Settings']} />
            <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TableTr key={index}>
                        <TableTdMain value="" />
                        <TableTd>
                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableTd>
                        <TableTd>
                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableTd>
                        <TableTd>
                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableTd>
                        <TableTd>
                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableTd>
                        <TableTd>
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableTd>
                        <TableTd>
                            <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableTd>
                        <TableTd>
                            <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableTd>
                        <TableTd>
                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableTd>
                    </TableTr>
                ))}
            </tbody>
        </DashContentTable>
    );
} 