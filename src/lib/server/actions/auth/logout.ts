'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function logout(): Promise<{ success: boolean }> {
    try {
        
        await axiosInstance.post('/auth/logout')
        // // Delete session cookie
        const cookieStore = await cookies()
        cookieStore.delete('session')
        cookieStore.delete('token')
        
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        console.error('Error logging out:', error?.response?.data)
        throw error?.response?.data
    }
}
