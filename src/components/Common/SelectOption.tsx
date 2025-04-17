// Common/SelectOption.tsx
import React, { useState, useEffect } from 'react';
import { Select, MultiSelect, Button } from '@mantine/core';

export interface Option {
  value: string;
  label: string;
}

interface DynamicSelectorProps {
  name?: string;
  options: Option[];
  selectedValue: string | string[];
  onChange: (value: string | string[]) => void;
  label?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  multiple?: boolean;
  allowCustom?: boolean;
}

const SelectOption: React.FC<DynamicSelectorProps> = ({
  options = [],
  selectedValue,
  onChange,
  label = 'Select',
  showButton = false,
  onButtonClick,
  leftIcon,
  disabled = false,
  loading = false,
  multiple = false,
}) => {
  const [data, setData] = useState(options);

  useEffect(() => setData(options), [options]);

  const handleChangeSingle = (val: string | null) => val && onChange(val);
  const handleChangeMulti  = (vals: string[]) => onChange(vals);

  const selectProps = {
    label,
    disabled,
    leftSection: leftIcon,
    data,
  };

  return (
    <div className="flex gap-2 items-end">
      {multiple ? (
        <MultiSelect
          {...selectProps}
          value={selectedValue as string[]}
          onChange={handleChangeMulti}
          className="w-full"
        />
      ) : (
        <Select
          {...selectProps}
          value={selectedValue as string}
          onChange={handleChangeSingle}
          className="w-full"
        />
      )}

      {showButton && !loading && (
        <Button onClick={onButtonClick} disabled={disabled} title="اضافه کردن">
          ...
        </Button>
      )}
    </div>
  );
};

export default SelectOption;
