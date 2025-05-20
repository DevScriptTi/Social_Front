"use client";

import { logout } from "@/lib/server/actions/auth/logout";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Logout() {
    const t = useTranslations()
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();                      
            // Force a hard refresh to clear all state
            window.location.href = '/';
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`
                text-on-primary dark:text-dark-on-primary
                hover:text-on-primary/60 dark:hover:text-dark-on-primary/60
                disabled:opacity-50
                transition-all duration-200
                flex items-center gap-1
            `}
        >
            {t('HomePage.UpBar.logout')}
            <LogOut size={16} />

        </button>
    );
} 