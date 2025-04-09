// CityComboBox.tsx
import React, { useState } from 'react';
import { Combobox, Textarea, useCombobox } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';


const CityComboBox: React.FC = () => {
  const allCities = ['تهران', 'شیراز', 'تبریز', 'مشهد', 'اصفهان', 'کرج', 'قم', 'اهواز'];

  // state برای مقدار ورودی در Textarea (در اینجا همان مقدار انتخاب‌شده است)
  const [inputValue, setInputValue] = useState('');
  // state برای کنترل وضعیت باز/بسته dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const combobox = useCombobox();

  // محاسبه مقدار ورودی کاربر (به صورت lowercase و trimmed)
  const trimmedInput = inputValue.trim().toLowerCase();
  const anyMatch = trimmedInput
    ? allCities.some(city => city.toLowerCase().includes(trimmedInput))
    : true;

  // فیلتر کردن گزینه‌ها: اگر تطابق وجود داشته باشد، فقط گزینه‌های مطابق را نشان می‌دهد،
  // در غیر این صورت کل لیست نمایش داده شود.
  const filteredOptions = anyMatch
    ? allCities.filter(city => {
        if (!trimmedInput) return true;
        return city.toLowerCase().includes(trimmedInput);
      })
    : allCities;

  // ساخت گزینه‌های Combobox (از آنجایی که انتخاب تکی است، نیازی به disabled کردن نیست)
  const options = filteredOptions.map(item => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  // وقتی یک گزینه انتخاب شود: مقدار Textarea به مقدار گزینه تغییر می‌کند.
  const handleOptionSubmit = (optionValue: string) => {
    setInputValue(optionValue);
    combobox.closeDropdown();
    setIsDropdownOpen(false);
  };

  // تغییر مقدار ورودی Textarea؛ در اینجا dropdown تنها زمانی باز می‌شود که گزینه‌ای مطابق وجود داشته باشد.
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value;
    setInputValue(newValue);

    const trimmed = newValue.trim().toLowerCase();
    const matchingOptions = allCities.filter(city =>
      city.toLowerCase().includes(trimmed)
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

  // تابع toggle برای آیکن فلش: اگر dropdown باز باشد آن را می‌بندد و در غیر این صورت می‌بندد.
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
              placeholder=""
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
            {options.length === 0 ? (
              <Combobox.Empty>شهری یافت نشد</Combobox.Empty>
            ) : (
              options
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};

export default CityComboBox;
