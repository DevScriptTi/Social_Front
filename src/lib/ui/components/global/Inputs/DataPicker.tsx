"use client";

import React, { useEffect } from "react";
import { Select } from "./Select";
import { format } from "date-fns";

export const DatePicker = ({
  title = "عنوان",
  label = "label",
  error = undefined,
  register ,
  watch ,
  setValue ,
}:{
    title?: string;
    label?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    register: (...params: any[]) => UseFormRegisterReturn;
    watch: (...params: any[]) => any;
    setValue: (...params: any[]) => void;
}) => {
  const y = watch(label+"-year");
  const m = watch(label+"-month");
  const d = watch(label+"-day");
  useEffect(() => {
    if (y && m && d) {
      setValue(label, `${y}-${m}-${d}`);
      console.log(label);
    }
  }, [y, m, d, setValue]);
  return (
    <div className="flex flex-col items-start  min-w-[18.75rem] gap-6">
      <span
        className={` ${
          error
            ? "text-light-error dark:text-dark-error text-title-large"
            : "text-light-on-surface dark:text-dark-on-surface text-title-large"
        }`}
      >
        {title}
      </span>
      <div className="flex flex-col items-start  w-full">
        <div className="grid grid-cols-[2fr_1fr_1fr] w-full  gap-4">
          <Select
            showIcon={false}
            showError={false}
            className={"w-full]"}
            register={register}
            error={error}
            placeholder="YYYY"
            label={`${label}-year`}
            title="السنة"
          >
            {year().map((item) => {
              return (
                <Select.Option
                  key={item}
                  option={item}
                  value={item}
                  setValue={setValue}
                  label={`${label}-year`}
                />
              );
            })}
          </Select>
          <Select
            showIcon={false}
            showError={false}
            className={"w-full"}
            register={register}
            error={error}
            placeholder="MM"
            label={`${label}-month`}
            title="الشهر"
          >
            {month().map((item) => {
              return (
                <Select.Option
                  key={item}
                  option={item}
                  value={item}
                  setValue={setValue}
                  label={`${label}-month`}
                />
              );
            })}
          </Select>
          <Select
            showIcon={false}
            showError={false}
            className={"w-full"}
            register={register}
            error={error}
            placeholder="DD"
            label={`${label}-day`}
            title="اليوم"
          >
            {day().map((item) => {
              return (
                <Select.Option
                  key={item}
                  option={item}
                  value={item}
                  setValue={setValue}
                  label={`${label}-day`}
                />
              );
            })}
          </Select>
        </div>
        {error && (
          <span className="text-light-error dark:text-dark-error text-body-large">
            *{error?.message}
          </span>
        )}
      </div>
    </div>
  );
};

const year = () => {
  let result = [];
  for (let index = +format(new Date(), "yyyy"); index > 1900; index--) {
    result.push(index);
  }
  return result;
};

const month = () => {
  let result = [];
  for (let index = 12; index > 0; index--) {
    result.push(index);
  }
  return result;
};

const day = () => {
  let result = [];
  for (let index = 31; index > 0; index--) {
    result.push(index);
  }
  return result;
};