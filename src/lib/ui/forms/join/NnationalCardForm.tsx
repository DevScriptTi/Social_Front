'use client';
import { useForm } from "react-hook-form";
import { Input } from "../../components/global/Inputs/inputs";
import Button from "../../components/global/Buttons/Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { getNationalCard } from "@/lib/server/actions/join/NationalCardAction";

const nationalCardSchema = z.object({
    national_card_id: z.string()


});

type NationalCardFormData = z.infer<typeof nationalCardSchema>;

export default function NnationalCardForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<NationalCardFormData>({
        resolver: zodResolver(nationalCardSchema)
    });
    const onSubmit = async (data: NationalCardFormData) => {
        const response = await getNationalCard({ national_card_id: data.national_card_id });
        if (response.success) {
            router.push('/join/step1');
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-72"
        >
            <Input<NationalCardFormData>
                error={errors?.national_card_id?.message}
                title="National card ID"
                label="national_card_id"
                register={register}
                placeholder="Enter Your National card ID"
            />
            <Button type="submit" mode="filled">Submit</Button>
        </form>
    )
}