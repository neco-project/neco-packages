// RolesGroups/RolesGroups.tsx
import React from 'react';
import { Modal } from '@mantine/core';
import RolePickerTabs from './RolePickerTabs';
import { SelectedItem } from './MembersTable';

interface RolesGroupsProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (data: SelectedItem[]) => void;
  preSelectedIds?: string[];
}

const RolesGroups: React.FC<RolesGroupsProps> = ({
  isOpen,
  onClose,
  onSelect,
  preSelectedIds = [],
}) => {
  return (
    <Modal opened={isOpen} onClose={onClose} withCloseButton={false}>
      <RolePickerTabs
        onSelect={onSelect}
        onClose={onClose}
        preSelectedIds={preSelectedIds}
      />
    </Modal>
  );
};

export default RolesGroups;
