"use client"

import { Check, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavJoinItem({ disabled, title, href, step, currentStep }: { disabled: boolean, title: string, href: string, step: number, currentStep: number }) {
    let mode: "normal" | "donne" | "error" | "curent" = "normal"

    if (currentStep >= step) {
        mode = "donne"
    } else if (currentStep < step) {
        mode = "normal"
    }
    const pathname = usePathname()
    const isActive = pathname === href
    if (isActive) {
        mode = "curent"
    }
    return (
        <Link
            href={href}
            className="flex gap-2 items-center"
        >
            <span
                className={`
                size-10 flex items-center justify-center gap-2 rounded-full border-2  ${disabled ? "opacity-50" : ""}
                ${mode == "normal" ? 'border-outline dark:border-dark-outline focus:border-primary dark:focus:border-dark-primary focus:ring-primary dark:focus:ring-dark-primary ' : ""}
                ${mode == "curent" ? 'border-primary dark:border-dark-primary focus:border-primary dark:focus:border-dark-primary focus:ring-primary dark:focus:ring-dark-primary ' : ""}
                ${mode == "donne" ? 'border-green-700 dark:border-green-400 focus:border-green-700 dark:focus:border-green-400 focus:ring-green-700 dark:focus:ring-green-400 ' : ""}
                `}
            >
                {mode == "curent" && <span className="size-4 rounded-full bg-primary dark:bg-dark-primary"></span>}
                {mode == "donne" && <Check size={16} className="text-green-700 dark:text-green-400" />}
            </span>
            <span className="text-title-large text-on-background dark:text-dark-on-background">
                {title}
            </span>
        </Link>
    )
}
