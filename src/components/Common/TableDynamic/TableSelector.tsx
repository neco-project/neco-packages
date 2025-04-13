import React, { useState } from "react";
import DataTable from "./DataTable";
import { Button } from "@mantine/core";

export interface ColumnDef {
  headerName: string;
  field: string;
}

export interface TableSelectorProps {
  height?: number;

  // ستون‌ها و داده‌های جدول
  columnDefs: ColumnDef[];
  rowData: any[];

  // رخداد دابل کلیک روی ردیف
  onRowDoubleClick: (data: any) => void;

  // کلیک عادی روی ردیف (اختیاری)
  onRowClick?: (data: any) => void;

  // هنگام کلیک روی دکمه Select
  onSelectButtonClick?: (data: any) => void;

  onDeleteButtonClick?: (data: any) => void;

  // تعیین فعال/غیرفعال بودن دکمه Select
  isSelectDisabled?: boolean;

  isDeleteDisabled?: boolean;
}

const TableSelector: React.FC<TableSelectorProps> = ({
  height = 600,
  columnDefs,
  rowData,
  onRowDoubleClick,
  onRowClick,
  onSelectButtonClick,
  onDeleteButtonClick,
  isSelectDisabled = false,
  isDeleteDisabled = false,
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

  const handleDeleteClick = () => {
    if (localSelectedRow && onDeleteButtonClick) {
      onDeleteButtonClick(localSelectedRow);
    }
  };

  return (
    <div
      className="bg-white rounded-lg p-4 flex flex-col"
      style={{ height: height }}
    >
      {/* بخش جدول با DataTable */}
      <div
        className="flex-grow overflow-y-auto mb-4"
        style={{ height: "100%" }}
      >
        <DataTable
          columnDefs={columnDefs}
          rowData={rowData}
          onRowDoubleClick={handleRowDoubleClickInternal}
          // این پروپ در DataTable به نام onRowClick یا setSelectedRowData استفاده می‌شود.
          onRowClick={handleRowClick}
          showSearch
          // سایر پروپ‌های دلخواه به DataTable اضافه کنید...
        />

        {onDeleteButtonClick && (
          <div className="flex justify-end">
            <Button
              onClick={handleDeleteClick}
              disabled={isSelectDisabled || !localSelectedRow}
              style={{ width: "12rem" }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* دکمه‌ی Select */}
      {onSelectButtonClick && (
        <div className="mt-4 flex justify-center">
          <Button
            onClick={handleSelectClick}
            disabled={isDeleteDisabled || !localSelectedRow}
            style={{ width: "12rem" }}
          >
            Select
          </Button>
        </div>
      )}
    </div>
  );
};

export default TableSelector;
