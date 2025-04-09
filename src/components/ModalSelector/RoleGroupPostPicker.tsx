// RoleGroupPostPicker.tsx
import React, { useState } from "react";
import DataTable from "../../TableDynamic/DataTable";
import { Button, Loader } from "@mantine/core";
import { SelectedItem } from "./MembersTable"; // یا تعریف مجدد

interface RoleGroupPostPickerProps {
  onSelect: (selected: SelectedItem[]) => void;
  onClose: () => void;
  preSelectedIds?: string[];
}

/** مدل داده‌های گروه */
interface PostCat {
  ID: string;
  Name: string;
  Description: string;
  PostsStr?: string;
}

const fakeRoleGroups: PostCat[] = [
  { ID: "100", Name: "Group A", Description: "Description A", PostsStr: "1|2" },
  { ID: "200", Name: "Group B", Description: "Description B", PostsStr: "2|3" },
];

const RoleGroupPostPicker: React.FC<RoleGroupPostPickerProps> = ({
  onSelect,
  onClose,
  preSelectedIds = [],
}) => {
  const [selectedRows, setSelectedRows] = useState<SelectedItem[]>([]);
  const [loading, setLoading] = useState(false);

  // ستون‌های جدول گروه
  const columnDefs = [
    { headerName: "Name", field: "Name" },
    { headerName: "Description", field: "Description" },
  ];

  // وقتی کاربر دوبل کلیک کند
  const handleRowDoubleClick = (data: any) => {
    if (data?.ID && data?.Name) {
      // فقط یک ردیف می‌خواهیم بسازیم
      onSelect([{ id: String(data.ID), name: data.Name }]);
      onClose();
    }
  };

  const handleSelectionChanged = (rows: any[]) => {
    const mapped = rows.map((r) => ({
      id: String(r.ID),
      name: r.Name,
    }));
    setSelectedRows(mapped);
  };

  // کلیک روی دکمۀ Select
  const handleSelectClick = () => {
    onSelect(selectedRows);
    onClose();
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
              // اگر بخواهید چند تایی باشد:
              rowSelectionType="multiple"
              preSelectedIds={preSelectedIds}
              onSelectionChanged={handleSelectionChanged}
              showSearch
            />
          </div>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Button onClick={handleSelectClick} disabled={selectedRows.length === 0}>
              Select
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoleGroupPostPicker;
