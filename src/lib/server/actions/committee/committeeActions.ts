'use server'

import { Committee, CreateCommitteeRequest, CommitteeErrorResponse } from '@/lib/server/types/committee/committee'
import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'

export async function createCommittee(committeeData: CreateCommitteeRequest): Promise<Committee | CommitteeErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Committee>(
            `/committees`,
            committeeData
        )
        revalidatePath('/dashboard/committees')
        return data
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data as CommitteeErrorResponse
        }
        throw error
    }
}

export async function updateCommittee(id: number, committeeData: Partial<CreateCommitteeRequest>): Promise<Committee | CommitteeErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Committee>(
            `/committees/${id}`,
            committeeData
        )
        revalidatePath('/dashboard/committees')
        return data
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data as CommitteeErrorResponse
        }
        throw error
    }
}

export async function deleteCommittee(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/committees/${id}`)
        revalidatePath('/dashboard/committees')
        return { success: true }
    } catch (error) {
        console.error('Error deleting committee:', error)
        throw error
    }
}

export async function createCommitteeKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/committees/${id}/generate-key`)
        revalidatePath('/dashboard/committees')
        return { success: true }
    } catch (error: any) {
        console.error('Error creating committee key:', error.response?.data)
        throw error
    }
} 