// SelectOption.tsx
import React, { useState, useEffect } from "react";
import {
  Select,
  MultiSelect,
  Button,
  Loader,
  SelectProps,
  MultiSelectProps,
} from "@mantine/core";

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

  // let baseSelectProps: any = {
  //   id: name,
  //   placeholder: "انتخاب کنید",
  //   data: data.map((option) => ({ value: option.value, label: option.label })),
  //   disabled,
  //   error: error ? (errorMessage ? errorMessage : true) : undefined,
  // };

  // if (allowCustom) {
  //   baseSelectProps["creatable"] = allowCustom;
  //   baseSelectProps["getCreateLabel"] = (query: string) => `Add "${query}"`;
  //   baseSelectProps["onCreate"] = (query: string) => {
  //     const newOption = { value: query, label: query };
  //     setData((current: Option[]) => [...current, newOption]);
  //     if (multiple) {
  //       onChange([...((selectedValue as string[]) || []), query]);
  //     } else {
  //       onChange(query);
  //     }
  //     return query;
  //   };
  // }

  let renderedSelect;
  if (multiple) {
    const multiSelectProps: MultiSelectProps = {
      leftSection: leftIcon,
      label,
      value: selectedValue as string[],
      onChange: handleChangeMulti,
    };
    renderedSelect = <MultiSelect className="w-full" {...multiSelectProps} />;
  } else {
    const selectProps: SelectProps = {
      label,
      leftSection: leftIcon,
      value: selectedValue as string,
      onChange: handleChangeSingle,
    };
    renderedSelect = <Select className="w-full" {...(selectProps as any)} />;
  }

  return (
    <div className={'flex gap-2 items-end'}>
     
        {renderedSelect}
        {showButton && !loading && (
          <Button
            onClick={onButtonClick}
            disabled={disabled}
            title="اضافه کردن"
          >
            ...
          </Button>
        )}
    </div>
  );
};

export default SelectOption;
