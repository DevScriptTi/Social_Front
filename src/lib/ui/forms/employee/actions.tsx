"use client";

import { Employee } from "@/lib/server/types/employee/employee";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmployeeActionsProps {
    Employee: Employee;
}

export default function EmployeeActions({ Employee }: EmployeeActionsProps) {
    const router = useRouter();

    const handleEdit = () => {
        // TODO: Implement edit functionality
        console.log('Edit Employee:', Employee.id);
    };

    const handleDelete = () => {
        // TODO: Implement delete functionality
        console.log('Delete Employee:', Employee.id);
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleEdit}
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-200"
            >
                <Pencil size={16} />
            </button>
            <button
                onClick={handleDelete}
                className="text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-all duration-200"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
} 