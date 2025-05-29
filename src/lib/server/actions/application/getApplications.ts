'use server'

import { ApplicationResponse } from '@/lib/server/types/application/application'
import axiosInstance from '@/lib/server/tools/axios'

export async function getApplications(page: number = 1, status: string = '', sort: string = ''): Promise<ApplicationResponse> {
    try {
        const { data } = await axiosInstance.get<ApplicationResponse>(
            `/applications?page=${page}&status=${status}&sort=${sort}`
        )
        return data
    } catch (error) {
        console.error('Error fetching applications:', error)
        throw error
    }
}