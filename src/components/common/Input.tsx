import type { ChangeEvent, FC } from "react";
import { useId, useState } from "react";

interface InputProps {
  type: "text" | "number";
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  min?: number;
  step?: number;
  suffix?: string;
  error?: string;
  disabled?: boolean;
}

export const Input: FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  id,
  min,
  step = 1,
  suffix,
  error,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [wasCleared, setWasCleared] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const rawValue = e.target.value;
      if (rawValue === "") {
        setWasCleared(true);
        onChange(0);
        return;
      }
      setWasCleared(false);
      let normalizedValue = rawValue;
      if (/^0\d/.test(rawValue)) {
        normalizedValue = rawValue.replace(/^0+/, "");
      } else if (/^-0\d/.test(rawValue)) {
        normalizedValue = `-${rawValue.replace(/^-0+/, "")}`;
      }
      onChange(Number(normalizedValue));
    } else {
      onChange(e.target.value);
    }
  };

  const inputValue =
    type === "number" && isFocused && wasCleared && Number(value) === 0 ? "" : value;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={type}
          value={inputValue}
          onChange={handleChange}
          onFocus={(e) => {
            setIsFocused(true);
            if (type === "number" && !disabled && Number(value) === 0) {
              e.currentTarget.select();
            }
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          placeholder={placeholder}
          min={min}
          step={step}
          disabled={disabled}
          className={`
            w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${error ? "border-red-500" : "border-gray-300"}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            ${suffix ? "pr-16" : ""}
          `}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
