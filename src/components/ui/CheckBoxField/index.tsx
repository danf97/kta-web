"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export const CheckBoxField = (inputProps: {
  name: string;
  label: string | React.ReactNode;
  initialValue: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  onChange?: (val: boolean) => void;
  readonly?: boolean;
  error: string | null;
}) => {
  const {
    name,
    label,
    initialValue = false,
    register = {},
    onChange,
    readonly = false,
    error = null,
  } = inputProps;

  const [value, setValue] = useState(initialValue);

  const handleOnChange = (val: boolean) => {
    if (readonly) return null;
    setValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <>
      <div id={`input-${name}`} className={`relative my-2`}>
        <input
          type="checkbox"
          className="hidden"
          // value={value}
          name={name}
          checked={value}
          {...register}
          // onChange={onChange}
          readOnly={readonly}
        />

        <label
          htmlFor={`input-${name}`}
          className={`flex flex-row gap-[10px] group ${
            readonly ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => {
            handleOnChange(!value);
          }}
        >
          <div className="mt-[2px] bg-white border border-gray-300 rounded-sm min-w-5 h-5 flex items-center justify-center group-hover:border-gray-400 transition-all">
            {value && <CheckIcon className="h-4 w-4" />}
          </div>
          <span className="select-none body-16 mt-[2px]">{label}</span>
        </label>
        <p
          className={`${
            error ? "opacity-100 max-h-[100%] py-2 mb-3" : "max-h-0 opacity-0"
          } body-16 relative  text-accent-red transition-all duration-200 
        `}
        >
          {error}
        </p>
      </div>
    </>
  );
};
