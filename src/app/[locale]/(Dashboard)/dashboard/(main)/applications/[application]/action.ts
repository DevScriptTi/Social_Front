"use server"
import axiosInstance from "@/lib/server/tools/axios";
import { ApplicationResponse } from "@/lib/server/types/join/applicationUpdate";

export async function acceptOrRejectApplication(applicationData: ApplicationResponse) {
    try {
        await axiosInstance.put(`applications/${applicationData.application.key}`);
    } catch (error) {
        console.log(error);
    }
}

