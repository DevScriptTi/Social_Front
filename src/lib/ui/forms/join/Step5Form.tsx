'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { FileInput } from "../../components/global/Inputs/InputFile";
import Button from "../../components/global/Buttons/Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { file } from "@/lib/server/actions/join/applicant";
const step5Schema = z.object({
    birth_certificate: z.any(),
    spouse_birth_certificate: z.any(),
    family_individual_certificate: z.any(),
    applicant_national_id: z.any(),
    spouse_national_id: z.any(),
    residence_certificate: z.any(),
    employment_unemployment_certificate: z.any(),
    spouse_employment_certificate: z.any(),
    spouse_salary_certificate: z.any(),
    applicant_salary_certificate: z.any(),
    non_real_estate_ownership_certificate: z.any(),
    medical_certificate: z.any(),
    death_divorce_certificate: z.any(),
});
export type Step5FormData = z.infer<typeof step5Schema>;

export default function Step5Form() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<Step5FormData>({
        resolver: zodResolver(step5Schema)
    });
    const onSubmit:SubmitHandler<Step5FormData>  = async (data) => {
       
        try {
            await file(data);
        } catch (error) {
            console.error('Error submitting applicant:', error);
        }
    };
    const t = useTranslations('join.step5');
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full  ">
            <div className="flex gap-4">
                <FileInput label="birth_certificate"  title={t('birth_certificate')} register={register} error={errors?.birth_certificate?.message as string | undefined} accept="image/*" />
                <FileInput label="spouse_birth_certificate" title={t('spouse_birth_certificate')} register={register} error={errors?.spouse_birth_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="family_individual_certificate" title={t('family_individual_certificate')} register={register} error={errors?.family_individual_certificate?.message as string | undefined} accept="image/*" />
                <FileInput label="applicant_national_id" title={t('applicant_national_id')} register={register} error={errors?.applicant_national_id?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="spouse_national_id" title={t('spouse_national_id')} register={register} error={errors?.spouse_national_id?.message as string | undefined} accept="image/*" />
                <FileInput label="residence_certificate" title={t('residence_certificate')} register={register} error={errors?.residence_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="employment_unemployment_certificate" title={t('employment_unemployment_certificate')} register={register} error={errors?.employment_unemployment_certificate?.message as string | undefined} accept="image/*" />
                <FileInput label="spouse_employment_certificate" title={t('spouse_employment_certificate')} register={register} error={errors?.spouse_employment_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="spouse_salary_certificate" title={t('spouse_salary_certificate')} register={register} error={errors?.spouse_salary_certificate?.message as string | undefined} accept="image/*" />
                <FileInput label="applicant_salary_certificate" title={t('applicant_salary_certificate')} register={register} error={errors?.applicant_salary_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="non_real_estate_ownership_certificate" title={t('non_real_estate_ownership_certificate')} register={register} error={errors?.non_real_estate_ownership_certificate?.message as string | undefined} accept="image/*" />
                <FileInput label="medical_certificate" title={t('medical_certificate')} register={register} error={errors?.medical_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="death_divorce_certificate" title={t('death_divorce_certificate')} register={register} error={errors?.death_divorce_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <Button type="submit" mode="filled">Submit</Button>
        </form>
    );
}