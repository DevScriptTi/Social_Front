'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/global/Inputs/inputs";
import Button from "../../components/global/Buttons/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SimpleSelect } from "../../components/global/Inputs/SimpleSelect";
import { applicant } from "@/lib/server/actions/join/applicant";
import Link from "next/link";
import { CheckCircle, Loader2 } from "lucide-react";
import { ApplicationResponse } from "@/lib/server/types/join/applicationUpdate";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const wifeSchema = z.object({
    name: z.string().max(255).min(1, "Name is required"),
    last: z.string().max(255).min(1, "Last name is required"),
    date_of_birth: z.string().regex(dateRegex, 'Invalid date format (YYYY-MM-DD)'),
    place_of_birth: z.string().max(255).min(1, "Place of birth is required"),
    national_id_number: z.string().max(255).min(1, "National ID is required"),
    residence_place: z.string().max(255).min(1, "Residence place is required"),
});

const applicantSchema = z.object({
    name: z.string().max(255).min(1, "Name is required"),
    last: z.string().max(255).min(1, "Last name is required"),
    children_number: z.coerce.number().int().min(0).max(100),
    date_of_birth: z.string().regex(dateRegex, 'Invalid date format (YYYY-MM-DD)'),
    place_of_birth: z.string().max(255).min(1, "Place of birth is required"),
    residence_place: z.string().max(255).min(1, "Residence place is required"),
    email: z.string().email().max(255),
    phone: z.string().max(255).min(1, "Phone is required"),
    gender: z.enum(['male', 'female']),
    status: z.enum(['single', 'married', 'divorced', 'widowed']),
    wife: z.optional(z.lazy(() => wifeSchema)),
}).superRefine((data, ctx) => {
    if (data.status === 'married' && !data.wife) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Wife information is required when status is 'married'",
            path: ['wife'],
        });
    }
});

type NationalCardFormData = z.infer<typeof applicantSchema>;

export default function Step1Form({ applicationResponse }: { applicationResponse: ApplicationResponse | { success: false } }) {
    const application = applicationResponse.success === false ? null : applicationResponse.application;
    const t = useTranslations('join.step1');

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<NationalCardFormData>({
        resolver: zodResolver(applicantSchema),
        defaultValues: application ? {
            name: application?.applicant.name,
            last: application?.applicant.last,
            date_of_birth: application?.applicant.date_of_birth,
            place_of_birth: application?.applicant.place_of_birth,
            residence_place: application?.applicant.residence_place,
            email: application?.applicant.email,
            phone: application?.applicant.phone,
            gender: application?.applicant.gender,
            status: application?.applicant.status,
            children_number: application?.applicant.children_number,
            wife: application?.applicant.status === 'married' ? {
                name: application?.applicant.wife?.name || '',
                last: application?.applicant.wife?.last || '',
                date_of_birth: application?.applicant.wife?.date_of_birth || '',
                place_of_birth: application?.applicant.wife?.place_of_birth || '',
                national_id_number: application?.applicant.wife?.national_id_number || '',
                residence_place: application?.applicant.wife?.residence_place || '',
            } : undefined
        } : {}
    });

    const status = watch('status');

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as 'single' | 'married' | 'divorced' | 'widowed';
        setValue('status', newStatus);
        
        if (newStatus !== 'married') {
            // Clear only wife fields
            setValue('wife', undefined);
        }
    };

    const onSubmit: SubmitHandler<NationalCardFormData> = async (data) => {
        const requestData = {
            ...data,
            wife: data.status === 'married' ? data.wife : undefined
        };
        
        try {
            await applicant(requestData);
        } catch (error) {
            console.error('Error submitting applicant:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            <div>
                {isSubmitted && (
                    <div className="flex items-center justify-center gap-2 my-2 text-green-700 dark:text-green-400">
                        <CheckCircle size={24} />
                        <p>{t('success')}</p>
                    </div>
                )}
            </div>

            <div className="flex gap-4">
                <Input<NationalCardFormData>
                    error={errors?.name?.message}
                    title={t('name')}
                    label="name"
                    register={register}
                    placeholder={t('placeholder_name')}
                />
                <Input<NationalCardFormData>
                    error={errors?.last?.message}
                    title={t('last')}
                    label="last"
                    register={register}
                    placeholder={t('placeholder_last')}
                />
                <Input<NationalCardFormData>
                    error={errors?.children_number?.message}
                    title={t('number_of_children')}
                    label="children_number"
                    register={register}
                    placeholder={t('placeholder_number_of_children')}
                />
            </div>

            <div className="flex gap-4">
                <Input<NationalCardFormData>
                    error={errors?.date_of_birth?.message}
                    title={t('date_of_birth')}
                    label="date_of_birth"
                    register={register}
                    type="date"
                    placeholder={t('placeholder_date_of_birth')}
                />
                <Input<NationalCardFormData>
                    error={errors?.place_of_birth?.message}
                    title={t('place_of_birth')}
                    label="place_of_birth"
                    register={register}
                    placeholder={t('placeholder_place_of_birth')}
                />
                <Input<NationalCardFormData>
                    error={errors?.residence_place?.message}
                    title={t('residence_place')}
                    label="residence_place"
                    register={register}
                    placeholder={t('placeholder_residence_place')}
                />
            </div>

            <div className="flex gap-4">
                <Input<NationalCardFormData>
                    error={errors?.phone?.message}
                    title={t('phone')}
                    label="phone"
                    register={register}
                    placeholder={t('placeholder_phone')}
                />
                <Input<NationalCardFormData>
                    error={errors?.email?.message}
                    title={t('email')}
                    label="email"
                    register={register}
                    placeholder={t('placeholder_email')}
                />
            </div>

            <div className="flex gap-4">
                <SimpleSelect
                    error={errors?.gender?.message}
                    title={t('gender')}
                    label="gender"
                    register={register("gender")}
                >
                    <option value="male">{t('male')}</option>
                    <option value="female">{t('female')}</option>
                </SimpleSelect>
                <SimpleSelect
                    error={errors?.status?.message}
                    title={t('status')}
                    label="status"
                    register={register("status")}
                    onChange={handleStatusChange}
                >
                    <option value="single">{t('single')}</option>
                    <option value="married">{t('married')}</option>
                    <option value="divorced">{t('divorced')}</option>
                    <option value="widowed">{t('widowed')}</option>
                </SimpleSelect>
            </div>

            {status === 'married' && (
                <div>
                    <h3 className="text-lg font-medium mb-6">{t('wife_information')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex gap-4">
                            <Input<NationalCardFormData>
                                error={errors?.wife?.name?.message}
                                title={t('wife.name')}
                                label="wife.name"
                                register={register}
                                placeholder={t('wife.placeholder_name')}
                            />
                            <Input<NationalCardFormData>
                                error={errors?.wife?.last?.message}
                                title={t('wife.last')}
                                label="wife.last"
                                register={register}
                                placeholder={t('wife.placeholder_last')}
                            />
                        </div>

                        <Input<NationalCardFormData>
                            error={errors?.wife?.date_of_birth?.message}
                            title={t('wife.date_of_birth')}
                            label="wife.date_of_birth"
                            type="date"
                            register={register}
                            placeholder={t('wife.placeholder_date_of_birth')}
                        />

                        <Input<NationalCardFormData>
                            error={errors?.wife?.place_of_birth?.message}
                            title={t('wife.place_of_birth')}
                            label="wife.place_of_birth"
                            register={register}
                            placeholder={t('wife.placeholder_place_of_birth')}
                        />

                        <Input<NationalCardFormData>
                            error={errors?.wife?.national_id_number?.message}
                            title={t('wife.national_id_number')}
                            label="wife.national_id_number"
                            register={register}
                            placeholder={t('wife.placeholder_national_id_number')}
                        />

                        <Input<NationalCardFormData>
                            error={errors?.wife?.residence_place?.message}
                            title={t('wife.residence_place')}
                            label="wife.residence_place"
                            register={register}
                            placeholder={t('wife.placeholder_residence_place')}
                        />
                    </div>
                </div>
            )}

            <div className="flex gap-3">
                {isSubmitting ?
                    <Button icon={<Loader2 size={24} className="animate-spin" />} type="submit" mode="filled">{t('save')}</Button>
                    :
                    <Button type="submit" mode="filled">{t('save')}</Button>
                }

                <Link href="/join/step2">
                    <Button mode="outlined">{t('next')}</Button>
                </Link>
            </div>
        </form>
    )
}