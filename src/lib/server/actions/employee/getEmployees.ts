'use server'

import { EmployeeResponse } from '@/lib/server/types/employee/employee'
import axiosInstance from '@/lib/server/tools/axios'

export async function getEmployees(page: number = 1): Promise<EmployeeResponse> {
    try {
        const { data } = await axiosInstance.get<EmployeeResponse>(
            `/employees?page=${page}`
        )
        return data
    } catch (error) {
        console.error('Error fetching employees:', error)
        throw error
    }
}