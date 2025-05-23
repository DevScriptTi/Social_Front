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
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            <div>
                {
                    isSubmitted &&
                    <div className="flex items-center justify-center gap-2 my-2 text-green-700 dark:text-green-400">
                        <CheckCircle size={24} />
                        <p>Civil status submitted successfully</p>
                    </div>
                }
            </div>
            <div className="flex gap-4">
                <SimpleSelect
                    error={errors?.current_housing_type?.message}
                    title="Current Housing Type"
                    label="current_housing_type"
                    register={register("current_housing_type")}
                >
                    <option value="">Select housing type</option>
                    <option value="non_residential_place">Non-residential place</option>
                    <option value="collapsing_communal">Collapsing communal</option>
                    <option value="collapsing_private">Collapsing private</option>
                    <option value="with_relatives_or_rented">With relatives or rented</option>
                    <option value="functional_housing">Functional housing</option>
                </SimpleSelect>

                <SimpleSelect
                    error={errors?.previously_benefited?.message}
                    title="Previously Benefited"
                    label="previously_benefited"
                    register={register("previously_benefited")}
                >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </SimpleSelect>
            </div>
            <div className="flex gap-4">
                <Input
                    error={errors?.housing_area?.message}
                    title="Housing Area (m²)"
                    label="housing_area"
                    register={register}
                    placeholder="Enter housing area"
                    type="number"
                // step="0.01"
                />

                <Input
                    error={errors?.other_properties?.message}
                    title="Other Properties"
                    label="other_properties"
                    register={register}
                    placeholder="Describe other properties"
                    type="text"
                />
            </div>

            <div className=" flex gap-3">
                {isSubmitting ?
                    <Button icon={<Loader2 size={24} />} type="submit" mode="filled">Save</Button>
                    :
                    <Button type="submit" mode="filled">Save</Button>
                }

                <Link href="/join/step4">
                    <Button mode="outlined">Next</Button>
                </Link>
            </div>
        </form>
    );
}