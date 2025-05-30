import { getApplications } from "@/lib/server/actions/application/getApplications";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "../DashCrudContent";
import ApplicationActions from "@/lib/ui/forms/application/actions";
import { getTranslations } from "next-intl/server";
interface ApplicationsTableProps {
    page: string;
    status: string;
    sort: string;
}

export default async function ApplicationsTable({ page, status, sort }: ApplicationsTableProps) {
    try {
        const currentPage = parseInt(page) || 1;
        const response = await getApplications(currentPage, status, sort);

        if (!response || !response.applications.data) {
            return <div className="">
                <h1 className="text-2xl font-bold text-center">No Applications Found</h1>
                <p className="text-center">Please check back later.</p>
            </div>;
        }

        const Applications = response.applications.data;
        const t = await getTranslations('Dashboard.content.applications.table');
        return (
            <>
                <DashContentTable>
                    <TableThead list={[t('key'), t('date'), t('status'), t('grade'), t('name'), t('date_of_birth'), t('national_id_number'), t('settings')]} />
                    <tbody>
                        {Applications.map((Application) => (
                            <TableTr key={Application.id}>
                                <TableTdMain value={Application.key} />
                                <TableTd>
                                    {Application.date}
                                </TableTd>
                                <TableTd>
                                    {
                                        Application.status === 'pending' && <span className="text-yellow-700 dark:text-yellow-400">{t('pending')}</span> ||
                                        Application.status === 'on-review' && <span className="text-blue-700 dark:text-blue-400">{t('completed')}</span> ||
                                        Application.status === 'not-classed' && <span className="text-orange-700 dark:text-orange-400">{t('accepted')}</span> ||
                                        Application.status === 'accepted' && <span className="text-green-700 dark:text-green-400">{t('classed')}</span> ||
                                        Application.status === 'denied' && <span className="text-red-700 dark:text-red-400">{t('denied')}</span>
                                    }
                                </TableTd>
                                <TableTd>
                                    {Application.grade}
                                </TableTd>
                                <TableTd>
                                    {Application.applicant.name} {' '} {Application.applicant.last}
                                </TableTd>
                                <TableTd>
                                    {Application.applicant.date_of_birth}
                                </TableTd>
                                <TableTd>
                                    {Application.applicant.national_id_number}
                                </TableTd>
                                <TableTd>
                                    <ApplicationActions Application={Application} />
                                </TableTd>
                            </TableTr>
                        ))}
                    </tbody>
                </DashContentTable>
            </>
        )
    } catch (error) {
        console.error('Error in ApplicationsTable:', error);
        return null;
    }
} 