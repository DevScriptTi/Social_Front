'use server'

import axiosInstance from '@/lib/server/tools/axios'

export interface Wilaya {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    dairas: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        wilaya_id: number;
    }[];
}

export interface committee {
    id: number;
    name: string;
}

export interface WilayasResponse {
    wilayas: Wilaya[];
}

export async function getWilayas(): Promise<WilayasResponse> {
    try {
        const { data } = await axiosInstance.get<WilayasResponse>('/wilayas')
        return data
    } catch (error) {
        console.error('Error fetching wilayas:', error)
        throw error
    }
} 