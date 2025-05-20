"use client";

import { Admin } from "@/lib/server/types/admin/admin";
import { Trash2 } from "lucide-react";
import { deleteAdmin } from "@/lib/server/actions/admin/adminActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteAdminProps {
    admin: Admin;
}

export default function DeleteAdmin({ admin }: DeleteAdminProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteAdmin(admin.id);
            router.refresh();
        } catch (error) {
            console.error('Error deleting admin:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`
                text-red-700 dark:text-red-400 
                hover:text-red-800 dark:hover:text-red-300 
                disabled:opacity-50
                transition-all duration-200
                ${isDeleting ? 'animate-spin' : ''}
            `}
        >
            <Trash2 size={16} />
        </button>
    );
}