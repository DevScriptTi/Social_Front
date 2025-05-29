import { getSocials } from "@/lib/server/actions/social/getSocials";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "../DashCrudContent";
import SocialActions from "@/lib/ui/forms/social/actions";
import { getTranslations } from "next-intl/server";
interface SocialsTableProps {
    page: string;
}

export default async function SocialsTable({ page }: SocialsTableProps) {
    try {
        const currentPage = parseInt(page) || 1;
        const response = await getSocials(currentPage);

        if (!response || !response.data || !response.data.data) {
            return null;
        }

        const Socials = response.data.data;
        const t = await getTranslations('Dashboard.content.socials.table');
        return (
            <>
                <DashContentTable>
                    <TableThead list={[t('name'), t('max_application'), t('number_of_application'), t('created_at'), t('updated_at'), t('settings')]} />
                    <tbody>
                        {Socials.map((Social) => (
                            <TableTr key={Social.id}>
                                <TableTdMain value={Social.name} />
                                <TableTd>
                                    {Social.max_application}
                                </TableTd>
                                <TableTd>
                                    {Social.number_of_application}
                                </TableTd>
                                
                                <TableTd>
                                    {Social.created_at}
                                </TableTd>
                                <TableTd>
                                    {Social.updated_at}
                                </TableTd>
                                <TableTd>
                                    <SocialActions Social={Social} />
                                </TableTd>
                            </TableTr>
                        ))}
                    </tbody>
                </DashContentTable>
            </>
        )
    } catch (error) {
        console.error('Error in SocialsTable:', error);
        return null;
    }
} 