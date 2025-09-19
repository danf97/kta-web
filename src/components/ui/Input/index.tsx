"use client";

import {
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  register?: object;
  asTextArea?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  classes?: string;
  readOnly?: boolean;
  isRequired?: boolean;
  searchIcon?: boolean;
  isPassword?: boolean;
  inputClasses?: string;
  initialValue?: string;
  isLoading?: boolean;
  isNewsletter?: boolean;
}

export const Input = (inputProps: InputProps) => {
  const {
    asTextArea,
    label,
    error,
    register,
    name,
    onChange,
    classes,
    type,
    readOnly,
    isRequired,
    searchIcon,
    isPassword,
    inputClasses,
    placeholder = "",
    initialValue = "",
    isLoading = false,
    isNewsletter,
  } = inputProps;

  const [customType, setCustomType] = useState(type);
  const [inputValue, setInputValue] = useState(
    initialValue ? initialValue : ""
  );

  const handleClearInput = () => {
    setInputValue("");
    // onChange?.({ target: { value: '' } } as React.ChangeEvent<
    //   HTMLInputElement | HTMLTextAreaElement
    // >)
  };

  const props = {
    name,
    ...(type && { type: customType }),
    ...(readOnly && { readOnly }),
    ...(isRequired && { required: true }),
    //onChange cannot be used with register since register works with uncontrollable components
    ...(onChange && { onChange }),
    ...register,
    placeholder: placeholder,
    value: inputValue,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setInputValue(e.target.value);
      onChange?.(e);
    },
    className: `
      body-18
      ${asTextArea ? "pt-6 h-[170px]" : ""}
      bg-white rounded-3xl w-full appearance-none
      pl-4 pb-3 pt-8 border border-white
      focus:border-gray-300 focus:outline-none focus:ring-0 
      ${error ? "!border-accent-red !border-[1px] !text-accent-red" : ""} 
      peer 
      ${searchIcon ? "!pl-[calc(24px+32px)]" : ""} 
      ${readOnly ? "!border-b opacity-50 cursor-not-allowed" : ""}
      ${inputClasses}
      ${
        isNewsletter
          ? "!bg-transparent !text-white !border-white !pr-[30px]"
          : ""
      }
    `,
  };

  return (
    <>
      <div id={`input-${name}`} className={`relative ${classes}`}>
        {asTextArea ? <textarea {...props} /> : <input {...props} />}
        {searchIcon && (
          <span className="absolute left-[16px] top-1/2 -translate-y-1/2 [&_svg]:h-6 [&_svg]:w-6">
            <MagnifyingGlassIcon />
          </span>
        )}
        <label
          className={`
            pointer-events-none absolute left-0 pl-6 origin-[0] transform duration-200
            uppercase body-16 text-primary-black
            peer-placeholder:text-gray-100
            ${
              !asTextArea
                ? "top-1/2 -translate-y-1/2 scale-100 peer-focus:scale-75 peer-focus:-translate-y-[22px]"
                : "top-8 -translate-y-[22px] scale-75"
            } 
            ${searchIcon ? "ml-[calc(24px+16px)]" : ""}
            ${readOnly ? "opacity-50 cursor-not-allowed" : ""}
            ${
              inputValue !== "" || placeholder !== ""
                ? "!-translate-y-[22px] !scale-75"
                : ""
            }
            ${isNewsletter ? "!text-white" : ""}
          `}
          htmlFor={`input-${name}`}
        >
          {label}
        </label>
        {inputValue?.length > 0 && !isLoading && !isNewsletter && !readOnly && (
          <button
            type="button"
            className={`absolute ${
              isPassword ? "right-16" : "right-4"
            } top-1/2 -translate-y-1/2 cursor-pointer hidden peer-hover:block hover:block`}
            onClick={handleClearInput}
          >
            <XMarkIcon />
          </button>
        )}
        <span
          className={`absolute top-0 right-0 w-full h-full flex justify-end items-center ${
            isLoading ? "opacity-100 visible" : "opacity-0 hidden"
          }`}
        >
          {/* <LoadingIcon /> */}
          loading...
        </span>
        {isNewsletter && (
          <button
            className={`absolute top-0 right-0 w-6 h-full flex justify-end items-center ${
              !isLoading ? "opacity-100 visible" : "opacity-0 hidden"
            }`}
          >
            <CheckIcon />
          </button>
        )}
        {isPassword && (
          <>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                customType === "password"
                  ? setCustomType("text")
                  : setCustomType("password");
              }}
            >
              {customType === "password" && <EyeIcon />}
              {customType === "text" && <EyeSlashIcon />}
            </button>
          </>
        )}
      </div>
      <p
        className={`${
          error
            ? "opacity-100 max-h-[100%] pl-4 py-1 mb-3"
            : "max-h-0 opacity-0"
        } body-16 relative  text-accent-red transition-all duration-200 ${
          isNewsletter ? "!text-accent-red" : ""
        }`}
      >
        {error}
      </p>
    </>
  );
};
