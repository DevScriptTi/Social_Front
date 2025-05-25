import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "../DashCrudContent";
import CommitteeActions from "@/lib/ui/forms/committee/actions";
import CreateCommitteeKey from "@/lib/ui/forms/committee/createKey";
import { getCommittees } from "@/lib/server/actions/committee/getCommittees";
import { getTranslations } from "next-intl/server";
interface CommitteesTableProps {
    page: string;
}

export default async function CommitteesTable({ page }: CommitteesTableProps) {
    try {
        const currentPage = parseInt(page) || 1;
        const response = await getCommittees(currentPage);

        if (!response || !response.data || !response.data.data) {
            return null;
        }

        const committees = response.data.data;
        const t = await getTranslations('Dashboard.content.committees.table');

        return (
            <>
                <DashContentTable>
                    <TableThead list={[t('username'), t('name'), t('last'), t('key'), t('email'), t('wilaya'), t('employees'), t('applicants'), t('settings')]} />
                    <tbody>
                        {committees.map((committee) => (
                            <TableTr key={committee.id}>
                                <TableTdMain value={committee.username} />
                                <TableTd>
                                    {committee.name}
                                </TableTd>
                                <TableTd>
                                    {committee.last}
                                </TableTd>
                                <TableTd>
                                    {committee.key?.value || <CreateCommitteeKey committee={committee} />}
                                </TableTd>
                                <TableTd>
                                    {committee.key?.user?.email || 'No Account'}
                                </TableTd>
                                <TableTd>
                                    {committee.daira.wilaya.name}
                                </TableTd>
                                <TableTd>
                                    {committee.employees_count}
                                </TableTd>
                                <TableTd>
                                    {committee.applicants_count}
                                </TableTd>
                                <TableTd>
                                    <CommitteeActions committee={committee} />
                                </TableTd>
                            </TableTr>
                        ))}
                    </tbody>
                </DashContentTable>
            </>
        )
    } catch (error) {
        console.error('Error in CommitteesTable:', error);
        return null;
    }
} 