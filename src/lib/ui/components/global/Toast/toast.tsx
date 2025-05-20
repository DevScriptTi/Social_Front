"use client";

import { CheckCircle2, XCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

type ToastType = "success" | "error";

interface ToastProps {
    message: string;
    type: ToastType;
    duration?: number;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    onClose?: () => void;
}

export default function Toast({
    message,
    type,
    duration = 3000,
    position = "top-right",
    onClose
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const positionClasses = {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4"
    };

    const typeClasses = {
        success: "bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-800",
        error: "bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800"
    };

    const iconClasses = {
        success: "text-green-600 dark:text-green-400",
        error: "text-red-600 dark:text-red-400"
    };

    const Icon = type === "success" ? CheckCircle2 : XCircle;

    return (
        <div
            className={`fixed ${positionClasses[position]} z-50 animate-slide-in`}
            role="alert"
        >
            <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${typeClasses[type]} shadow-lg`}
            >
                <Icon className={`w-5 h-5 ${iconClasses[type]}`} />
                <p className={`text-sm font-medium ${
                    type === "success" 
                        ? "text-green-800 dark:text-green-200" 
                        : "text-red-800 dark:text-red-200"
                }`}>
                    {message}
                </p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose?.();
                    }}
                    className={`p-1 rounded-full hover:bg-opacity-10 ${
                        type === "success"
                            ? "hover:bg-green-600 dark:hover:bg-green-400"
                            : "hover:bg-red-600 dark:hover:bg-red-400"
                    }`}
                >
                    <X className={`w-4 h-4 ${iconClasses[type]}`} />
                </button>
            </div>
        </div>
    );
}

// Add this to your global CSS file
const styles = `
@keyframes slide-in {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.animate-slide-in {
    animation: slide-in 0.3s ease-out;
}
`;
