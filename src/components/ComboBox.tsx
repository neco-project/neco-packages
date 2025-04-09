// GenericCombobox.tsx
import React, { useState } from 'react';
import { Combobox, Textarea, useCombobox } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

export interface GenericComboboxProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const GenericCombobox: React.FC<GenericComboboxProps> = ({
  options: allOptions,
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
    ? allOptions.some(opt => opt.toLowerCase().includes(trimmedInput))
    : true;

  const filteredOptions = anyMatch
    ? allOptions.filter(opt => {
        if (!trimmedInput) return true;
        return opt.toLowerCase().includes(trimmedInput);
      })
    : allOptions;

  const renderedOptions = filteredOptions.map(item => (
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
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value;
    setInputValue(newValue);
    onChange(newValue);

    const trimmed = newValue.trim().toLowerCase();
    const matchingOptions = allOptions.filter(opt =>
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
          {/* ظرف relative برای Textarea و آیکن */}
          <div className="relative">
            <div
              onClick={toggleDropdown}
              style={{
                width: '2.5rem',
                height: '100%',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
              }}
              className="absolute left-0 top-0 flex items-center justify-center cursor-pointer"
            >
              <IconChevronDown size={16} className="text-gray-500" />
            </div>
            <Textarea
              placeholder={placeholder}
              value={inputValue}
              onChange={handleChange}
              onBlur={() => {
                combobox.closeDropdown();
                setIsDropdownOpen(false);
              }}
              autosize
              minRows={2}
              maxRows={4}
              style={{ paddingLeft: '2.8rem', textAlign: 'right' }}
            />
          </div>
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
