// RolesGroups/RolePickerTabs.tsx
import React, { useState } from 'react';
import { Tabs } from '@mantine/core';
import MembersTable, { SelectedItem } from './MembersTable';
import RoleGroupPostPicker from './RoleGroupPostPicker';

interface RolePickerTabsProps {
  onSelect: (selected: SelectedItem[]) => void;
  onClose: () => void;
  preSelectedIds?: string[];
}

const RolePickerTabs: React.FC<RolePickerTabsProps> = ({
  onSelect,
  onClose,
  preSelectedIds = [],
}) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'roleGroups'>('roles');

  return (
    <Tabs value={activeTab} onChange={val => setActiveTab(val as any)}>
      <Tabs.List>
        <Tabs.Tab value="roles">Roles</Tabs.Tab>
        <Tabs.Tab value="roleGroups">Role Groups</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="roles" pt="xs">
        <MembersTable
          onSelect={onSelect}
          onClose={onClose}
          preSelectedIds={preSelectedIds}
        />
      </Tabs.Panel>

      <Tabs.Panel value="roleGroups" pt="xs">
        <RoleGroupPostPicker
          onSelect={onSelect}
          onClose={onClose}
          preSelectedIds={preSelectedIds}
        />
      </Tabs.Panel>
    </Tabs>
  );
};

export default RolePickerTabs;
