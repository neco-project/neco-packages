// MembersTable.tsx
import React, { useState } from "react";
import DataTable from "../../TableDynamic/DataTable"; // مسیر مربوط به DataTable را تنظیم کنید
import { Button, Loader } from "@mantine/core";

export interface SelectedItem {
  id: string;
  name: string;
}

interface MembersTableProps {
  onSelect: (selected: SelectedItem[]) => void;
  onClose: () => void;
}

const MembersTable: React.FC<MembersTableProps> = ({ onSelect, onClose }) => {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // داده‌های فیک نقش‌ها
  const fakeMembers = [
    { ID: 1, Name: "Role A", UserName: "Alice", Family: "Smith", Enterprise: "Company A", SuperIndent: "None" },
    { ID: 2, Name: "Role B", UserName: "Bob", Family: "Johnson", Enterprise: "Company B", SuperIndent: "Role A" },
    { ID: 3, Name: "Role C", UserName: "Charlie", Family: "Brown", Enterprise: "Company C", SuperIndent: "Role B" },
  ];

  const columnDefs = [
    { headerName: "Role", field: "Name" },
    { headerName: "Name", field: "UserName" },
    { headerName: "Family", field: "Family" },
    { headerName: "Enterprise", field: "Enterprise" },
    { headerName: "SuperIndent", field: "SuperIndent" },
  ];

  const handleRowClick = (data: any) => {
    setSelectedRow(data);
  };

  const handleRowDoubleClick = (data: any) => {
    if (data && data.ID && data.Name) {
      onSelect([{ id: String(data.ID), name: data.Name }]);
      onClose();
    }
  };

  const handleSelectClick = () => {
    if (selectedRow && selectedRow.ID && selectedRow.Name) {
      onSelect([{ id: String(selectedRow.ID), name: selectedRow.Name }]);
      onClose();
    }
  };

  return (
    <div style={{ padding: 16 }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* ظرف حاوی جدول با ارتفاع مشخص */}
          <div style={{ minHeight: "400px" }}>
            <DataTable
              containerHeight="400px"
              columnDefs={columnDefs}
              rowData={fakeMembers}
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

export default MembersTable;
