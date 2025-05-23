'use client';
import { useForm } from "react-hook-form";
import { Input } from "../../components/global/Inputs/inputs";
import Button from "../../components/global/Buttons/Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SimpleSelect } from "../../components/global/Inputs/SimpleSelect";
import { professional } from "@/lib/server/actions/join/applicant";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const nationalCardSchema = z.object({
    is_employed: z.enum(["yes", "no"]),
    work_nature: z.enum(["public sector", "private sector", "unstable"]),
    current_job: z.string(),
    monthly_income: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Monthly income must be a valid number",
    }),
});

type NationalCardFormData = z.infer<typeof nationalCardSchema>;

export default function Step2Form({ applicationResponse }: { applicationResponse: ApplicationResponse | { success: false } }) {
    const application = applicationResponse.success === false ? null : applicationResponse.application;
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted } } = useForm<NationalCardFormData>({
        resolver: zodResolver(nationalCardSchema),
        defaultValues: application ? {
            is_employed: application.professional.is_employed,
            work_nature: application.professional.work_nature,
            current_job: application.professional.current_job,
            monthly_income: application.professional.monthly_income,
        } : {}
    });
    const onSubmit = async (data: NationalCardFormData) => {
        await professional(data);
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
        >
            {isSubmitted && <div className="flex items-center justify-center gap-2 my-2 text-green-700 dark:text-green-400">
                <CheckCircle size={24} />
                <p>Professional status submitted successfully</p>
            </div>}
            <div className="flex gap-4">
                <SimpleSelect
                    error={errors?.is_employed?.message}
                    title="Is employed"
                    label="is employed"
                    register={register("is_employed")}
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </SimpleSelect>
                <SimpleSelect
                    error={errors?.work_nature?.message}
                    title="Work Nature"
                    label="work_nature"
                    register={register("work_nature")}
                >
                    <option value="public sector">Public sector</option>
                    <option value="private sector">Private sector</option>
                    <option value="unstable">Unstable</option>
                </SimpleSelect>
            </div>
            <div className="flex gap-4">
                <Input<NationalCardFormData>
                    error={errors?.current_job?.message}
                    title="Current job"
                    label="current_job"
                    register={register}
                    placeholder="Enter Your Current job"
                />
                <Input<NationalCardFormData>
                    error={errors?.monthly_income?.message}
                    title="Monthly income"
                    label="monthly_income"
                    register={register}
                    placeholder="Enter Your Monthly Income"
                />
            </div>
            <div className=" flex gap-3">
                {isSubmitting ?
                    <Button icon={<Loader2 size={24} />} type="submit" mode="filled">Save</Button>
                    :
                    <Button type="submit" mode="filled">Save</Button>
                }

                <Link href="/join/step3">
                    <Button mode="outlined">Next</Button>
                </Link>
            </div>
        </form>
    )
}