// ModalSelector.tsx
import React from "react";
import DynamicModal from "../Modal";
import RolePickerTabs from "./RolePickerTabs";

export interface ModalSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (data: any[]) => void;
  preSelectedIds?: string[];
}

const ModalSelector: React.FC<ModalSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  preSelectedIds = [],
}) => {
  return (
    <DynamicModal isOpen={isOpen} onClose={onClose}>
      <RolePickerTabs
        onSelect={onSelect}
        onClose={onClose}
        preSelectedIds={preSelectedIds}
      />
    </DynamicModal>
  );
};

export default ModalSelector;
