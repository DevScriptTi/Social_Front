'use client';
import { useForm } from "react-hook-form";
import { FileInput } from "../../components/global/Inputs/InputFile";
import Button from "../../components/global/Buttons/Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

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
type Step5FormData = z.infer<typeof step5Schema>;

export default function Step5Form() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<Step5FormData>({
        resolver: zodResolver(step5Schema)
    });
    const onSubmit = (data: Step5FormData) => {
        router.push('/join/step1');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full  ">
            <div className="flex gap-4">
                <FileInput label="birth_certificate" title="Birth Certificate" register={register} error={errors?.birth_certificate?.message as string | undefined} accept="image/*" />
                <FileInput label="spouse_birth_certificate" title="Spouse Birth Certificate" register={register} error={errors?.spouse_birth_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="family_individual_certificate" title="Family Individual Certificate" register={register} error={errors?.family_individual_certificate?.message as string | undefined} accept="image/*" />
                <FileInput label="applicant_national_id" title="Applicant National ID" register={register} error={errors?.applicant_national_id?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="spouse_national_id" title="Spouse National ID" register={register} error={errors?.spouse_national_id?.message as string | undefined} accept="image/*" />
                <FileInput label="residence_certificate" title="Residence Certificate" register={register} error={errors?.residence_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="employment_unemployment_certificate" title="Employment/Unemployment Certificate" register={register} error={errors?.employment_unemployment_certificate?.message as string | undefined} accept="image/*" />
                <FileInput label="spouse_employment_certificate" title="Spouse Employment Certificate" register={register} error={errors?.spouse_employment_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="spouse_salary_certificate" title="Spouse Salary Certificate" register={register} error={errors?.spouse_salary_certificate?.message as string | undefined} accept="image/*" />
                <FileInput label="applicant_salary_certificate" title="Applicant Salary Certificate" register={register} error={errors?.applicant_salary_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="non_real_estate_ownership_certificate" title="Non Real Estate Ownership Certificate" register={register} error={errors?.non_real_estate_ownership_certificate?.message as string | undefined} accept="image/*" />
                <FileInput label="medical_certificate" title="Medical Certificate" register={register} error={errors?.medical_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <div className="flex gap-4">
                <FileInput label="death_divorce_certificate" title="Death/Divorce Certificate" register={register} error={errors?.death_divorce_certificate?.message as string | undefined} accept="image/*" />
            </div>
            <Button type="submit" mode="filled">Submit</Button>
        </form>
    );
}