"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

interface Props {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
}

export const Select = ({
  onChange,
  disabled,
  onCreate,
  options,
  placeholder,
  value,
}: Props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options?.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreatableSelect
      placeholder={placeholder}
      className="text-sm h-10"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0",
          },
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  );
};
