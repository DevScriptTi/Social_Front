import { CommitteeResponse } from "@/lib/server/types/committee/committee"
import { DashContentPagination, DashContentPaginationItem } from "../DashCrudContent"
import { getCommittees } from "@/lib/server/actions/committee/getCommittees";
import { getTranslations } from "next-intl/server";

interface CommitteePaginationProps {
    currentPage: number;
}

export default async function CommitteePagination({ currentPage }: CommitteePaginationProps) {
    const t = await getTranslations('Dashboard.content.committees');
    try {
        const response = await getCommittees(currentPage);

        if (!response || !response.data || !response.data.links) {
            return null;
        }

        return (
            <DashContentPagination>
                {/* Previous button */}
                {response.data.prev_page_url && (
                    <DashContentPaginationItem 
                        href={`/dashboard/committees?page=${currentPage - 1}`}
                    >
                        {t('previous')}
                    </DashContentPaginationItem>
                )}

                {/* Page numbers */}
                {response.data.links.slice(1, -1).map((link, index) => (
                    link.url && (
                        <DashContentPaginationItem 
                            key={index} 
                            href={`/dashboard/committees?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                        >
                            {link.label}
                        </DashContentPaginationItem>
                    )
                ))}

                {/* Next button */}
                {response.data.next_page_url && (
                    <DashContentPaginationItem 
                        href={`/dashboard/committees?page=${currentPage + 1}`}
                    >
                        {t('next')}
                    </DashContentPaginationItem>
                )}
            </DashContentPagination>
        )
    } catch (error) {
        console.error('Error in CommitteePagination:', error);
        return null;
    }
} 