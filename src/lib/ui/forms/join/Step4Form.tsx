'use client';
import { useForm } from "react-hook-form";
import { Input } from "../../components/global/Inputs/inputs";
import Button from "../../components/global/Buttons/Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SimpleSelect } from "../../components/global/Inputs/SimpleSelect";

const step4Schema = z.object({
    chronic_illness_disability: z.enum(['yes', 'no'], { required_error: 'This field is required' }),
    type: z.string().optional(),
    family_member_illness: z.enum(['yes', 'no'], { required_error: 'This field is required' }),
    relationship: z.string().optional(),
});

type Step4FormData = z.infer<typeof step4Schema>;

export default function Step4Form() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<Step4FormData>({
        resolver: zodResolver(step4Schema)
    });
    const onSubmit = (data: Step4FormData) => {
        window.alert(JSON.stringify(data));
        // router.push('/join/step1');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
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

            <Button type="submit" mode="filled">Submit</Button>
        </form>
    );
}