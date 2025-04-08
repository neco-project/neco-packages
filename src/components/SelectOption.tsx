// SelectOption.tsx
import React, { useState, useEffect } from "react";
import { Select, MultiSelect, Button, Loader, SelectProps, MultiSelectProps } from "@mantine/core";

export interface Option {
  value: string;
  label: string;
}

export interface DynamicSelectorProps {
  name?: string;
  options: Option[];
  selectedValue: string | string[];
  onChange: (value: string | string[]) => void;
  label?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
  leftIcon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  allowCustom?: boolean;
  multiple?: boolean;
}

const SelectOption: React.FC<DynamicSelectorProps> = ({
  name,
  options = [],
  selectedValue,
  onChange,
  label = "Select",
  showButton = false,
  onButtonClick,
  leftIcon,
  error = false,
  errorMessage = "",
  className,
  disabled = false,
  loading = false,
  allowCustom = false,
  multiple = false,
}) => {
  const [data, setData] = useState<Option[]>(options);

  useEffect(() => {
    setData(options);
  }, [options]);

  const handleChangeSingle = (value: string | null) => {
    if (value !== null) {
      onChange(value);
    }
  };

  const handleChangeMulti = (values: string[]) => {
    onChange(values);
  };

  let baseSelectProps: any = {
    id: name,
    placeholder: "انتخاب کنید",
    data: data.map((option) => ({ value: option.value, label: option.label })),
    disabled,
    error: error ? (errorMessage ? errorMessage : true) : undefined,
    style: {
      fontSize: "0.875rem",
      flex: 1,
      paddingLeft: leftIcon ? "32px" : undefined,
    },
  };

  if (allowCustom) {
    baseSelectProps["creatable"] = allowCustom;
    baseSelectProps["getCreateLabel"] = (query: string) => `Add "${query}"`;
    baseSelectProps["onCreate"] = (query: string) => {
      const newOption = { value: query, label: query };
      setData((current: Option[]) => [...current, newOption]);
      if (multiple) {
        onChange([...(selectedValue as string[] || []), query]);
      } else {
        onChange(query);
      }
      return query;
    };
  }

  let renderedSelect;
  if (multiple) {
    const multiSelectProps: MultiSelectProps = {
      ...baseSelectProps,
      value: selectedValue as string[],
      onChange: handleChangeMulti,
    };
    renderedSelect = <MultiSelect {...multiSelectProps} />;
  } else {
    const selectProps: SelectProps = {
      ...baseSelectProps,
      value: selectedValue as string,
      onChange: handleChangeSingle,
    };
    renderedSelect = <Select {...(selectProps as any)} />;
  }

  return (
    <div className={className}>
      {label && (
  <label
    htmlFor={name}
    style={{
      fontSize: "0.75rem",
      color: "#4B5563",
      marginBottom: "0.25rem",
      display: "block",
      textAlign: "left",
      fontWeight:"bold"
    }}
    title={label}
  >
    {label}
  </label>
)}

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "relative" }}>
        {leftIcon && (
          <div
            style={{
              position: "absolute",
              left: "8px",
              zIndex: 2,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            {leftIcon}
          </div>
        )}
        {renderedSelect}
        {showButton && !loading && (
          <Button onClick={onButtonClick} disabled={disabled} style={{ fontSize: "0.75rem" }} title="اضافه کردن">
            ...
          </Button>
        )}
      </div>
    </div>
  );
};

export default SelectOption;
