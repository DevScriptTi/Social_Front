"use client";

import { Social } from "@/lib/server/types/social/social";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface SocialActionsProps {
    Social: Social;
}

export default function SocialActions({ Social }: SocialActionsProps) {
    const router = useRouter();

    const handleEdit = () => {
        // TODO: Implement edit functionality
        console.log('Edit Social:', Social.id);
    };

    const handleDelete = () => {
        // TODO: Implement delete functionality
        console.log('Delete Social:', Social.id);
    };

    const handleView = () => {
        router.push(`/dashboard/socials/${Social.id}`);
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
            <button
                onClick={handleView}
                className="text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-all duration-200"
            >
                <Eye size={16} />
            </button>
        </div>
    );
} 