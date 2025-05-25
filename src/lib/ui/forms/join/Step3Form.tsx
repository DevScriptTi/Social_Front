'use client';
import { useForm } from "react-hook-form";
import { Input } from "../../components/global/Inputs/inputs";
import Button from "../../components/global/Buttons/Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SimpleSelect } from "../../components/global/Inputs/SimpleSelect";
import { housing } from "@/lib/server/actions/join/applicant";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
const step3Schema = z.object({
    current_housing_type: z.enum([
        'non_residential_place',
        'collapsing_communal',
        'collapsing_private',
        'with_relatives_or_rented',
        'functional_housing'
    ], { required_error: 'Current housing type is required' }),
    previously_benefited: z.enum(['yes', 'no'], { required_error: 'This field is required' }),
    housing_area: z.string().optional(),
    other_properties: z.string().optional(),
});

type Step3FormData = z.infer<typeof step3Schema>;

export default function Step3Form({ applicationResponse }: { applicationResponse: ApplicationResponse | { success: false } }) {
    const application = applicationResponse.success === false ? null : applicationResponse.application;
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted } } = useForm<Step3FormData>({
        resolver: zodResolver(step3Schema),
        defaultValues: application ? {
            current_housing_type: application.housing.current_housing_type,
            previously_benefited: application.housing.previously_benefited,
            housing_area: application.housing.housing_area,
            other_properties: application.housing.other_properties,
        } : {}
    });
    const onSubmit = async (data: Step3FormData) => {
        await housing(data);
        // router.push('/join/step1');
    };
    const t = useTranslations('join.step3');
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            <div>
                {
                    isSubmitted &&
                    <div className="flex items-center justify-center gap-2 my-2 text-green-700 dark:text-green-400">
                        <CheckCircle size={24} />
                        <p>{t('success')}</p>
                    </div>
                }
            </div>
            <div className="flex gap-4">
                <SimpleSelect
                    error={errors?.current_housing_type?.message}
                    title={t('current_housing_type')}
                    label="current_housing_type"
                    register={register("current_housing_type")}
                >
                    <option value="">{t('select_housing_type')}</option>
                    <option value="non_residential_place">{t('non_residential_place')}</option>
                    <option value="collapsing_communal">{t('collapsing_communal')}</option>
                    <option value="collapsing_private">{t('collapsing_private')}</option>
                    <option value="with_relatives_or_rented">{t('with_relatives_or_rented')}</option>
                    <option value="functional_housing">{t('functional_housing')}</option>
                </SimpleSelect>

                <SimpleSelect
                    error={errors?.previously_benefited?.message}
                    title={t('previously_benefited')}
                    label="previously_benefited"
                    register={register("previously_benefited")}
                >
                    <option value="">{t('select')}</option>
                    <option value="yes">{t('yes')}</option>
                    <option value="no">{t('no')}</option>
                </SimpleSelect>
            </div>
            <div className="flex gap-4">
                <Input
                    error={errors?.housing_area?.message}
                    title={t('housing_area')}
                    label="housing_area"
                    register={register}
                    placeholder={t('placeholder_housing_area')}
                    type="number"
                // step="0.01"
                />

                <Input
                    error={errors?.other_properties?.message}
                    title={t('other_properties')}
                    label="other_properties"
                    register={register}
                    placeholder={t('placeholder_other_properties')}
                    type="text"
                />
            </div>

            <div className=" flex gap-3">
                {isSubmitting ?
                    <Button icon={<Loader2 size={24} />} type="submit" mode="filled">{t('save')}</Button>
                    :
                    <Button type="submit" mode="filled">{t('save')}</Button>
                }

                <Link href="/join/step4">
                    <Button mode="outlined">{t('next')}</Button>
                </Link>
            </div>
        </form>
    );
}