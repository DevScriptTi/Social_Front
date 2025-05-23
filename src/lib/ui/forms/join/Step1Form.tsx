'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/global/Inputs/inputs";
import Button from "../../components/global/Buttons/Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SimpleSelect } from "../../components/global/Inputs/SimpleSelect";
import { applicant } from "@/lib/server/actions/join/applicant";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AllCommittee, getCommittees } from "@/lib/server/actions/application/getWilayas";
import { CheckCircle, Loader2 } from "lucide-react";
import { ApplicationResponse } from "@/lib/server/types/join/applicationUpdate";
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const wifeSchema = z.object({
    name: z.string().max(255).optional(),
    last: z.string().max(255).optional(),
    date_of_birth: z.string().regex(dateRegex, 'Invalid date format (YYYY-MM-DD)').optional(),
    place_of_birth: z.string().max(255).optional(),
    national_id_number: z.string().max(255).optional(),
    residence_place: z.string().max(255).optional(),
});

const applicantSchema = z.object({
    name: z.string().max(255),
    last: z.string().max(255),
    date_of_birth: z.string().regex(dateRegex, 'Invalid date format (YYYY-MM-DD)'),
    place_of_birth: z.string().max(255),
    residence_place: z.string().max(255),
    email: z.string().email().max(255),
    phone: z.string().max(255),
    gender: z.enum(['male', 'female']),
    status: z.enum(['single', 'married', 'divorced', 'widowed']),
    children_number: z.coerce.number().int().min(0).max(65535),
    committee_id: z.coerce.number().int().optional(),
    wife: z.lazy(() => wifeSchema.optional()),
}).superRefine((data, ctx) => {
    if (data.status === 'married' && !data.wife) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Wife information is required when status is 'married'",
            path: ['wife'],
        });
    }
    if (data.status !== 'married' && data.wife) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Wife information should only be provided when status is 'married'",
            path: ['wife'],
        });
    }
});

type NationalCardFormData = z.infer<typeof applicantSchema>;

export default function Step1Form({ applicationResponse }: { applicationResponse: ApplicationResponse | { success: false } }) {
    const application = applicationResponse.success === false ? null : applicationResponse.application;
    const [committees, setCommittees] = useState<AllCommittee[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<NationalCardFormData>({
        resolver: zodResolver(applicantSchema),
        defaultValues: application ? {
            name: application?.applicant.name ,
            last: application?.applicant.last ,
            date_of_birth: application?.applicant.date_of_birth ,
            place_of_birth: application?.applicant.place_of_birth ,
            residence_place: application?.applicant.residence_place ,
            email: application?.applicant.email ,
            phone: application?.applicant.phone ,
            gender: application?.applicant.gender ,
            status: application?.applicant.status ,
            children_number: application?.applicant.children_number ,
            committee_id: application?.committee?.id ?? 1,
            wife: application?.applicant.wife ? {
                name: application?.applicant.wife.name ,
                last: application?.applicant.wife.last ,
                date_of_birth: application?.applicant.wife.date_of_birth ,
                place_of_birth: application?.applicant.wife.place_of_birth ,
                national_id_number: application?.applicant.wife.national_id_number ,
                residence_place: application?.applicant.wife.residence_place ,
            } : undefined
        } : {}
    });

    useEffect(() => {
        const fetchWilayas = async () => {
            try {
                const response = await getCommittees();
                setCommittees(response.committees);
            } catch (error) {
                console.error('Error fetching wilayas:', error);
            }
        };
        fetchWilayas();
    }, []);

    const onSubmit: SubmitHandler<NationalCardFormData> = async (data) => {
        // Remove wife object if status isn't married
        const requestData = {
            ...data,
            wife: status != 'married' && status != 'divorced' ? data.wife : undefined
        };
        console.log('requestData', requestData)
        try {
            await applicant(requestData);
        } catch (error) {
            console.error('Error submitting applicant:', error);
        }

    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
        >
            <div>
                {
                    isSubmitted &&
                    <div className="flex items-center justify-center gap-2 my-2 text-green-700 dark:text-green-400">
                        <CheckCircle size={24}/>
                        <p>Civil status submitted successfully</p>
                    </div>
                }
            </div>
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
                type="date"
                placeholder="Enter Your Date of Birth"
            />
            <SimpleSelect
                label="wilaya"
                title="Wilaya"
                error={errors?.committee_id?.message}
                register={register('committee_id')}
            >
                <option value="">Select a committee</option>
                {committees.map((committee) => (
                    <option key={committee.id} value={committee.id}>
                        {committee.daira.name}
                    </option>
                ))}
            </SimpleSelect>
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
            <div >
                <h3 className="text-lg font-medium mb-6">Wife Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name and Last Name */}
                    <div className="flex gap-4">
                        <Input<NationalCardFormData>
                            error={errors?.wife?.name?.message}
                            title="First Name"
                            label="wife.name"
                            register={register}
                            placeholder="Enter wife's first name"
                        />
                        <Input<NationalCardFormData>
                            error={errors?.wife?.last?.message}
                            title="Last Name"
                            label="wife.last"
                            register={register}
                            placeholder="Enter wife's last name"
                        />
                    </div>

                    {/* Date and Place of Birth */}
                    <Input<NationalCardFormData>
                        error={errors?.wife?.date_of_birth?.message}
                        title="Date of Birth"
                        label="wife.date_of_birth"
                        type="date"
                        register={register}
                        placeholder="YYYY-MM-DD"
                    />
                    <Input<NationalCardFormData>
                        error={errors?.wife?.place_of_birth?.message}
                        title="Place of Birth"
                        label="wife.place_of_birth"
                        register={register}
                        placeholder="Enter place of birth"
                    />

                    {/* National ID and Residence */}
                    <Input<NationalCardFormData>
                        error={errors?.wife?.national_id_number?.message}
                        title="National ID Number"
                        label="wife.national_id_number"
                        register={register}
                        placeholder="Enter national ID number"
                    />
                    <Input<NationalCardFormData>
                        error={errors?.wife?.residence_place?.message}
                        title="Residence Place"
                        label="wife.residence_place"
                        register={register}
                        placeholder="Enter current residence"
                    />
                </div>
            </div>
            <div className=" flex gap-3">
                {isSubmitting ?
                    <Button icon={<Loader2 size={24}  />} type="submit" mode="filled">Save</Button>
                    :
                    <Button type="submit" mode="filled">Save</Button>
                }

                <Link href="/join/step2">
                    <Button mode="outlined">Next</Button>
                </Link>
            </div>
        </form>
    )
}