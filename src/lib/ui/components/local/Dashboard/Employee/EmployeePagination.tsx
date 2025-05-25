import { EmployeeResponse } from "@/lib/server/types/employee/employee"
import { DashContentPagination, DashContentPaginationItem } from "../DashCrudContent"
import { getEmployees } from "@/lib/server/actions/employee/getEmployees";
import { getTranslations } from "next-intl/server";
interface EmployeePaginationProps {
    currentPage: number;
}

export default async function EmployeePagination({ currentPage }: EmployeePaginationProps) {
    try {
        const response = await getEmployees(currentPage);
        const t = await getTranslations('Dashboard.content.employees');
        if (!response || !response.data || !response.data.links) {
            return null;
        }

        return (
            <DashContentPagination>
                {/* Previous button */}
                {response.data.prev_page_url && (
                    <DashContentPaginationItem 
                        href={`/dashboard/employees?page=${currentPage - 1}`}
                    >
                        {t('previous')} 
                    </DashContentPaginationItem>
                )}

                {/* Page numbers */}
                {response.data.links.slice(1, -1).map((link, index) => (
                    link.url && (
                        <DashContentPaginationItem 
                            key={index} 
                            href={`/dashboard/employees?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                        >
                            {link.label}
                        </DashContentPaginationItem>
                    )
                ))}

                {/* Next button */}
                {response.data.next_page_url && (
                    <DashContentPaginationItem 
                        href={`/dashboard/employees?page=${currentPage + 1}`}
                    >
                        {t('next')}
                    </DashContentPaginationItem>
                )}
            </DashContentPagination>
        )
    } catch (error) {
        console.error('Error in EmployeePagination:', error);
        return null;
    }
} 