'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { ApplicationsResponse } from './applicationSocialType'
export async function getSocialApplications(socialId: number, page: number = 1): Promise<ApplicationsResponse> {
    try {
        const { data } = await axiosInstance.get<ApplicationsResponse>(
            `/socials/${socialId}/applications?page=${page}`
        )
        return data
    } catch (error) {
        console.error('Error fetching applications:', error)
        throw error
    }
}


export async function evaluateApplication(socialId: number) {
    try {
        await axiosInstance.get(`/socials/${socialId}/evalute`)
    } catch (error) {
        console.error('Error evaluating application:', error.response.data)
        throw error
    }   
}