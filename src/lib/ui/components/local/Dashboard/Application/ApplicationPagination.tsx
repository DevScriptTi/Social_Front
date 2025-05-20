import { ApplicationResponse } from "@/lib/server/types/application/application"
import { DashContentPagination, DashContentPaginationItem } from "../DashCrudContent"
import { getApplications } from "@/lib/server/actions/application/getApplications";

interface ApplicationPaginationProps {
    currentPage: number;
}

export default async function ApplicationPagination({ currentPage }: ApplicationPaginationProps) {
    try {
        const response = await getApplications(currentPage);

        if (!response || !response.applications.data || !response.applications.links) {
            return null;
        }

        return (
            <DashContentPagination>
                {/* Previous button */}
                {response.applications.prev_page_url && (
                    <DashContentPaginationItem
                        href={`/dashboard/applications?page=${currentPage - 1}`}
                    >
                        Previous
                    </DashContentPaginationItem>
                )}

                {/* Page numbers */}
                {response.applications.links.slice(1, -1).map((link, index) => (
                    link.url && (
                        <DashContentPaginationItem
                            key={index}
                            href={`/dashboard/applications?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                        >
                            {link.label}
                        </DashContentPaginationItem>
                    )
                ))}

                {/* Next button */}
                {response.applications.next_page_url && (
                    <DashContentPaginationItem
                        href={`/dashboard/applications?page=${currentPage + 1}`}
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