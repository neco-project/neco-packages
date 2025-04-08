// Consult.tsx
import React, { useState } from "react";
import CityComboBox from "./ComboBox";
import SelectOption from "./SelectOption";
import ModalSelector from "./ModalSelector/Main";

const Consult: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = [
    { value: "1", label: "Role A" },
    { value: "2", label: "Role B" },
    { value: "3", label: "Role C" },
    { value: "100", label: "Group A" },
    { value: "200", label: "Group B" },
  ];

  const handleSelectorChange = (value: string | string[]) => {
    setSelectedValue(value as string[]);
  };

  const handleSelectorButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSelect = (data: any[]) => {
    const newIds = data.map(item => item.id);
    setSelectedValue(prev => Array.from(new Set([...prev, ...newIds])));
  };

  return (
    <div className="p-4 space-y-8">
      <CityComboBox />
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
