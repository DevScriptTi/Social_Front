import { DashContent, DashContentAction, DashContenTitle, DashContentPagination, DashContentPaginationItem, DashContentPaginationSkeleton, DashContentStat, DashContentStatItem, DashContentStatItemSkeleton, DashContentTable, DashContentTableSkeleton, TableTd, TableTdMain, TableThead, TableTr } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getSocialApplications } from "./applicationSocialAction";
import { File } from "lucide-react";
import EvaluateApplication from "./EvaluateApplication";
interface PageProps {
    searchParams: { page?: string }
    params: { social: string }
}

export default async function page({ searchParams, params }: PageProps) {
    const page = (await searchParams).page || "1";
    const t = await getTranslations('Dashboard.content.applications');
    const socialId = parseInt((await params).social);
    return (
        <DashContent>
            <DashContenTitle>social {socialId}</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <SocialApplicationsStat socialId={socialId} />
            </Suspense>
            <DashContentAction>
                <EvaluateApplication socialId={socialId} />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <SocialApplicationsTable socialId={socialId} page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <SocialApplicationsPagination social_id={socialId} currentPage={parseInt(page)} />
            </Suspense>
        </DashContent>
    );
}

async function SocialApplicationsStat({ socialId }: { socialId: number }) {
    const t = await getTranslations('Dashboard.content.applications.stat');
    const Applications = await getSocialApplications(socialId, 1);
    return (
        <DashContentStat>
            <DashContentStatItem title={t('title')} icon={<File size={80} />} value={Applications.data.total.toString()} />
        </DashContentStat>
    )
}

async function SocialApplicationsTable({ socialId, page }: { socialId: number, page: string }) {
    const t = await getTranslations('Dashboard.content.applications.table');
    const Applications = await getSocialApplications(socialId, parseInt(page));
    return (
        <DashContentTable>
            <TableThead list={[t('key'), t('date'), t('status'), t('grade'), t('name'), t('date_of_birth'), t('national_id_number')]} />
            <tbody>
                {Applications.data.data.map((Application) => (
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
                    </TableTr>
                ))}
            </tbody>
        </DashContentTable>
    )
}

interface ApplicationPaginationProps {
    currentPage: number;
    social_id: number;
}

async function SocialApplicationsPagination({ social_id, currentPage }: ApplicationPaginationProps) {
    try {
        const response = await getSocialApplications(social_id, currentPage);



        if (!response || !response.data.data || !response.data.links) {
            return null;
        }

        return (
            <DashContentPagination>
                {/* Previous button */}
                {response.data.prev_page_url && (
                    <DashContentPaginationItem
                        href={`/dashboard/socials/${social_id}?page=${currentPage - 1}`}
                    >
                        Previous
                    </DashContentPaginationItem>
                )}

                {/* Page numbers */}
                {response.data.links.slice(1, -1).map((link, index) => (
                    link.url && (
                        <DashContentPaginationItem
                            key={index}
                            href={`/dashboard/socials/${social_id}?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                        >
                            {link.label}
                        </DashContentPaginationItem>
                    )
                ))}

                {/* Next button */}
                {response.data.next_page_url && (
                    <DashContentPaginationItem
                        href={`/dashboard/socials/${social_id}?page=${currentPage + 1}`}
                    >
                        Next
                    </DashContentPaginationItem>
                )}
            </DashContentPagination>
        )
    } catch (error) {
        console.error('Error in ApplicationPagination:', error);
        return null;
    }
} 

