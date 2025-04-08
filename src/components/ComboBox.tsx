// CityComboBox.tsx
import React, { useState } from 'react';
import { Combobox, Textarea, useCombobox } from '@mantine/core';
import { IconChevronDown, IconX } from '@tabler/icons-react';

/**
 * کامپوننت ComboBox برای انتخاب شهرها.
 * - آیتم‌های انتخاب‌شده به صورت chip بالای Textarea نمایش داده می‌شوند.
 * - یک آیکن فلش پایین در سمت چپ ورودی Textarea قرار دارد که
 *   با کلیک روی آن dropdown باز یا بسته می‌شود.
 * - آیتم‌های انتخاب‌شده در لیست dropdown به صورت disabled نمایش داده می‌شوند.
 * - اگر کاربر در Textarea چیزی تایپ کند و نتیجه‌ی جستجو (match) وجود نداشته باشد،
 *   dropdown بسته بماند.
 * - اگر تطبیق وجود داشته باشد و کاربر گزینه‌ای از لیست انتخاب کند، مقدار ورودی پاک می‌شود.
 *   در غیر این صورت مقدار وارد شده حفظ خواهد شد.
 */
const CityComboBox: React.FC = () => {
  const allCities = ['تهران', 'شیراز', 'تبریز', 'مشهد', 'اصفهان', 'کرج', 'قم', 'اهواز'];

  // نگهداری آیتم‌های انتخاب‌شده (چندتایی)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // نگهداری مقدار ورودی در Textarea
  const [inputValue, setInputValue] = useState('');
  // کنترل وضعیت باز/بسته dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const combobox = useCombobox();

  // محاسبه مقدار ورودی کاربر (به صورت lowercase و trimmed)
  const trimmedInput = inputValue.trim().toLowerCase();
  const anyMatch = trimmedInput
    ? allCities.some(city => city.toLowerCase().includes(trimmedInput))
    : true;

  // فیلتر کردن گزینه‌ها
  // اگر تطبیق وجود داشته باشد، فقط گزینه‌های مطابق را نمایش می‌دهد؛ در غیر این صورت کل لیست نمایش داده شود.
  const filteredOptions = anyMatch
    ? allCities.filter(city => {
        if (!trimmedInput) return true;
        return city.toLowerCase().includes(trimmedInput);
      })
    : allCities;

  // ترکیب آیتم‌های انتخاب‌شده با گزینه‌های فیلترشده (بدون تکرار)
  const unionOptions = Array.from(new Set([...selectedItems, ...filteredOptions]));

  // ساخت گزینه‌های Combobox؛ آیتم‌های انتخاب‌شده به صورت disabled نمایش داده می‌شوند.
  const options = unionOptions.map(item => (
    <Combobox.Option value={item} key={item} disabled={selectedItems.includes(item)}>
      {item}
    </Combobox.Option>
  ));

  // در handleOptionSubmit، اگر مقدار تایپ شده (inputValue) تطبیق داشته باشد، پاک می‌شود.
  const handleOptionSubmit = (optionValue: string) => {
    if (!selectedItems.includes(optionValue)) {
      setSelectedItems(prev => [...prev, optionValue]);
    }
    // اگر کاربر متنی تایپ کرده است (غیر خالی) و همان مقدار با برخی از گزینه‌ها مطابقت داشته باشد،
    // مقدار ورودی پاک می‌شود.
    if (inputValue.trim() !== '' && anyMatch) {
      setInputValue('');
    }
    combobox.closeDropdown();
    setIsDropdownOpen(false);
  };

  // تغییر مقدار ورودی Textarea؛ dropdown تنها زمانی باز شود که گزینه‌ای مطابق وجود داشته باشد.
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

  // تابع toggle برای دکمه آیکن فلش
  const toggleDropdown = () => {
    if (isDropdownOpen) {
      combobox.closeDropdown();
      setIsDropdownOpen(false);
    } else {
      combobox.openDropdown();
      setIsDropdownOpen(true);
    }
  };

  // حذف یک آیتم از selectedItems
  const removeItem = (itemToRemove: string) => {
    setSelectedItems(prev => prev.filter(city => city !== itemToRemove));
  };

  return (
    <div>
      {/* نمایش آیتم‌های انتخاب‌شده به صورت Chip-like */}
      {selectedItems.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedItems.map(city => (
            <div
              key={city}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded flex items-center gap-1"
            >
              <span>{city}</span>
              <IconX
                size={16}
                className="cursor-pointer hover:text-red-600"
                onClick={() => removeItem(city)}
              />
            </div>
          ))}
        </div>
      )}

      <Combobox onOptionSubmit={handleOptionSubmit} store={combobox}>
        <Combobox.Target>
          {/* ظرف relative برای Textarea و آیکن */}
          <div className="relative">
            {/* آیکن فلش که با کلیک آن dropdown toggle می‌شود */}
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
              style={{ paddingLeft: '2.8rem' }}
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
