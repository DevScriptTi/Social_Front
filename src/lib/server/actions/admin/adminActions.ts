'use server'

import { Admin, CreateAdminRequest, AdminErrorResponse } from '@/lib/server/types/admin/admin'
import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'

export async function createAdmin(adminData: CreateAdminRequest): Promise<Admin | AdminErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Admin>(
            `/admins`,
            adminData
        )
        revalidatePath('/dashboard')
        return data
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data as AdminErrorResponse
        }
        throw error
    }
}

export async function updateAdmin(id: number, adminData: Partial<CreateAdminRequest>): Promise<Admin | AdminErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Admin>(
            `/admins/${id}`,
            adminData
        )
        revalidatePath('/dashboard')
        return data
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data as AdminErrorResponse
        }
        throw error
    }
}

export async function deleteAdmin(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/admins/${id}`)
        revalidatePath('/dashboard')
        return { success: true }
    } catch (error) {
        console.error('Error deleting admin:', error)
        throw error
    }
}

export async function createAdminKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/admins/${id}/generate-key`)
        revalidatePath('/dashboard')
        return { success: true }
    } catch (error: any) {
        console.error('Error creating admin key:', error.response?.data)
        throw error
    }
} 