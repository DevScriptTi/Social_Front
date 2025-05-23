"use client";

import { Application } from "@/lib/server/types/application/application";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ApplicationActionsProps {
    Application: Application;
}

export default function ApplicationActions({ Application }: ApplicationActionsProps) {

    const handleEdit = () => {
        // TODO: Implement edit functionality
        console.log('Edit Application:', Application.id);
    };

    const handleDelete = () => {
        // TODO: Implement delete functionality
        console.log('Delete Application:', Application.id);
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
            <Link href={`/dashboard/applications/${Application.key}`} className="text-primary dark:text-dark-primary">
                <Eye size={16} />
            </Link>
        </div>
    );
} 