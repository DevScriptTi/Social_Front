'use server'

import { CommitteeResponse } from '@/lib/server/types/committee/committee'
import axiosInstance from '@/lib/server/tools/axios'

export async function getCommittees(page: number = 1): Promise<CommitteeResponse> {
    try {
        const { data } = await axiosInstance.get<CommitteeResponse>(
            `/committees?page=${page}`
        )
        return data
    } catch (error) {
        console.error('Error fetching committees:', error)
        throw error
    }
} 