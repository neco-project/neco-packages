// DynamicModal.tsx
import React from "react";
import { Modal } from "@mantine/core";

export interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

/**
 * یک مودال عمومی که Mantine را رپ می‌کند
 */
const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title={title} centered size="lg">
      {children}
    </Modal>
  );
};

export default DynamicModal;
