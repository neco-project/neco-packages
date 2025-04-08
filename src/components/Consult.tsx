// Consult.tsx

import React, { useState } from "react";
import SelectOption from "./SelectOption";
import ModalSelector from "./ModalSelector/Main";
import CityComboBox from "./ComboBox";  // ← کامپوننت کمبو باکس جدید

const Consult: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // گزینه‌های لوکال در SelectOption:
  const options = [
    { value: "1", label: "Role A " },
    { value: "2", label: "Role B " },
    { value: "3", label: "Role C " },
    { value: "100", label: "Group A " },
    { value: "200", label: "Group B " },
  ];

  // تغییر مقدار سلکت
  const handleSelectorChange = (value: string | string[]) => {
    setSelectedValue(value as string[]);
  };

  // نمایش مودال
  const handleSelectorButtonClick = () => {
    setIsModalOpen(true);
  };

  // دریافت نتایج انتخاب از مودال
  const handleModalSelect = (data: any[]) => {
    const ids = data.map((item) => item.id);
    setSelectedValue((prev) => Array.from(new Set([...prev, ...ids])));
  };

  return (
    <div className="p-4 space-y-8">
      {/* کمبو باکس شهرها (CityComboBox) در بالا */}
      <CityComboBox />

      {/* سلکت چندانتخابی شما در پایین */}
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

      {/* مودال */}
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
