'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/global/Inputs/inputs";
import Button from "../../components/global/Buttons/Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SimpleSelect } from "../../components/global/Inputs/SimpleSelect";

const nationalCardSchema = z.object({
    name: z.string(),
    last: z.string(),
    date_of_birth: z.string(),
    baladiya_id: z.string(),
    phone: z.string(),
    email: z.string().email(),
    gender: z.enum(["male", "female"]),
    status: z.enum(["single", "married", "divorced", "widowed"]),
});

type NationalCardFormData = z.infer<typeof nationalCardSchema>;

export default function Step1Form() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<NationalCardFormData>({
        resolver: zodResolver(nationalCardSchema)
    });
    const onSubmit: SubmitHandler<NationalCardFormData> = async (data: NationalCardFormData) => {
        router.push('/join/step1');
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
        >
            <div className="flex  gap-4">
                <Input<NationalCardFormData>
                    error={errors?.name?.message}
                    title="Name"
                    label="name"
                    register={register}
                    placeholder="Enter Your Name"
                />
                <Input<NationalCardFormData>
                    error={errors?.last?.message}
                    title="Last"
                    label="last"
                    register={register}
                    placeholder="Enter Your Last Name"
                />
            </div>
            <Input<NationalCardFormData>
                error={errors?.date_of_birth?.message}
                title="Date of Birth"
                label="date_of_birth"
                register={register}
                placeholder="Enter Your Date of Birth"
            />
            <Input<NationalCardFormData>
                error={errors?.baladiya_id?.message}
                title="Baladiya ID"
                label="baladiya_id"
                register={register}
                placeholder="Enter Your Baladiya ID"
            />
            <div className="flex gap-4">
                <Input<NationalCardFormData>
                    error={errors?.phone?.message}
                    title="Phone"
                    label="phone"
                    register={register}
                    placeholder="Enter Your Phone"
                />
                <Input<NationalCardFormData>
                    error={errors?.email?.message}
                    title="Email"
                    label="email"
                    register={register}
                    placeholder="Enter Your Email"
                />
            </div>
            <div className="flex gap-4">
                <SimpleSelect
                    error={errors?.gender?.message}
                    title="Gender"
                    label="gender"
                    register={register("gender")}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </SimpleSelect>
                <SimpleSelect
                    error={errors?.status?.message}
                    title="Status"
                    label="status"
                    register={register("status")}
                >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                </SimpleSelect>

            </div>
            <Button type="submit" mode="filled">Submit</Button>
        </form>
    )
}