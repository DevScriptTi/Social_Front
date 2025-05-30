"use client";
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export const FileInput = <T extends FieldValues>({
  label,
  title,
  error,
  register,
  accept,
}: {
  register: UseFormRegister<T>;
  label: Path<T>;
  title: string;
  error?: string;
  accept?: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <label className={`...`} htmlFor={label}>
        <span className={`...`}>{title}</span>
        <input
          className="w-full bg-transparent focus:outline-none text-body-large"
          id={label}
          type="file"
          accept={accept}
          {...register(label, {
            setValueAs: (value: FileList) => {
              return value && value.length > 0 ? value[0] : undefined;
            },
          })}
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