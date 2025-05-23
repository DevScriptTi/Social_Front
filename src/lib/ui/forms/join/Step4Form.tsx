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

const step4Schema = z.object({
    chronic_illness_disability: z.enum(['yes', 'no'], { required_error: 'This field is required' }),
    type: z.string().optional(),
    family_member_illness: z.enum(['yes', 'no'], { required_error: 'This field is required' }),
    relationship: z.string().optional(),
});

type Step4FormData = z.infer<typeof step4Schema>;

export default function Step4Form({ applicationResponse }: { applicationResponse: ApplicationResponse | { success: false } }) {
    const application = applicationResponse.success === false ? null : applicationResponse.application; 
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted } } = useForm<Step4FormData>({
        resolver: zodResolver(step4Schema),
        defaultValues: application ? {
            chronic_illness_disability: application.health.chronic_illness_disability,
            type: application.health.type,
            family_member_illness: application.health.family_member_illness,
            relationship: application.health.relationship,
        } : {}
    });
    const onSubmit = async (data: Step4FormData) => {
        await health({
            chronic_illness_disability: data.chronic_illness_disability,
            type: data.type || null,
            family_member_illness: data.family_member_illness,
            relationship: data.relationship || null
        });
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
                    error={errors?.chronic_illness_disability?.message}
                    title="Chronic Illness or Disability"
                    label="chronic_illness_disability"
                    register={register("chronic_illness_disability")}
                >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </SimpleSelect>
                <SimpleSelect
                    error={errors?.family_member_illness?.message}
                    title="Family Member Illness"
                    label="family_member_illness"
                    register={register("family_member_illness")}
                >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </SimpleSelect>

            </div>
            <div className="flex gap-4">

                <Input
                    error={errors?.relationship?.message}
                    title="Relationship (if any)"
                    label="relationship"
                    register={register}
                    placeholder="Specify relationship"
                    type="text"
                />
                <Input
                    error={errors?.type?.message}
                    title="Type (if any)"
                    label="type"
                    register={register}
                    placeholder="Specify type of illness/disability"
                    type="text"
                />
            </div>
            <div className=" flex gap-3">
                {isSubmitting ?
                    <Button icon={<Loader2 size={24} />} type="submit" mode="filled">Save</Button>
                    :
                    <Button type="submit" mode="filled">Save</Button>
                }
                <Link href="/join/step5">
                    <Button mode="outlined">Next</Button>
                </Link>

            </div>

        </form>
    );
}