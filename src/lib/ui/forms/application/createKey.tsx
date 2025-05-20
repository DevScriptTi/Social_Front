"use client";

import { Employee } from "@/lib/server/types/employee/employee";
import { Key } from "lucide-react";
import { createEmployeeKey } from "@/lib/server/actions/employee/employeeActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateKeyProps {
    employee: Employee;
}

export default function CreateKey({ employee }: CreateKeyProps) {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateKey = async () => {
        try {
            setIsCreating(true);
            const result = await createEmployeeKey(employee.id);
            if (result.success && result.key) {
                console.log('New key created:', result.key);
            }
            router.refresh();
        } catch (error) {
            console.error('Error creating key:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <button
            onClick={handleCreateKey}
            disabled={isCreating}
            className={`
                text-blue-700 dark:text-blue-400 
                hover:text-blue-800 dark:hover:text-blue-300 
                disabled:opacity-50
                transition-all duration-200
                ${isCreating ? 'animate-spin' : ''}
            `}
        >
            <Key size={16} />
        </button>
    );
} 