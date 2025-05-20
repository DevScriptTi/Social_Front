"use client";

import { Committee } from "@/lib/server/types/committee/committee";
import { Key } from "lucide-react";
import { createCommitteeKey } from "@/lib/server/actions/committee/committeeActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateKeyProps {
    committee: Committee;
}

export default function CreateKey({ committee }: CreateKeyProps) {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateKey = async () => {
        try {
            setIsCreating(true);
            const result = await createCommitteeKey(committee.id);
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