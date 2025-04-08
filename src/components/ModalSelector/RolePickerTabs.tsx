// RolePickerTabs.tsx
import React, { useState } from "react";
import { Tabs } from "@mantine/core";
import MembersTable from "./MembersTable";
import RoleGroupPostPicker from "./RoleGroupPostPicker";
import { SelectedItem } from "./MembersTable";

interface RolePickerTabsProps {
  onSelect: (selected: SelectedItem[]) => void;
  onClose: () => void;
}

const RolePickerTabs: React.FC<RolePickerTabsProps> = ({ onSelect, onClose }) => {
  const [activeTab, setActiveTab] = useState<"roles" | "roleGroups">("roles");

  return (
    <div>
      <Tabs value={activeTab} onChange={(val) => setActiveTab(val as "roles" | "roleGroups")}>
        <Tabs.List>
          <Tabs.Tab value="roles">Roles</Tabs.Tab>
          <Tabs.Tab value="roleGroups">Role Groups</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="roles" pt="xs">
          <MembersTable onSelect={onSelect} onClose={onClose} />
        </Tabs.Panel>
        <Tabs.Panel value="roleGroups" pt="xs">
          <RoleGroupPostPicker onSelect={onSelect} onClose={onClose} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default RolePickerTabs;
