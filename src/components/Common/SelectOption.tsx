import React, { useState, useEffect } from "react";
import {
  Select,
  MultiSelect,
  Button,
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
  options = [],
  selectedValue,
  onChange,
  label = "Select",
  showButton = false,
  onButtonClick,
  leftIcon,
  disabled = false,
  loading = false,
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

  let renderedSelect;
  if (multiple) {
    const multiSelectProps: MultiSelectProps = {
      leftSection: leftIcon,
      label,
      value: selectedValue as string[],
      onChange: handleChangeMulti,
      disabled,
      data: data,
    };
    renderedSelect = <MultiSelect className="w-full" {...multiSelectProps} />;
  } else {
    const selectProps: SelectProps = {
      label,
      value: selectedValue as string,
      onChange: handleChangeSingle,
      disabled,
      data: data, // اضافه کردن اینجا
    };
    renderedSelect = <Select className="w-full" {...(selectProps as any)} />;
  }

  return (
    <div className="flex gap-2 items-end">
      {renderedSelect}
      {showButton && !loading && (
        <Button onClick={onButtonClick} disabled={disabled} title="اضافه کردن">
          ...
        </Button>
      )}
    </div>
  );
};

export default SelectOption;
