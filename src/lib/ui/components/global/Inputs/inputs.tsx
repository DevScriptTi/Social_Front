"use client";
import { LoginData } from "@/lib/server/types/auth/login/Login";
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export const Input = <T extends FieldValues>({
  label = "label" as Path<T>,
  title = "عنوان",
  placeholder = "النص المساعد",
  error = undefined,
  type = "text",
  register 
}: {
  register: UseFormRegister<T>
  label?: Path<T>;
  title?: string;
  placeholder?: string;
  error?: string | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
}) => {
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <label
        className={`relative z flex items-center h-14 rounded-md w-full border-2 ${
          error
            ? "border-error dark:border-dark-error"
            : "border-primary dark:border-dark-primary"
        } px-4 focus:outline-none ring-4 ring-surface dark:ring-dark-surface ${
          error
            ? "has-[:focus]:ring-error dark:has-[:focus]:ring-dark-error"
            : "has-[:focus]:ring-primary dark:has-[:focus]:ring-dark-primary"
        } ring-offset-4 ring-offset-surface dark:ring-offset-dark-surface`}
        htmlFor={label}
      >
        <span
          className={`absolute z-0 top-0 px-2 text-lable-large -translate-y-1/2 bg-surface-container-low dark:bg-dark-surface-container-low ${
            error
              ? "text-error dark:text-dark-error"
              : "text-on-surface dark:text-dark-on-surface"
          }`}
        >
          {title}
        </span>
        <input
          className={`w-full bg-transparent placeholder:italic focus:outline-none text-body-large ${
            error
              ? "text-error dark:text-dark-error"
              : "text-on-surface dark:text-dark-on-surface"
          }`}
          
          id={label}
          placeholder={placeholder}
          // name={label}
          // defaultValue={value}
          type={type} // Fixed: Removed duplicate type attribute
          {...register(label)}
        />
      </label>
      {error && (
        <span className="text-error dark:text-dark-error text-body-large">
          (*{error})
        </span>
      )}
    </div>
  );
};