'use server'

import {
    Employee,
    CreateEmployeeRequest,
    EmployeeErrorResponse
} from '@/lib/server/types/employee/employee'
import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'

// Employee actions...

export async function createEmployee(employeeData: CreateEmployeeRequest): Promise<Employee | EmployeeErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Employee>(
            `/employees`,
            employeeData
        )
        revalidatePath('/dashboard/employees')
        return data
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data as EmployeeErrorResponse
        }
        throw error
    }
}

export async function updateEmployee(id: number, employeeData: Partial<CreateEmployeeRequest>): Promise<Employee | EmployeeErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Employee>(
            `/employees/${id}`,
            employeeData
        )
        revalidatePath('/dashboard/employees')
        return data
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data as EmployeeErrorResponse
        }
        throw error
    }
}

export async function deleteEmployee(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/employees/${id}`)
        revalidatePath('/dashboard/employees')
        return { success: true }
    } catch (error) {
        console.error('Error deleting employee:', error)
        throw error
    }
}

export async function createEmployeeKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/employees/${id}/generate-key`)
        revalidatePath('/dashboard/employees')
        return { success: true }
    } catch (error: any) {
        console.error('Error creating employee key:', error.response?.data)
        throw error
    }
} 