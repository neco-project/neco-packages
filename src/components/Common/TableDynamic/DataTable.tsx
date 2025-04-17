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
import { Button } from '@mantine/core';
import './DataTable.css';

export interface DataTableProps {
  columnDefs: any[];
  rowData: any[];
  onRowDoubleClick: (data: any) => void;

  onRowClick?: (data: any) => void;
  setSelectedRowData?: (data: any) => void;
  onSelectionChanged?: (rows: any[]) => void;

  /* آیکن‌ها و اکشن‌ها */
  showAddIcon?: boolean;
  showEditIcon?: boolean;
  showDeleteIcon?: boolean;
  showDuplicateIcon?: boolean;
  showViewIcon?: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onView?: () => void;

  /* ظاهر */
  domLayout?: 'autoHeight' | 'normal';
  showSearch?: boolean;
  showAddNew?: boolean;
  isLoading?: boolean;
  containerHeight?: string;

  /* انتخاب */
  rowSelectionType?: 'single' | 'multiple';
  preSelectedIds?: (string | number)[];

  /* حالت Table‑Selector */
  tableSelect?: boolean;
  onSelectButtonClick?: (data: any | any[]) => void;
  onDeleteButtonClick?: (data: any) => void;
  isSelectDisabled?: boolean;
  isDeleteDisabled?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  columnDefs,
  rowData,

  onRowDoubleClick,
  onRowClick,
  setSelectedRowData,
  onSelectionChanged,

  showAddIcon = true,
  showEditIcon = true,
  showDeleteIcon = true,
  showDuplicateIcon = false,
  showViewIcon = false,
  onAdd = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onDuplicate = () => {},
  onView = () => {},

  domLayout = 'normal',
  showSearch = true,
  showAddNew = false,
  isLoading = false,
  containerHeight = '400px',

  rowSelectionType = 'single',
  preSelectedIds = [],

  tableSelect = false,
  onSelectButtonClick,
  onDeleteButtonClick,
  isSelectDisabled = false,
  isDeleteDisabled = false,
}) => {
  const gridApiRef = useRef<any>(null);

  const [searchText, setSearchText]     = useState('');
  const [rows, setRows]                 = useState<any[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const mapped = rowData.map((r, i) => ({ ...r, clientOrder: r.clientOrder ?? i }));
    setRows(mapped);
    setFilteredRows(mapped);
  }, [rowData]);

  const doSearch = (q: string) => {
    if (!q.trim()) {
      setFilteredRows(rows);
      return;
    }
    const lq = q.toLowerCase();
    setFilteredRows(
      rows.filter(r =>
        Object.values(r).some(v => {
          if (v == null) return false;
          const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
          return s.toLowerCase().includes(lq);
        })
      )
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    doSearch(e.target.value);
  };

  const onGridReady = (params: any) => {
    gridApiRef.current = params.api;
    params.api.setSortModel([{ colId: 'clientOrder', sort: 'asc' }]);
    params.api.sizeColumnsToFit();
    if (isLoading) params.api.showLoadingOverlay();

    if (preSelectedIds.length) {
      params.api.forEachNode((node: any) => {
        if (preSelectedIds.includes(String(node.data.ID))) {
          node.setSelected(true, false);
        }
      });
    }
  };

  const onSelectionChangedInternal = (e: any) => {
    const selRows = e.api.getSelectedRows();
    setSelectedCount(selRows.length);
    onSelectionChanged?.(selRows);

    if (rowSelectionType === 'single' && setSelectedRowData) {
      setSelectedRowData(selRows[0] || null);
    }
  };

  const handleRowClicked    = (e: any) => onRowClick?.(e.data);
  const handleRowDoubleClick= (e: any) => onRowDoubleClick(e.data);

  // Keep preselected rows always selected
  const keepFixed = (e: any) => {
    const id = String(e.node.data.ID);
    if (!e.node.isSelected() && preSelectedIds.includes(id)) {
      e.node.setSelected(true, false);
    }
  };

  const clickDelete = () => {
    if (!gridApiRef.current || !onDeleteButtonClick) return;
    const sel = gridApiRef.current.getSelectedRows();
    if (sel.length) onDeleteButtonClick(sel[0]);
  };

  const clickSelect = () => {
    if (!gridApiRef.current || !onSelectButtonClick) return;
    const sel = gridApiRef.current.getSelectedRows();
    if (sel.length) {
      onSelectButtonClick(rowSelectionType === 'single' ? sel[0] : sel);
    }
  };

  return (
    <div className="flex flex-col relative p-2" style={{ height: containerHeight }}>
      {/* Top toolbar */}
      {(showSearch ||
        showAddIcon ||
        showEditIcon ||
        showDeleteIcon ||
        showDuplicateIcon ||
        showViewIcon) && (
        <div className="flex items-center justify-between mb-3 p-2 bg-gray-200 rounded-md">
          {showSearch && (
            <div className="relative max-w-sm">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={searchText}
                onChange={handleSearch}
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            {showDuplicateIcon && (
              <button
                disabled={!selectedCount}
                onClick={onDuplicate}
                className={`rounded-full p-2 bg-yellow-100 text-yellow-600 hover:bg-yellow-200 ${
                  !selectedCount ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <IconCopy size={20} />
              </button>
            )}
            {showEditIcon && (
              <button
                disabled={!selectedCount}
                onClick={onEdit}
                className={`rounded-full p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 ${
                  !selectedCount ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <IconEdit size={20} />
              </button>
            )}
            {showDeleteIcon && (
              <button
                disabled={!selectedCount}
                onClick={onDelete}
                className={`rounded-full p-2 bg-red-100 text-red-600 hover:bg-red-200 ${
                  !selectedCount ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <IconTrashFilled size={20} />
              </button>
            )}
            {showAddIcon && (
              <button
                onClick={onAdd}
                className="rounded-full p-2 bg-green-100 text-green-600 hover:bg-green-200"
              >
                <IconCirclePlusFilled size={20} />
              </button>
            )}
            {showViewIcon && (
              <button
                onClick={onView}
                className="rounded-full p-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <IconEyeFilled size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* The grid itself */}
      <div className="flex-grow min-h-0">
        <div className="ag-theme-alpine w-full h-full">
          <AgGridReact
            columnDefs={columnDefs}
            rowData={filteredRows.sort(
              (a, b) => (a.clientOrder || 0) - (b.clientOrder || 0)
            )}
            rowSelection={rowSelectionType}
            rowMultiSelectWithClick={rowSelectionType === 'multiple'}
            suppressRowClickSelection={false}
            onSelectionChanged={onSelectionChangedInternal}
            onRowSelected={keepFixed}
            onGridReady={onGridReady}
            onGridSizeChanged={p => p.api.sizeColumnsToFit()}
            onRowClicked={handleRowClicked}
            onRowDoubleClicked={handleRowDoubleClick}
            domLayout={domLayout}
            getRowClass={p =>
              preSelectedIds.includes(String(p.data.ID)) ? 'preselected-row' : ''
            }
            animateRows
            pagination={false}
            overlayLoadingTemplate={`
              <span class="ag-overlay-loading-center">
                <IconLoader color="#7e3af2" height="55" width="55"/>
              </span>`}
          />
        </div>
      </div>

      {/* Always‑visible Delete button */}
      {onDeleteButtonClick && (
        <div className="flex justify-end mt-2">
          <Button
            size="sm"
            onClick={clickDelete}
            disabled={isDeleteDisabled || selectedCount === 0}
            style={{ width: '8rem' }}
            color="red"
          >
            Delete
          </Button>
        </div>
      )}

      {/* Optional “Select” button when in tableSelect mode */}
      {tableSelect && onSelectButtonClick && (
        <div className="flex justify-center mt-4">
          <Button
            size="sm"
            onClick={clickSelect}
            disabled={isSelectDisabled || selectedCount === 0}
            style={{ width: '8rem' }}
          >
            Select
          </Button>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
          <IconLoader color="#7e3af2" height={80} width={80} />
        </div>
      )}
    </div>
  );
};

export default DataTable;
