// MembersTable.tsx
import React, { useState } from "react";
import DataTable from "../TableDynamic/DataTable";
import { Button, Loader } from "@mantine/core";

/** نوع داده منتخب */
export interface SelectedItem {
  id: string;
  name: string;
}

/** پراپ‌های کامپوننت */
interface MembersTableProps {
  onSelect: (selected: SelectedItem[]) => void;
  onClose: () => void;
  preSelectedIds?: string[];
}

const MembersTable: React.FC<MembersTableProps> = ({
  onSelect,
  onClose,
  preSelectedIds = [],
}) => {
  const [selectedRows, setSelectedRows] = useState<SelectedItem[]>([]);
  const [loading, setLoading] = useState(false);

  // دادهٔ لوکال برای Roles
  const fakeMembers = [
    {
      ID: 1,
      Name: "Role A",
      UserName: "Alice",
      Family: "Smith",
      Enterprise: "Company A",
      SuperIndent: "None",
    },
    {
      ID: 2,
      Name: "Role B",
      UserName: "Bob",
      Family: "Johnson",
      Enterprise: "Company B",
      SuperIndent: "Role A",
    },
    {
      ID: 3,
      Name: "Role C",
      UserName: "Charlie",
      Family: "Brown",
      Enterprise: "Company C",
      SuperIndent: "Role B",
    },
  ];

  // ستون‌های جدول
  const columnDefs = [
    { headerName: "Role", field: "Name" },
    { headerName: "Name", field: "UserName" },
    { headerName: "Family", field: "Family" },
    { headerName: "Enterprise", field: "Enterprise" },
    { headerName: "SuperIndent", field: "SuperIndent" },
  ];

  // وقتی کاربر روی یک ردیف دوبل کلیک کند
  const handleRowDoubleClick = (data: any) => {
    if (data?.ID && data?.Name) {
      onSelect([{ id: String(data.ID), name: data.Name }]);
      onClose();
    }
  };

  // وقتی انتخاب در DataTable عوض شود
  const handleSelectionChanged = (rows: any[]) => {
    const mapped = rows.map((r) => ({
      id: String(r.ID),
      name: r.Name,
    }));
    setSelectedRows(mapped);
  };

  // کلیک دکمۀ Select
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
              rowData={fakeMembers}
              onRowDoubleClick={handleRowDoubleClick}
              rowSelectionType="multiple" // چندانتخابی
              preSelectedIds={preSelectedIds}
              onSelectionChanged={handleSelectionChanged}
              showSearch
            />
          </div>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Button
              onClick={handleSelectClick}
              disabled={selectedRows.length === 0}
            >
              Select
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MembersTable;
