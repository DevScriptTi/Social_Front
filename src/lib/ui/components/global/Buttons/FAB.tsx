"use client";

import { cn } from "@/lib/utils";

interface FABProps {
    children?: React.ReactNode;
    icon: React.ReactNode;
    type: "normal" | "extended";
    onClick?: () => void;
    className?: string;
}

export function FAB({ children, icon, type, onClick, className }: FABProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                // Base styles
                "relative inline-flex items-center justify-center",
                "transition-all duration-200 ease-in-out",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "active:scale-95",

                // Normal FAB styles
                type === "normal" && [
                    "h-14 w-14", // 56px x 56px
                    "rounded-full",
                    "bg-primary text-on-primary",
                    "shadow-lg hover:shadow-xl",
                    "hover:bg-primary/90",
                ],

                // Extended FAB styles
                type === "extended" && [
                    "h-14 px-6", // 56px height, padding for text
                    "rounded-full",
                    "bg-primary text-on-primary",
                    "shadow-lg hover:shadow-xl",
                    "hover:bg-primary/90",
                    "gap-2", // Space between icon and text
                ],

                // State styles
                "hover:bg-primary/90",
                "active:bg-primary/80",
                "disabled:opacity-50 disabled:cursor-not-allowed",

                // Custom className
                className
            )}
        >
            {/* Icon container */}
            <span className={cn(
                "flex items-center justify-center",
                type === "normal" ? "w-6 h-6" : "w-6 h-6"
            )}>
                {icon}
            </span>

            {/* Text for extended FAB */}
            {type === "extended" && (
                <span className="text-body-large font-medium">
                    {children}
                </span>
            )}
        </button>
    );
}