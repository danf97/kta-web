"use client";

export const Select = ({
  label,
  isRequired,
  options = [],
}: {
  label: string;
  isRequired?: boolean;
  options?: { value: string; label: string }[];
}) => {
  return (
    <fieldset>
      <label>{label}</label>
      <select required={isRequired}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
};
