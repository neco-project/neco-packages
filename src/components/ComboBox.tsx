// CityComboBox.tsx
import React, { useState } from 'react';
import { Combobox, Textarea, useCombobox } from '@mantine/core';
import { IconChevronDown, IconX } from '@tabler/icons-react';

/**
 * کامپوننت ComboBox برای انتخاب شهرها.
 * - آیتم‌های انتخاب شده به صورت chip بالای Textarea نمایش داده می‌شوند.
 * - یک آیکن فلش پایین در سمت چپ ورودی Textarea قرار دارد که
 *   تنها با کلیک روی آن dropdown باز می‌شود.
 * - دور آیکن یک border نمایش داده می‌شود و پس‌زمینه خاکستری کم است.
 */
const CityComboBox: React.FC = () => {
  const allCities = ['تهران', 'شیراز', 'تبریز', 'مشهد', 'اصفهان', 'کرج', 'قم', 'اهواز'];
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const combobox = useCombobox();

  // فیلتر کردن لیست شهرها بر اساس مقدار ورودی
  const filteredOptions = allCities.filter((city) =>
    city.toLowerCase().includes(inputValue.toLowerCase().trim())
  );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  // زمانی که کاربر یک گزینه را انتخاب می‌کند
  const handleOptionSubmit = (optionValue: string) => {
    if (!selectedItems.includes(optionValue)) {
      setSelectedItems((prev) => [...prev, optionValue]);
    }
    setInputValue('');
    combobox.closeDropdown();
  };

  // تغییر مقدار ورودی Textarea
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.currentTarget.value);
    // dropdown را باز نمی‌کنیم، تنها در صورت تایپ می‌توانید استفاده کنید
    // اگر می‌خواهید تایپ هم dropdown را باز کند، می‌توانید این خط را اضافه کنید:
    // combobox.openDropdown();
    combobox.updateSelectedOptionIndex();
  };

  // حذف یک آیتم از selectedItems
  const removeItem = (itemToRemove: string) => {
    setSelectedItems((prev) => prev.filter((city) => city !== itemToRemove));
  };

  return (
    <div>
      {/* نمایش آیتم‌های انتخاب‌شده به صورت Chip-like */}
      {selectedItems.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedItems.map((city) => (
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
          {/* ظرف relative برای قرار دادن آیکن در کنار Textarea */}
          <div className="relative">
            {/* آیکن فلش پایین همراه با رویداد onClick تنها روی این بخش */}
            <div
              onClick={() => combobox.openDropdown()}
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
              // حذف Label، Description و Placeholder
              placeholder=""
              value={inputValue}
              onChange={handleChange}
              // حذف onClick و onFocus برای جلوگیری از باز شدن dropdown هنگام کلیک روی Textarea
              onBlur={() => combobox.closeDropdown()}
              autosize
              minRows={2}
              maxRows={4}
              // فاصله داخلی سمت چپ برای جا دادن آیکن به همراه border
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
