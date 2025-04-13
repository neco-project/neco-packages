// GenericCombobox.tsx
import React, { useState } from "react";
import {
  ActionIcon,
  Button,
  Combobox,
  Input,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export interface GenericComboboxProps {
  options: string[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const GenericCombobox: React.FC<GenericComboboxProps> = ({
  options: allOptions,
  label,
  value,
  onChange,
  placeholder = "",
}) => {
  // مقدار ورودی در Textarea (که همان مقدار انتخاب‌شده است)
  const [inputValue, setInputValue] = useState(value);
  // وضعیت باز/بسته بودن dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const combobox = useCombobox();

  // فیلتر کردن گزینه‌ها بر اساس ورودی کاربر
  const trimmedInput = inputValue.trim().toLowerCase();
  const anyMatch = trimmedInput
    ? allOptions.some((opt) => opt.toLowerCase().includes(trimmedInput))
    : true;

  const filteredOptions = anyMatch
    ? allOptions.filter((opt) => {
        if (!trimmedInput) return true;
        return opt.toLowerCase().includes(trimmedInput);
      })
    : allOptions;

  const renderedOptions = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  // وقتی یک گزینه انتخاب می‌شود
  const handleOptionSubmit = (optionValue: string) => {
    setInputValue(optionValue);
    onChange(optionValue);
    combobox.closeDropdown();
    setIsDropdownOpen(false);
  };

  // تغییر مقدار ورودی Textarea
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setInputValue(newValue);
    onChange(newValue);

    const trimmed = newValue.trim().toLowerCase();
    const matchingOptions = allOptions.filter((opt) =>
      opt.toLowerCase().includes(trimmed)
    );
    if (matchingOptions.length > 0) {
      if (!isDropdownOpen) {
        combobox.openDropdown();
        setIsDropdownOpen(true);
      }
      combobox.updateSelectedOptionIndex();
    } else {
      if (isDropdownOpen) {
        combobox.closeDropdown();
        setIsDropdownOpen(false);
      }
    }
  };

  // تابع toggle برای آیکن فلش
  const toggleDropdown = () => {
    if (isDropdownOpen) {
      combobox.closeDropdown();
      setIsDropdownOpen(false);
    } else {
      combobox.openDropdown();
      setIsDropdownOpen(true);
    }
  };

  return (
    <div>
      <Combobox onOptionSubmit={handleOptionSubmit} store={combobox}>
        <Combobox.Target>
          <TextInput
            label={label}
            placeholder={placeholder}
            leftSection={
              <ActionIcon variant="subtle" onClick={toggleDropdown}>
                <IconChevronDown stroke={1} />
              </ActionIcon>
            }
            value={inputValue}
            onChange={handleChange}
            onBlur={() => {
              combobox.closeDropdown();
              setIsDropdownOpen(false);
            }}
            rightSection={
              value !== "" ? (
                <Input.ClearButton onClick={() => setInputValue("")} />
              ) : undefined
            }
            rightSectionPointerEvents="auto"
            onClick={() => combobox.openDropdown()}
          />
          
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {renderedOptions.length === 0 ? (
              <Combobox.Empty>گزینه‌ای یافت نشد</Combobox.Empty>
            ) : (
              renderedOptions
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};

export default GenericCombobox;
