'use server'

import { Admin } from '@/lib/server/types/admin/admin'
import axiosInstance from '@/lib/server/tools/axios'

interface GetAdminResponse {
    message: string;
    admin: Admin;
}

export async function getAdmin(id: number): Promise<Admin> {
    
    try {
        const { data } = await axiosInstance.get<GetAdminResponse>(
            `/admins/${id}`
        )
        return data.admin
    } catch (error) {
        console.error('Error fetching admin:', error)
        throw error
    }
} 