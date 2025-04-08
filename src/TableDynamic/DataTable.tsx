// DataTable.tsx

import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  IconCirclePlusFilled,
  IconTrashFilled,
  IconEdit,
  IconCopy,
  IconEyeFilled,
  IconSearch,
  IconLoader,
} from '@tabler/icons-react';
import "./DataTable.css"

// تعریف پراپ‌های DataTable
export interface DataTableProps {
  columnDefs: any[];
  rowData: any[];
  onRowDoubleClick: (data: any) => void;
  onRowClick?: (data: any) => void;
  setSelectedRowData?: (data: any) => void;
  showDuplicateIcon?: boolean;
  showEditIcon?: boolean;
  showAddIcon?: boolean;
  showDeleteIcon?: boolean;
  showViewIcon?: boolean;
  onView?: () => void;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onCellValueChanged?: (event: any) => void;
  domLayout?: 'autoHeight' | 'normal';
  showSearch?: boolean;
  showAddNew?: boolean;
  isLoading?: boolean;
  containerHeight?: string;

  // اگر می‌خواهید کاربر چند ردیف را با هم انتخاب کند، multiple را بگذارید.
  rowSelectionType?: 'single' | 'multiple';

  // ردیف‌هایی که باید از ابتدا انتخاب شوند (و در این مثال قابل برداشتن نباشند).
  preSelectedIds?: (string | number)[];

  // وقتی انتخاب در جدول تغییر کند
  onSelectionChanged?: (selectedRows: any[]) => void;
}

/**
 * یک DataTable ساده مبتنی بر ag-Grid React
 * با امکان پیش‌انتخاب و غیرقابل تغییر بودن آن ردیف‌ها.
 */
const DataTable: React.FC<DataTableProps> = ({
  columnDefs,
  rowData,
  onRowDoubleClick,
  onRowClick,
  setSelectedRowData,
  showDuplicateIcon = false,
  showEditIcon = true,
  showAddIcon = true,
  showDeleteIcon = true,
  showViewIcon = false,
  onView = () => {},
  onAdd = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onDuplicate = () => {},
  onCellValueChanged,
  domLayout = 'normal',
  showSearch = true,
  showAddNew = false,
  isLoading = false,
  containerHeight = '400px',
  rowSelectionType = 'single',
  preSelectedIds = [],
  onSelectionChanged,
}) => {
  const gridApiRef = useRef<any>(null);

  const [searchText, setSearchText] = useState('');
  const [originalRowData, setOriginalRowData] = useState<any[]>([]);
  const [filteredRowData, setFilteredRowData] = useState<any[]>([]);
  // برای کنترل دکمه‌هایی مثل Edit یا Delete که بستگی به انتخاب دارد
  const [isRowSelected, setIsRowSelected] = useState(false);

  // هنگام mount یا تغییر rowData
  useEffect(() => {
    const mapped = rowData.map((item, idx) => ({
      ...item,
      // این فیلد فقط برای sort پیش‌فرض
      clientOrder: item.clientOrder ?? idx,
    }));
    setOriginalRowData(mapped);
    setFilteredRowData(mapped);
  }, [rowData]);

  // سرچ ساده روی تمام فیلدها
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);

    if (!val.trim()) {
      setFilteredRowData(originalRowData);
      return;
    }
    const lowerVal = val.toLowerCase();
    const newData = originalRowData.filter((item) => {
      return Object.values(item).some((v) => {
        if (v == null) return false;
        const str = typeof v === 'object' ? JSON.stringify(v) : String(v);
        return str.toLowerCase().includes(lowerVal);
      });
    });
    setFilteredRowData(newData);
  };

  // هنگامی که گرید آماده شد
  const onGridReady = (params: any) => {
    gridApiRef.current = params.api;

    // اگر خواستید ستون بر اساس clientOrder سورت شود
    params.api.setSortModel([{ colId: 'clientOrder', sort: 'asc' }]);
    params.api.sizeColumnsToFit();

    if (isLoading) {
      params.api.showLoadingOverlay();
    }

    // مرحله‌ی "انتخاب ردیف‌های اولیه" (Preselect)
    if (preSelectedIds.length > 0) {
      params.api.forEachNode((node: any) => {
        // مثلاً فیلد کلید = node.data.ID
        // دقت کنید اگر در سلکت شما "2" است و اینجا ID=2 (عدد)، باید یا
        // از String(node.data.ID) استفاده کنید یا مطمئن باشید تایپ‌ها یکسانند.
        if (preSelectedIds.includes(String(node.data.ID))) {
          // انتخاب برنامه‌نویسی این ردیف
          // پارامتر دوم = false تا اگر چند تایی است، انتخاب‌های قبلی پاک نشود
          node.setSelected(true, false);
        }
      });
    }
  };

  // سایز شدن پویا
  const onGridSizeChanged = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  // اگر ستون یا داده فیلترشده عوض شد، دوباره اندازه را تنظیم کنیم
  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.sizeColumnsToFit();
    }
  }, [columnDefs, filteredRowData]);

  // هر بار که isLoading تغییر کند، overlay تغییر کند
  useEffect(() => {
    if (gridApiRef.current) {
      if (isLoading) gridApiRef.current.showLoadingOverlay();
      else gridApiRef.current.hideOverlay();
    }
  }, [isLoading]);

  // کلیک روی ردیف
  const handleRowClick = (event: any) => {
    if (rowSelectionType === 'single') {
      // اگر تک‌انتخابی است
      setSelectedRowData?.(event.data);
      setIsRowSelected(true);
    }
    onRowClick?.(event.data);
  };

  // دابل کلیک روی ردیف
  const handleRowDoubleClickInternal = (event: any) => {
    onRowDoubleClick(event.data);
  };

  /**
   * اگر کاربر انتخاب را تغییر داد، (برای ردیف‌هایی که جزو preSelectedIds هستند)
   * اگر کاربر سعی کند تیکشان را بردارد، دوباره ست می‌کنیم که همچنان انتخاب بمانند.
   */
  const handleRowSelected = (event: any) => {
    // event.node => گره ردیفی که اکنون انتخاب/عدم‌انتخاب شده
    const row = event.node.data;
    const rowId = String(row.ID);

    // اگر کاربر ردیف preSelected را Unselect کرده
    if (!event.node.isSelected()) {
      if (preSelectedIds.includes(rowId)) {
        // سریعاً دوباره انتخابش می‌کنیم تا کاربر نتواند آن را تغییر دهد
        event.node.setSelected(true, false);
      }
    }
  };

  // وقتی کل انتخاب عوض شود
  const handleSelectionChanged = (event: any) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((n: any) => n.data);

    // اطلاع به بیرون
    onSelectionChanged?.(selectedData);

    // برای دکمه‌های Duplicate و ... حداقل یک ردیف انتخاب باشد
    setIsRowSelected(selectedData.length > 0);

    // اگر single و می‌خواهید رکورد انتخابی را در جایی ذخیره کنید
    if (rowSelectionType === 'single' && setSelectedRowData) {
      setSelectedRowData(selectedData[0] || null);
    }
  };

  /**
   * اگر بخواهیم ردیف‌های preSelected یک کلاس جداگانه بخورند تا رنگشان متفاوت باشد،
   * می‌توانیم از getRowClass استفاده کنیم:
   */
  const getRowClass = (params: any) => {
    const rowId = String(params.data.ID);
    // اگر جزو preSelectedIds بود، پس یک کلاس ویژه مثلاً "preselected-row"
    // را برگردانید. این کلاس را در CSS به رنگ آبی کم‌رنگ تنظیم کنید.
    if (preSelectedIds.includes(rowId)) {
      return 'preselected-row';
    }
    return '';
  };

  // تعریف شیء gridOptions
  const gridOptions = {
    defaultColDef: { sortable: true },
    rowSelection: rowSelectionType,   // single یا multiple
    suppressRowClickSelection: false, // اگر false باشد، کلیک روی ردیف هم باعث انتخاب می‌شود
    animateRows: true,
    onSelectionChanged: handleSelectionChanged,
    onRowSelected: handleRowSelected, // رویداد تک‌تک تغییرات انتخاب/عدم‌انتخاب
    getRowClass: getRowClass,        // برای رنگ متفاوت ردیف‌های preSelected
  };

  // سورت بر اساس clientOrder
  const sortedFilteredRowData = [...filteredRowData].sort(
    (a, b) => (a.clientOrder || 0) - (b.clientOrder || 0)
  );

  return (
    <div className="flex flex-col relative p-2" style={{ height: containerHeight }}>
      {/* باکس بالایی که سرچ و دکمه‌ها را نشان می‌دهد */}
      {(showSearch ||
        showAddIcon ||
        showEditIcon ||
        showDeleteIcon ||
        showDuplicateIcon ||
        showViewIcon) && (
        <div className="flex items-center justify-between mb-3 p-2 bg-gray-200 rounded-md">
          {showSearch && (
            <div className="relative max-w-sm">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            {showDuplicateIcon && (
              <button
                className={`rounded-full p-2 bg-yellow-100 text-yellow-600 hover:bg-yellow-200 ${
                  !isRowSelected ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!isRowSelected}
                onClick={onDuplicate}
                title="Duplicate"
              >
                <IconCopy size={20} />
              </button>
            )}
            {showEditIcon && (
              <button
                className={`rounded-full p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 ${
                  !isRowSelected ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!isRowSelected}
                onClick={onEdit}
                title="Edit"
              >
                <IconEdit size={20} />
              </button>
            )}
            {showDeleteIcon && (
              <button
                className={`rounded-full p-2 bg-red-100 text-red-600 hover:bg-red-200 ${
                  !isRowSelected ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!isRowSelected}
                onClick={onDelete}
                title="Delete"
              >
                <IconTrashFilled size={20} />
              </button>
            )}
            {showAddIcon && (
              <button
                type="button"
                className="rounded-full p-2 bg-green-100 text-green-600 hover:bg-green-200"
                onClick={onAdd}
                title="Add"
              >
                <IconCirclePlusFilled size={20} />
              </button>
            )}
            {showViewIcon && (
              <button
                className="rounded-full p-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                onClick={onView}
                title="View"
              >
                <IconEyeFilled size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* گرید */}
      <div className="flex-grow" style={{ minHeight: 0 }}>
        {/* تم ag-Grid را طبق سلیقه انتخاب کنید (alpine, balham, ...).
            همچنین باید در جایی از پروژه: 
               import 'ag-grid-community/styles/ag-grid.css';
               import 'ag-grid-community/styles/ag-theme-alpine.css';
            انجام شده باشد. */}
        <div className="ag-theme-alpine w-full h-full">
          <AgGridReact
            onGridReady={onGridReady}
            onGridSizeChanged={onGridSizeChanged}
            columnDefs={columnDefs}
            rowData={sortedFilteredRowData}
            domLayout={domLayout}
            gridOptions={gridOptions}
            singleClickEdit={false}
            stopEditingWhenCellsLoseFocus
            pagination={false}
            onRowClicked={handleRowClick}
            onRowDoubleClicked={handleRowDoubleClickInternal}
            overlayLoadingTemplate={`
              <span class="ag-overlay-loading-center">
                <IconLoader color="#7e3af2" height="50" width="50"/>
              </span>`}
          />
        </div>
      </div>

      {/* اگر showAddNew=true باشد */}
      {showAddNew && (
        <button
          type="button"
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={onAdd}
        >
          Add New
        </button>
      )}

      {/* اگر isLoading=true باشد، یک لایه شفافی روی گرید می‌اندازیم */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
          <IconLoader color="#7e3af2" height={80} width={80} />
        </div>
      )}
    </div>
  );
};

export default DataTable;
