"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const Select = ({
  label,
  isRequired,
  options = [],
  defaultOption,
  onChange,
}: {
  label: string;
  isRequired?: boolean;
  options?: { value: string; name: string }[];
  defaultOption: string;
  onChange: (val: string) => void;
}) => {
  return (
    <fieldset className="relative">
      <label
        className={`
          pointer-events-none absolute left-0 pl-6 origin-[0] transform duration-200
          uppercase body-16 text-primary-black
          peer-placeholder:text-gray-100
          top-1/2 scale-75 -translate-y-[22px]
        `}
      >
        {label}
      </label>
      <select
        required={isRequired}
        defaultValue={defaultOption}
        className={`
          body-18 bg-white rounded-3xl w-full appearance-none
          pl-4 pb-3 pt-8 border border-white
          focus:border-gray-300 focus:outline-none focus:ring-0 
        `}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <ChevronDownIcon className="w-5" />
      </div>
    </fieldset>
  );
};
