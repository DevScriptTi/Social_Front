"use client";

import { Input } from "@/lib/ui/components/global/Inputs/inputs";
import { createEmployee } from "@/lib/server/actions/employee/employeeActions";
import { useForm } from "react-hook-form";
import Button from "@/lib/ui/components/global/Buttons/Button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Wilaya, getWilayas } from "@/lib/server/actions/employee/getWilayas";
import { SimpleSelect } from "@/lib/ui/components/global/Inputs/SimpleSelect";

const createEmployeeSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .regex(/^[A-Z][a-z]*$/, "Only letters allowed, first letter must be capital"),
    last: z.string()
        .min(1, "Last name is required")
        .regex(/^[A-Z][a-z]*$/, "Only letters allowed, first letter must be capital"),
    date_of_birth: z.string()
        .min(1, "Date of birth is required")
        .refine((date) => {
            const today = new Date();
            const birthDate = new Date(date);
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 18;
        }, "Must be at least 18 years old"),
    daira_id: z.coerce.number().min(1, "Daira is required"),
});

type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;

export default function CreateEmployeeForm() {
    const router = useRouter();
    const [wilayas, setWilayas] = useState<Wilaya[]>([]);
    const [selectedWilaya, setSelectedWilaya] = useState<Wilaya | null>(null);
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        setValue,
        watch,
        reset,
    } = useForm<CreateEmployeeFormData>({
        resolver: zodResolver(createEmployeeSchema),
    });

    useEffect(() => {
        const fetchWilayas = async () => {
            try {
                const response = await getWilayas();
                setWilayas(response.wilayas);
            } catch (error) {
                console.error('Error fetching wilayas:', error);
            }
        };
        fetchWilayas();
    }, []);

    useEffect(() => {
        if (isSubmitSuccessful) {
            const timer = setTimeout(() => {
                router.refresh();
                router.push('/dashboard/employees');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitSuccessful, router]);

    const handleWilayaChange = (wilayaId: string) => {
        const wilaya = wilayas.find(w => w.id === parseInt(wilayaId));
        setSelectedWilaya(wilaya || null);
        setValue('daira_id', 0); // Reset daira selection
    };

    const onSubmit = async (data: CreateEmployeeFormData) => {
        try {
            await createEmployee(data);
            reset(); // Reset form after successful submission
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
            {isSubmitSuccessful && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 animate-fade-in">
                    <CheckCircle2 size={20} />
                    <span>Employee created successfully!</span>
                </div>
            )}
            <Input
                label="name"
                title="Name"
                placeholder="Enter name (First letter capital)"
                error={errors.name?.message}
                register={register}
            />
            <Input
                label="last"
                title="Last Name"
                placeholder="Enter last name (First letter capital)"
                error={errors.last?.message}
                register={register}
            />
            <Input
                label="date_of_birth"
                title="Date of Birth"
                type="date"
                error={errors.date_of_birth?.message}
                register={register}
            />
            <SimpleSelect
                label="wilaya"
                title="Wilaya"
                onChange={(e) => handleWilayaChange(e.target.value)}
            >
                <option value="">Select a wilaya</option>
                {wilayas.map((wilaya) => (
                    <option key={wilaya.id} value={wilaya.id}>
                        {wilaya.name}
                    </option>
                ))}
            </SimpleSelect>
            <SimpleSelect
                label="daira_id"
                title="Daira"
                error={errors.daira_id?.message}
                register={register("daira_id")}
                disabled={!selectedWilaya}
            >
                <option value="">Select a daira</option>
                {selectedWilaya?.dairas.map((daira) => (
                    <option key={daira.id} value={daira.id}>
                        {daira.name}
                    </option>
                ))}
            </SimpleSelect>
            <Button
                type="submit"
                mode="filled"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Creating..." : "Create Employee"}
            </Button>
        </form>
    );
}
