import React, { useState } from "react";
import DataTable from "../TableDynamic/DataTable";
import { Button } from "@mantine/core";

export interface ColumnDef {
  headerName: string;
  field: string;
}

export interface TableSelectorProps {
  // ستون‌ها و داده‌های جدول
  columnDefs: ColumnDef[];
  rowData: any[];

  // رخداد دابل کلیک روی ردیف
  onRowDoubleClick: (data: any) => void;

  // کلیک عادی روی ردیف (اختیاری)
  onRowClick?: (data: any) => void;

  // هنگام کلیک روی دکمه Select
  onSelectButtonClick?: (data: any) => void;

  // تعیین فعال/غیرفعال بودن دکمه Select
  isSelectDisabled?: boolean;
}

const TableSelector: React.FC<TableSelectorProps> = ({
  columnDefs,
  rowData,
  onRowDoubleClick,
  onRowClick,
  onSelectButtonClick,
  isSelectDisabled = false,
}) => {
  const [localSelectedRow, setLocalSelectedRow] = useState<any>(null);

  // کلیک روی ردیف
  const handleRowClick = (data: any) => {
    setLocalSelectedRow(data);
    if (onRowClick) {
      onRowClick(data);
    }
  };

  // دابل کلیک روی ردیف
  const handleRowDoubleClickInternal = (data: any) => {
    onRowDoubleClick(data);
  };

  // کلیک روی دکمه‌ی Select
  const handleSelectClick = () => {
    if (localSelectedRow && onSelectButtonClick) {
      onSelectButtonClick(localSelectedRow);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col" style={{ height: "600px" }}>
      {/* بخش جدول با DataTable */}
      <div className="flex-grow overflow-y-auto mb-4" style={{ height: "100%" }}>
        <DataTable
          columnDefs={columnDefs}
          rowData={rowData}
          onRowDoubleClick={handleRowDoubleClickInternal}
          // این پروپ در DataTable به نام onRowClick یا setSelectedRowData استفاده می‌شود.
          onRowClick={handleRowClick}
          showSearch
          // سایر پروپ‌های دلخواه به DataTable اضافه کنید...
        />
      </div>

      {/* دکمه‌ی Select */}
      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleSelectClick}
          disabled={isSelectDisabled || !localSelectedRow}
          style={{ width: "12rem" }}
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default TableSelector;
