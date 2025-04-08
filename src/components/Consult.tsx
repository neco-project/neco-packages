// Consult.tsx
import React, { useState } from "react";
import SelectOption from "./SelectOption";
import ModalSelector from "./ModalSelector/Main";

const Consult: React.FC = () => {
  // در حالت چند انتخابی، آرایه از استرینگ (ID ها)
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // نمونه داده برای SelectOption. value باید با ID در جدول یکی باشد.
  const options = [
    { value: "1", label: "Role A" },
    { value: "2", label: "Role B " },
    { value: "3", label: "Role C " },
    { value: "100", label: "Group A " },
    { value: "200", label: "Group B " },
  ];

  // کاربر مستقیماً در SelectOption تغییر انتخاب دهد
  const handleSelectorChange = (value: string | string[]) => {
    setSelectedValue(value as string[]);
  };

  // کلیک دکمۀ ...
  const handleSelectorButtonClick = () => {
    setIsModalOpen(true);
  };

  // اگر از مودال یک لیست از [{id, name}] بیاید
  const handleModalSelect = (data: any[]) => {
    // تبدیل آرایه‌ی اشیاء به آرایه‌ی ID
    // data: [{id: '2', name: 'Role B'}, {id: '200', name: 'Group B'}, ...]
    const ids = data.map((item) => item.id);

    // بدون تکرار
    setSelectedValue((prev) => Array.from(new Set([...prev, ...ids])));
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

      <ModalSelector
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleModalSelect}
        preSelectedIds={selectedValue}
      />
    </div>
  );
};

export default Consult;
