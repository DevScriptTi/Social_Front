'use server';

import { cookies } from "next/headers";
import { NationalCard } from "../../types/join/NationalCard";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

export async function getNationalCard({ national_card_id }: { national_card_id: string }): Promise<{ success: boolean, key?: string, step?: number, errors?: string }> {
    const cookieStore = await cookies();
    const application_key = cookieStore.get('application_key');
    
    if (application_key?.value != national_card_id) {
        try {
            const { data }: { data: NationalCard } = await axiosInstance.post('/applications', {
                "national_id_number": national_card_id
            });
            
            const { key, step } = data.application;
            cookieStore.set('application_key', key);
            cookieStore.set('step', step.toString());
            
            return {
                success: true,
                key,
                step
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data);
                return {
                    success: false,
                    errors: error.response?.data?.message || 'An error occurred'
                };
            }
            console.error('Unexpected error:', error);
            return {
                success: false,
                errors: 'An unexpected error occurred'
            };
        }
    } else {
        // Handle case when application_key already exists
        return {
            success: true,
            key: application_key.value
        };
    }
}
