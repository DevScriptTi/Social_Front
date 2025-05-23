'use server'

import axiosInstance from '@/lib/server/tools/axios'
import axios from 'axios';

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

export interface AllCommittee {
    id: number;
    username: string;
    name: string;
    last: string;
    date_of_birth: string;
    created_at: string;
    updated_at: string;
    daira_id: number;
    daira: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        wilaya_id: number;
    };
}

export interface CommitteeResponse {
    committees: Committee[];
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

export async function getCommittees(): Promise<CommitteeResponse> {
    try {
        const { data } = await axios.get<CommitteeResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/committeesAll`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        return data
    } catch (error) {
        console.error('Error fetching committees:', error)
        throw error
    }
} 