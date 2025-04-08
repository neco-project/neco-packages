// DynamicModal.tsx
import React from "react";
import { Modal } from "@mantine/core";

export interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title={title} centered>
      {children}
    </Modal>
  );
};

export default DynamicModal;
