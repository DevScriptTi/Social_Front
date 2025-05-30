'use server';

import { cookies } from "next/headers";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { ApplicantRequest, ApplicationResponse, FileUploadRequest, HealthRequest, HousingRequest, ProfessionalRequest } from "../../types/join/applicationUpdate";
import { Step5FormData } from "@/lib/ui/forms/join/Step5Form";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

// Updated server action
export async function applicant(data: any): Promise<{ success: boolean }> {
    const cookieStore = await cookies();
    const application_key = cookieStore.get('application_key');
    try {
        await axiosInstance.post(`/applications/${application_key?.value}/applicant`, data);
        revalidatePath('/join/step1');
        return { success: true };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.response?.data);
            return { success: false };
        }
        console.error('Unexpected error:', error);
        return { success: false };
    }
}

// Updated server action
export async function professional(data: ProfessionalRequest): Promise<{ success: boolean }> {
    const cookieStore = await cookies();
    const application_key = cookieStore.get('application_key');

    try {
        await axiosInstance.post(`/applications/${application_key?.value}/professional`, data);
        revalidatePath('/join/step2');
        return { success: true };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.response?.data);
            return { success: false };
        }
        console.error('Unexpected error:', error);
        return { success: false };
    }
}

export async function housing(data: HousingRequest): Promise<{ success: boolean }> {
    const cookieStore = await cookies();
    const application_key = cookieStore.get('application_key');

    try {
        await axiosInstance.post(`/applications/${application_key?.value}/housing`, data);
        revalidatePath('/join/step3');
        return { success: true };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.response?.data);
            return { success: false };
        }
        console.error('Unexpected error:', error);
        return { success: false };
    }
}

export async function health(data: HealthRequest): Promise<{ success: boolean }> {
    const cookieStore = await cookies();
    const application_key = cookieStore.get('application_key');

    try {
        await axiosInstance.post(`/applications/${application_key?.value}/health`, data);
        revalidatePath('/join/step3');
        return { success: true };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.response?.data);
            return { success: false };
        }
        console.error('Unexpected error:', error);
        return { success: false };
    }
}

export async function file(data: Step5FormData): Promise<{ success: boolean }> {
    const cookieStore = await cookies();
    const application_key = cookieStore.get('application_key');
    
    if (!application_key?.value) {
      throw new Error('Application key not found');
    }
  
   
  
    try {
      await axiosInstance.post(
        `/applications/${application_key.value}/files`,        
      );
      revalidatePath('/join/step5');
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response?.data);
        throw error; // Re-throw to handle in component
      }
      console.error('Unexpected error:', error);
      throw error;
    }
}

export async function getApplication(): Promise<ApplicationResponse | { success: false }> {
    const cookieStore = await cookies();
    const application_key = cookieStore.get('application_key');
    try {
        const response = await axiosInstance.get(`/applications/${application_key?.value}`);

        return response.data;
    } catch (error) {
        console.error('Error:', error.response?.data);
        return { success: false };
    }
}


export async function getApplicationView(application_key: string): Promise<ApplicationResponse | { success: false }> {
    try {
        const response = await axiosInstance.get(`/applications/${application_key}`);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response?.data);
        return { success: false };
    }
}

