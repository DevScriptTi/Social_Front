"use client";

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SimpleSelectProps {
    children: React.ReactNode;
    label: string;
    title: string;
    error?: string | undefined;
    register?: UseFormRegisterReturn;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SimpleSelect = ({
    children,
    label,
    title,
    error,
    register,
    disabled = false,
    onChange,
}: SimpleSelectProps) => {
    return (
        <div className="flex flex-col items-start gap-4 w-full">
            <label
                htmlFor={label}
                className={`relative flex items-center h-14 rounded-md w-full border-2 ${
                    error
                        ? "border-error dark:border-dark-error"
                        : "border-primary dark:border-dark-primary"
                } px-4 focus:outline-none ring-4 ring-surface dark:ring-dark-surface ${
                    error
                        ? "has-[:focus]:ring-error dark:has-[:focus]:ring-dark-error"
                        : "has-[:focus]:ring-primary dark:has-[:focus]:ring-dark-primary"
                } ring-offset-4 ring-offset-surface dark:ring-offset-dark-surface`}
            >
                <span
                    className={`absolute top-0 px-2 text-lable-large -translate-y-1/2 bg-surface-container-low dark:bg-dark-surface-container-low ${
                        error
                            ? "text-error dark:text-dark-error"
                            : "text-on-surface dark:text-dark-on-surface"
                    }`}
                >
                    {title}
                </span>
                <select
                    id={label}
                    className={`w-full bg-surface-container-low dark:bg-dark-surface-container-low focus:outline-none text-body-large ${
                        error
                            ? "text-error dark:text-dark-error"
                            : "text-on-surface dark:text-dark-on-surface"
                    }`}
                    disabled={disabled}
                    {...register}
                    onChange={onChange}
                >
                    {children}
                </select>
            </label>
            {error && (
                <span className="text-error dark:text-dark-error text-body-large">
                    *{error}
                </span>
            )}
        </div>
    );
}; 