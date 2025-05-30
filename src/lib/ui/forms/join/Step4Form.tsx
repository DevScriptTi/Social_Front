'use client';
import { useForm } from "react-hook-form";
import { Input } from "../../components/global/Inputs/inputs";
import Button from "../../components/global/Buttons/Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SimpleSelect } from "../../components/global/Inputs/SimpleSelect";
import { ApplicationResponse } from "@/lib/server/types/join/applicationUpdate";
import { health } from "@/lib/server/actions/join/applicant";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
const step4Schema = z.object({
    chronic_illness_disability: z.enum(['yes', 'no'], { required_error: 'This field is required' }),
    type: z.string().optional(),
    family_member_illness: z.enum(['yes', 'no'], { required_error: 'This field is required' }),
    relationship: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.chronic_illness_disability === 'yes' && !data.type) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Type is required when chronic illness/disability is 'yes'",
            path: ['type'],
        });
    }

    if (data.family_member_illness === 'yes' && !data.relationship) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Relationship is required when family member illness is 'yes'",
            path: ['relationship'],
        });
    }
});

type Step4FormData = z.infer<typeof step4Schema>;

export default function Step4Form({ applicationResponse }: { applicationResponse: ApplicationResponse | { success: false } }) {
    const application = applicationResponse.success === false ? null : applicationResponse.application;
    const { register, handleSubmit, watch,formState: { errors, isSubmitting, isSubmitted } } = useForm<Step4FormData>({
        resolver: zodResolver(step4Schema),
        defaultValues: application ? {
            chronic_illness_disability: application.health.chronic_illness_disability,
            type: application.health.type,
            family_member_illness: application.health.family_member_illness,
            relationship: application.health.relationship,
        } : {}
    });
    const chronicIllness = watch("chronic_illness_disability");
    const familyIllness = watch("family_member_illness");
    const onSubmit = async (data: Step4FormData) => {
        await health({
            chronic_illness_disability: data.chronic_illness_disability,
            type: data.type || null,
            family_member_illness: data.family_member_illness,
            relationship: data.relationship || null
        });
        // router.push('/join/step1');
    };
    const t = useTranslations('join.step4');
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            <div className="flex gap-4">
                <SimpleSelect
                    error={errors?.chronic_illness_disability?.message}
                    title={t('chronic_illness_disability')}
                    label="chronic_illness_disability"
                    register={register("chronic_illness_disability")}
                >
                    <option value="">{t('select')}</option>
                    <option value="yes">{t('yes')}</option>
                    <option value="no">{t('no')}</option>
                </SimpleSelect>
                <SimpleSelect
                    error={errors?.family_member_illness?.message}
                    title={t('family_member_illness')}
                    label="family_member_illness"
                    register={register("family_member_illness")}
                >
                    <option value="">{t('select')}</option>
                    <option value="yes">{t('yes')}</option>
                    <option value="no">{t('no')}</option>
                </SimpleSelect>
            </div>

            {chronicIllness === 'yes' && (
                <Input
                    error={errors?.type?.message}
                    title={t('type')}
                    label="type"
                    register={register}
                    placeholder={t('placeholder_type')}
                    type="text"
                />
            )}

            {familyIllness === 'yes' && (
                <Input
                    error={errors?.relationship?.message}
                    title={t('relationship')}
                    label="relationship"
                    register={register}
                    placeholder={t('placeholder_relationship')}
                    type="text"
                />
            )}
            <div className=" flex gap-3">
                {isSubmitting ?
                    <Button icon={<Loader2 size={24} />} type="submit" mode="filled">{t('save')}</Button>
                    :
                    <Button type="submit" mode="filled">{t('save')}</Button>
                }
                <Link href="/join/step5">
                    <Button mode="outlined">{t('next')}</Button>
                </Link>

            </div>

        </form>
    );
}