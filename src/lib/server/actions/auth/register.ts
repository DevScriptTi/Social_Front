'use server'

import { RegisterData, RegisterResponseError } from "../../types/auth/register/Register"
import axios from "axios"
import { createSession } from "../../tools/session"
import { revalidatePath } from "next/cache"

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
})

export async function register({ data }: { data: RegisterData }): Promise<{ error?: RegisterResponseError, success?: boolean }> {
    try {
        await axiosInstance.post('/auth/register', data)        
        return { success: true }
    } catch (error) {
        console.error('Register error:', error)
        if (axios.isAxiosError(error) && error.response?.data) {
            return { error: error.response.data as RegisterResponseError }
        }
        return {
            error: {
                message: "An unexpected error occurred",
                errors: {}
            }
        }
    }
} 