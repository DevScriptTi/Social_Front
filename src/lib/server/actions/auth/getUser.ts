'use server'

import axios from "axios"
import { User, UserResponse } from "../../types/auth/user/User"
import { cookies } from "next/headers"
import { decrypt } from "../../tools/session"

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
})

export async function getUser(): Promise<{ user?: User, error?: string }> {
    try {
        const cookie = (await cookies()).get("session")?.value;
        const session = await decrypt(cookie);
        const token = session?.token;

        if (!token) {
            return { error: "No authentication token found" }
        }

        const response = await axiosInstance.get<UserResponse>('/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return { user: response.data.user }
    } catch (error: any) {
        console.error('Error fetching user:', error?.response?.data)
        if (axios.isAxiosError(error) && error.response?.data) {
            return { error: error.response.data.message }
        }
        return { error: "Failed to fetch user data" }
    }
} 