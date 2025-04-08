// RoleGroupPostPicker.tsx
import React, { useState } from "react";
import DataTable from "../../TableDynamic/DataTable"; // مسیر DataTable را تنظیم کنید
import { Button, Loader } from "@mantine/core";
import { SelectedItem } from "./MembersTable";

interface RoleGroupPostPickerProps {
  onSelect: (selected: SelectedItem[]) => void;
  onClose: () => void;
}

interface PostCat {
  ID: string;
  Name: string;
  Description: string;
  PostsStr?: string;
}

const fakeRoleGroups: PostCat[] = [
  { ID: "1", Name: "Group A", Description: "Description A", PostsStr: "1|2" },
  { ID: "2", Name: "Group B", Description: "Description B", PostsStr: "2|3" },
];

const fakeAllRoles = [
  { ID: 1, Name: "Role A" },
  { ID: 2, Name: "Role B" },
  { ID: 3, Name: "Role C" },
];

const RoleGroupPostPicker: React.FC<RoleGroupPostPickerProps> = ({ onSelect, onClose }) => {
  const [selectedRow, setSelectedRow] = useState<PostCat | null>(null);
  const [loading, setLoading] = useState(false);

  const columnDefs = [
    { headerName: "Name", field: "Name" },
    { headerName: "Description", field: "Description" },
  ];

  const parseIds = (idsStr?: string): string[] => {
    if (!idsStr) return [];
    return idsStr.split("|").filter(Boolean);
  };

  const handleRowClick = (data: any) => {
    setSelectedRow(data);
  };

  const handleRowDoubleClick = (data: any) => {
    if (data && data.PostsStr) {
      const ids = parseIds(data.PostsStr);
      const selectedItems: SelectedItem[] = fakeAllRoles
        .filter((role) => ids.includes(String(role.ID)))
        .map((role) => ({ id: String(role.ID), name: role.Name }));
      onSelect(selectedItems);
      onClose();
    }
  };

  const handleSelectClick = () => {
    if (selectedRow && selectedRow.PostsStr) {
      const ids = parseIds(selectedRow.PostsStr);
      const selectedItems: SelectedItem[] = fakeAllRoles
        .filter((role) => ids.includes(String(role.ID)))
        .map((role) => ({ id: String(role.ID), name: role.Name }));
      onSelect(selectedItems);
      onClose();
    }
  };

  return (
    <div style={{ padding: 16 }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div style={{ minHeight: "400px" }}>
            <DataTable
              containerHeight="400px"
              columnDefs={columnDefs}
              rowData={fakeRoleGroups}
              onRowDoubleClick={handleRowDoubleClick}
              onRowClick={handleRowClick}
              showSearch
            />
          </div>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Button onClick={handleSelectClick} disabled={!selectedRow}>
              Select
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoleGroupPostPicker;
