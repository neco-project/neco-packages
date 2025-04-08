// ModalSelector.tsx
import React from "react";
import DynamicModal from "../Modal"; // مسیر صحیح به DynamicModal.tsx
import RolePickerTabs from "./RolePickerTabs"; // مسیر صحیح به RolePickerTabs.tsx

export interface ModalSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (data: any) => void;
}

const ModalSelector: React.FC<ModalSelectorProps> = ({ isOpen, onClose, onSelect }) => {
  return (
    <DynamicModal isOpen={isOpen} onClose={onClose} title="Select a Row">
      <RolePickerTabs onSelect={onSelect} onClose={onClose} />
    </DynamicModal>
  );
};

export default ModalSelector;
