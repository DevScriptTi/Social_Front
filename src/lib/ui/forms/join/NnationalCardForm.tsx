'use client';
import { useForm } from "react-hook-form";
import { Input } from "../../components/global/Inputs/inputs";
import Button from "../../components/global/Buttons/Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { getNationalCard } from "@/lib/server/actions/join/NationalCardAction";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
const nationalCardSchema = z.object({
    national_card_id: z.string()
        .min(10, {
            message: "National card ID must be at least 8 characters long"
        }
        ),
    confirm_national_card_id: z.string()
        .min(10, {
            message: "National card ID must be at least 8 characters long"
        }
        ),
}).refine((data) => data.national_card_id === data.confirm_national_card_id, {
    message: "National card IDs must match",
    path: ["confirm_national_card_id"],
});

type NationalCardFormData = z.infer<typeof nationalCardSchema>;

export default function NnationalCardForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting , isSubmitted } } = useForm<NationalCardFormData>({
        resolver: zodResolver(nationalCardSchema)
    });
    const onSubmit = async (data: NationalCardFormData) => {
        const response = await getNationalCard({ national_card_id: data.national_card_id });
        if (response.success) {
            router.push('/join/step1');
        }
    }
    const t = useTranslations('join.nationalCard');
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-1/3"
        >
            <Input<NationalCardFormData>
                label="national_card_id"
                title={t('national_card_id')}
                placeholder={t('placeholder_national_card_id')}
                register={register}
                type="text"
                error={errors.national_card_id?.message}
            />
            <Input<NationalCardFormData>
                label="confirm_national_card_id"
                title={t('confirm_national_card_id')}
                placeholder={t('placeholder_confirm_national_card_id')}
                register={register}
                type="text"
                error={errors.confirm_national_card_id?.message}
            />
            {
                <Button type="submit" mode="filled" icon={<ArrowRight size={24} className={`${isSubmitting || isSubmitted ? 'animate-spin' : ''}`} />}>{t('submit')}</Button>
            }
        </form>
    )
}