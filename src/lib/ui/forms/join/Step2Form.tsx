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
import { useTranslations } from "next-intl";
const nationalCardSchema = z.object({
    is_employed: z.enum(["yes", "no"]),
    work_nature: z.enum(["public sector", "private sector", "unstable"]).optional(),
    current_job: z.string().optional(),
    monthly_income: z.string().refine((val) => !val || !isNaN(Number(val)), {
        message: "Monthly income must be a valid number",
    }).optional(),
}).superRefine((data, ctx) => {
    if (data.is_employed === "yes") {
        if (!data.work_nature) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Work nature is required when employed",
                path: ["work_nature"],
            });
        }
        if (!data.current_job) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Current job is required when employed",
                path: ["current_job"],
            });
        }
        if (!data.monthly_income) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Monthly income is required when employed",
                path: ["monthly_income"],
            });
        }
    }
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
    const t = useTranslations('join.step2');
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
        >
            {isSubmitted && <div className="flex items-center justify-center gap-2 my-2 text-green-700 dark:text-green-400">
                <CheckCircle size={24} />
                <p>{t('success')}</p>
            </div>}
            <div className="flex gap-4">
                <SimpleSelect
                    error={errors?.is_employed?.message}
                    title={t('is_employed')}
                    label="is employed"
                    register={register("is_employed")}
                >
                    <option value="yes">{t('yes')}</option>
                    <option value="no">{t('no')}</option>
                </SimpleSelect>
                <SimpleSelect
                    error={errors?.work_nature?.message}
                    title={t('work_nature')}
                    label="work_nature"
                    register={register("work_nature")}
                >
                    <option value="public sector">{t('public_sector')}</option>
                    <option value="private sector">{t('private_sector')}</option>
                    <option value="unstable">{t('unstable')}</option>
                </SimpleSelect>
            </div>
            <div className="flex gap-4">
                <Input<NationalCardFormData>
                    error={errors?.current_job?.message}
                    title={t('current_job')}
                    label="current_job"
                    register={register}
                    placeholder={t('placeholder_current_job')}
                />
                <Input<NationalCardFormData>
                    error={errors?.monthly_income?.message}
                    title={t('monthly_income')}
                    label="monthly_income"
                    register={register}
                    placeholder={t('placeholder_monthly_income')}
                />
            </div>
            <div className=" flex gap-3">
                {isSubmitting ?
                    <Button icon={<Loader2 size={24} />} type="submit" mode="filled">{t('save')}</Button>
                    :
                    <Button type="submit" mode="filled">{t('save')}</Button>
                }

                <Link href="/join/step3">
                    <Button mode="outlined">{t('next')}</Button>
                </Link>
            </div>
        </form>
    )
}