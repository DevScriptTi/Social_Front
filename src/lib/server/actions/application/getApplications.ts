'use server'

import { ApplicationResponse } from '@/lib/server/types/application/application'
import axiosInstance from '@/lib/server/tools/axios'

export async function getApplications(page: number = 1): Promise<ApplicationResponse> {
    try {
        const { data } = await axiosInstance.get<ApplicationResponse>(
            `/applications?page=${page}`
        )
        return data
    } catch (error) {
        console.error('Error fetching applications:', error)
        throw error
    }
}