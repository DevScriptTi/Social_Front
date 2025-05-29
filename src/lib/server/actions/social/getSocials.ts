'use server'

import { SocialResponse } from '@/lib/server/types/social/social'
import axiosInstance from '@/lib/server/tools/axios'

export async function getSocials(page: number = 1): Promise<SocialResponse> {
    try {
        const { data } = await axiosInstance.get<SocialResponse>(
            `/socials?page=${page}`
        )
        console.log(data)
        return data
    } catch (error) {
        console.error('Error fetching socials:', error)
        throw error
    }
}