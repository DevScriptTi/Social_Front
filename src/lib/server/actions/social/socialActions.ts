'use server'

import {
    Social,
    CreateSocialRequest,
    SocialErrorResponse
} from '@/lib/server/types/social/social'
import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'

// Social actions...

export async function createSocial(socialData: CreateSocialRequest): Promise<Social | SocialErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Social>(
            `/socials`,
            socialData
        )
        revalidatePath('/dashboard/socials')
        return data
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data as SocialErrorResponse
        }
        throw error
    }
}

export async function updateSocial(id: number, socialData: Partial<CreateSocialRequest>): Promise<Social | SocialErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Social>(
            `/socials/${id}`,
            socialData
        )
        revalidatePath('/dashboard/socials')
        return data
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data as SocialErrorResponse
        }
        throw error
    }
}

export async function deleteSocial(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/socials/${id}`)
        revalidatePath('/dashboard/socials')
        return { success: true }
    } catch (error) {
        console.error('Error deleting social:', error)
        throw error
    }
}

export async function createSocialKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/socials/${id}/generate-key`)
        revalidatePath('/dashboard/socials')
        return { success: true }
    } catch (error: any) {
        console.error('Error creating social key:', error.response?.data)
        throw error
    }
} 