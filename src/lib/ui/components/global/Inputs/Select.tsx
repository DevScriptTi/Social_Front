"use client";

import { ArrowBigDown } from "lucide-react";
import React, { ReactNode } from "react";
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";

interface SelectProps {
  children: ReactNode;
  label?: string;
  title?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  showError?: boolean;
  showIcon?: boolean;
  className?: string;
}

interface OptionProps {
  option: string;
  value: string | number;
  label: string;
  setValue: UseFormSetValue<any>;
}

export const Select = ({
  children,
  label = "label",
  title = "عنوان",
  placeholder = "النص المساعد",
  register,
  error = undefined,
  showError = true,
  showIcon = true,
  className = ''
}: SelectProps) => {
  const handleFocus = () => {
    const list = document.getElementById(`${label}-list`);
    list?.classList.remove("invisible");
  };

  const handleBlur = () => {
    setTimeout(() => {
      const input = document.getElementById(label);
      const list = document.getElementById(`${label}-list`);
      input?.blur();
      list?.classList.add("invisible");
    }, 300);
  };

  return (
    <div className={`flex flex-col items-start gap-4 ${className ? className : 'w-full'}`}>
      <label
        htmlFor={label}
        className={`relative flex ${showIcon ? 'items-center gap-2' : ''} h-14 rounded-md w-full border-2 ${
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
        <input
          onFocus={handleFocus}
          onBlurCapture={handleBlur}
          onKeyDown={(event) => {
            event.preventDefault(); // Prevent any key from being typed
          }}
          readOnly
          type="text"
          placeholder={placeholder}
          {...register}
          id={label}
          className={`w-full bg-transparent placeholder:italic focus:outline-none text-body-large ${
            error
              ? "text-error dark:text-dark-error"
              : "text-on-surface dark:text-dark-on-surface"
          }`}
        />
        <ul
          id={`${label}-list`}
          className="invisible custom-scrollbar overflow-y-auto absolute top-full start-0 z-20 w-full max-h-28 divide-y divide-outline-variant dark:divide-dark-outline-variant bg-surface-container dark:bg-dark-surface-container"
        >
          {children}
        </ul>
        {showIcon && (
          <span
            className={`flex items-center ${
              error
                ? "text-error dark:text-dark-error"
                : "text-primary dark:text-dark-primary"
            }`}
          >
            <ArrowBigDown />
          </span>
        )}
      </label>
      {showError && error && (
        <span className="text-error dark:text-dark-error text-body-large">
          *{error?.message?.toString()}
        </span>
      )}
    </div>
  );
};

Select.Option = ({ option, value, label, setValue }: OptionProps) => {
  return (
    <li
      className="block cursor-pointer size-full bg-surface-container-high dark:bg-dark-surface-container-high px-4 py-2 text-on-surface dark:text-dark-on-surface text-lable-large hover:bg-primary-container dark:hover:bg-dark-primary-container"
      onClick={() => {
        setValue(`${label}-helper`, option);
        setValue(label, value);
      }}
    >
      {option}
    </li>
  );
};