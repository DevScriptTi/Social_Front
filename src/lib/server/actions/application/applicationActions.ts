'use server'


import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'
import { Application } from '../../types/application/application'

// Application actions...

// export async function createApplication(applicationData: CreateApplicationRequest): Promise<Application | ApplicationErrorResponse> {
//     try {
//         const { data } = await axiosInstance.post<Application>(
//             `/applications`,
//             applicationData
//         )
//         revalidatePath('/dashboard/applications')
//         return data
//     } catch (error: any) {
//         if (error.response?.data) {
//             return error.response.data as ApplicationErrorResponse
//         }
//         throw error
//     }
// }

// export async function updateApplication(id: number, applicationData: Partial<CreateApplicationRequest>): Promise<Application | ApplicationErrorResponse> {
//     try {
//         const { data } = await axiosInstance.put<Application>(
//             `/applications/${id}`,
//             applicationData
//         )
//         revalidatePath('/dashboard/applications')
//         return data
//     } catch (error: any) {
//         if (error.response?.data) {
//             return error.response.data as ApplicationErrorResponse
//         }
//         throw error
//     }
// }

// export async function deleteApplication(id: number): Promise<{ success: boolean }> {
//     try {
//         await axiosInstance.delete(`/applications/${id}`)
//         revalidatePath('/dashboard/applications')
//         return { success: true }
//     } catch (error) {
//         console.error('Error deleting application:', error)
//         throw error
//     }
// }

// export async function createApplicationKey(id: number): Promise<{ success: boolean; key?: string }> {
//     try {
//         await axiosInstance.post<{ key: string }>(`/applications/${id}/generate-key`)
//         revalidatePath('/dashboard/applications')
//         return { success: true }
//     } catch (error: any) {
//         console.error('Error creating application key:', error.response?.data)
//         throw error
//     }
// } 