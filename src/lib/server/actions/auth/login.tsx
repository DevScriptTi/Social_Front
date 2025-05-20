"use server";

import { LoginData, LoginResponseError } from "../../types/auth/login/Login";
import axios from "axios";
import { createSession } from "../../tools/session";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

export async function login({ data }: { data: LoginData }): Promise<{ error?: LoginResponseError, success?: boolean }> {
    try {
        console.log(data);
        const response = await axiosInstance.post('/auth/login', data);
        const { token, user } = response.data;
        await createSession(user.id.toString(), token);
        return { success: true };
    } catch (error) {
        // console.error('Login error:', error.response.data);
        if (axios.isAxiosError(error) && error.response?.data) {
            return { error: error.response.data as LoginResponseError };
        }
        return {
            error: {
                message: "An unexpected error occurred",
                errors: {}
            }
        };
    }
}