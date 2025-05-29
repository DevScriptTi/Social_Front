import { DashContentPagination, DashContentPaginationItem } from "../DashCrudContent"
import { getSocials } from "@/lib/server/actions/social/getSocials";
import { getTranslations } from "next-intl/server";
interface SocialPaginationProps {
    currentPage: number;
}

export default async function SocialPagination({ currentPage }: SocialPaginationProps) {
    try {
        const response = await getSocials(currentPage);
        const t = await getTranslations('Dashboard.content.socials');
        if (!response || !response.data || !response.data.links) {
            return null;
        }

        return (
            <DashContentPagination>
                {/* Previous button */}
                {response.data.prev_page_url && (
                    <DashContentPaginationItem 
                        href={`/dashboard/socials?page=${currentPage - 1}`}
                    >
                        {t('previous')} 
                    </DashContentPaginationItem>
                )}

                {/* Page numbers */}
                {response.data.links.slice(1, -1).map((link, index) => (
                    link.url && (
                        <DashContentPaginationItem 
                            key={index} 
                            href={`/dashboard/socials?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                        >
                            {link.label}
                        </DashContentPaginationItem>
                    )
                ))}

                {/* Next button */}
                {response.data.next_page_url && (
                    <DashContentPaginationItem 
                        href={`/dashboard/socials?page=${currentPage + 1}`}
                    >
                        {t('next')}
                    </DashContentPaginationItem>
                )}
            </DashContentPagination>
        )
    } catch (error) {
        console.error('Error in SocialPagination:', error);
        return null;
    }
} 