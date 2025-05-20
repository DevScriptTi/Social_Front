'use server'

import { AdminResponse } from '@/lib/server/types/admin/admin'
import axiosInstance from '@/lib/server/tools/axios'

export async function getAdmins(page: number = 1): Promise<AdminResponse> {
    try {
        const { data } = await axiosInstance.get<AdminResponse>(`/admins?page=${page}`)
        return data
    } catch (error) {
        console.error('Error fetching admins:', error.response.data)
        throw error.response.data
    }
} 