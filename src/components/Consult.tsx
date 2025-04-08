// Consult.tsx
import React, { useState } from "react";
import SelectOption from "./SelectOption"; // مسیر صحیح فایل SelectOption.tsx را تنظیم کنید
import ModalSelector from "./ModalSelector/Main"; // مسیر صحیح ModalSelector.tsx

const Consult: React.FC = () => {
  // در حالت چند انتخابی، مقدار انتخاب شده آرایه‌ای از رشته‌ها است.
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  // تغییر مقدار سلکتور
  const handleSelectorChange = (value: string | string[]) => {
    setSelectedValue(value as string[]);
  };

  // باز کردن مودال هنگام کلیک روی دکمه «...»
  const handleSelectorButtonClick = () => {
    setIsModalOpen(true);
  };

  // زمانی که در مودال انتخاب می‌شود (مثلاً از RolePickerTabs)
  const handleModalSelect = (data: any) => {
    // فرض کنید data به صورت آرایه‌ای از اشیاء با فیلد name است.
    const names = Array.isArray(data)
      ? data.map((item) => item.name)
      : [data.name];
    // انتخاب‌های جدید را بدون تکرار به آرایه موجود اضافه می‌کنیم.
    setSelectedValue((prev) => Array.from(new Set([...prev, ...names])));
  };

  return (
    <div className="p-4">
      <SelectOption
        name="selector"
        options={options}
        selectedValue={selectedValue}
        onChange={handleSelectorChange}
        label="Select Option"
        showButton
        onButtonClick={handleSelectorButtonClick}
        allowCustom
        multiple
      />
      
      {/* سایر بخش‌های صفحه می‌تواند در اینجا قرار گیرد */}

      <ModalSelector
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleModalSelect}
      />
    </div>
  );
};

export default Consult;
