import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { IconCirclePlusFilled, IconTrashFilled, IconEdit, IconCopy, IconEyeFilled, IconSearch, IconLoader } from '@tabler/icons-react';

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
}

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
  containerHeight = "400px"
}) => {
  const [searchText, setSearchText] = useState('');
  const gridApiRef = useRef<any>(null);
  const [originalRowData, setOriginalRowData] = useState<any[]>([]);
  const [filteredRowData, setFilteredRowData] = useState<any[]>([]);
  const [isRowSelected, setIsRowSelected] = useState<boolean>(false);

  useEffect(() => {
    const mappedData = rowData.map((item, index) => ({
      ...item,
      clientOrder: item.clientOrder !== undefined ? item.clientOrder : index
    }));
    setOriginalRowData(mappedData);
    setFilteredRowData(mappedData);
  }, [rowData]);

  useEffect(() => {
    if (gridApiRef.current && filteredRowData && filteredRowData.length > 0) {
      gridApiRef.current.ensureIndexVisible(filteredRowData.length - 1, 'bottom');
    }
  }, [filteredRowData]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (value.trim() === '') {
      setFilteredRowData(originalRowData);
    } else {
      const lowerValue = value.toLowerCase();
      const filtered = originalRowData.filter(item => {
        return Object.values(item).some(val => {
          if (val === null || val === undefined) return false;
          let strVal = '';
          if (typeof val === 'object') {
            strVal = JSON.stringify(val);
          } else {
            strVal = val.toString();
          }
          return strVal.toLowerCase().includes(lowerValue);
        });
      });
      setFilteredRowData(filtered);
    }
  };

  const onGridReady = (params: any) => {
    gridApiRef.current = params.api;
    if (params.api && typeof params.api.setSortModel === 'function') {
      params.api.setSortModel([{ colId: 'clientOrder', sort: 'asc' }]);
    }
    params.api.sizeColumnsToFit();
    if (isLoading) {
      params.api.showLoadingOverlay();
    }
  };

  const onGridSizeChanged = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.sizeColumnsToFit();
    }
  }, [columnDefs, filteredRowData]);

  useEffect(() => {
    if (gridApiRef.current) {
      if (isLoading) {
        gridApiRef.current.showLoadingOverlay();
      } else {
        gridApiRef.current.hideOverlay();
      }
    }
  }, [isLoading]);

  const handleRowClick = (event: any) => {
    if (setSelectedRowData) {
      setSelectedRowData(event.data);
    }
    setIsRowSelected(true);
    if (onRowClick) {
      onRowClick(event.data);
    }
  };

  const handleRowDoubleClickInternal = (event: any) => {
    onRowDoubleClick(event.data);
  };

  const gridClasses = 'ag-theme-quartz w-full h-full overflow-y-auto';

  const getRowClass = (params: any) => {
    return params.node.selected ? 'ag-row-selected' : '';
  };

  const gridOptions = {
    getRowClass: getRowClass,
    defaultColDef: {
      sortable: true
    }
  };

  const sortedFilteredRowData = useMemo(() => {
    return [...filteredRowData].sort((a, b) => a.clientOrder - b.clientOrder);
  }, [filteredRowData]);

  return (
    <div className='data-table-container w-full flex flex-col relative rounded-md shadow-md p-2' style={{ height: containerHeight }}>
      {(showSearch || showAddIcon || showEditIcon || showDeleteIcon || showDuplicateIcon || showViewIcon) && (
        <div className='flex items-center justify-between mb-4 bg-gray-300 p-2 rounded-md shadow-sm'>
          {showSearch && (
            <div className="relative max-w-sm">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={onSearchChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                style={{ fontFamily: 'inherit' }}
              />
            </div>
          )}

          <div className='flex items-center space-x-4'>
            {showDuplicateIcon && (
              <button
                className={`${"rounded-full p-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none"} bg-yellow-50 hover:bg-yellow-100 text-yellow-600 ${!isRowSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                title='Duplicate'
                onClick={onDuplicate}
                disabled={!isRowSelected}
              >
                <IconCopy size={20} />
              </button>
            )}

            {showEditIcon && (
              <button
                className={`${"rounded-full p-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none"} bg-blue-50 hover:bg-blue-100 text-blue-600 ${!isRowSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                title='Edit'
                onClick={onEdit}
                disabled={!isRowSelected}
              >
                <IconEdit size={20} />
              </button>
            )}

            {showDeleteIcon && (
              <button
                className={`${"rounded-full p-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none"} bg-red-50 hover:bg-red-100 text-red-600 ${!isRowSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                title='Delete'
                onClick={onDelete}
                disabled={!isRowSelected}
              >
                <IconTrashFilled size={20} />
              </button>
            )}

            {showAddIcon && (
              <button
                type='button'
                className={`${"rounded-full p-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none"} bg-green-50 hover:bg-green-100 text-green-600`}
                title='Add'
                onClick={onAdd}
              >
                <IconCirclePlusFilled size={20} />
              </button>
            )}

            {showViewIcon && (
              <button
                className={`${"rounded-full p-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none"} bg-gray-50 hover:bg-gray-100 text-gray-600`}
                title='View'
                onClick={onView}
              >
                <IconEyeFilled size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      <div className='flex-grow' style={{ minHeight: 0 }}>
        <div className={gridClasses}>
          <AgGridReact
            onGridReady={onGridReady}
            onGridSizeChanged={onGridSizeChanged}
            columnDefs={columnDefs}
            rowData={sortedFilteredRowData}
            pagination={false}
            paginationPageSize={10}
            animateRows={true}
            onRowClicked={handleRowClick}
            onRowDoubleClicked={handleRowDoubleClickInternal}
            domLayout={domLayout}
            suppressHorizontalScroll={false}
            rowSelection='single'
            gridOptions={gridOptions}
            singleClickEdit={true}
            stopEditingWhenCellsLoseFocus={true}
            onCellValueChanged={onCellValueChanged}
            overlayLoadingTemplate={
              '<div class="custom-loading-overlay"><TailSpin color="#7e3af2" height="80" width="80" /></div>'
            }
          />
        </div>
      </div>

      {showAddNew && (
        <button
          type='button'
          className='mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition'
          onClick={onAdd}
        >
          Add New
        </button>
      )}

      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10'>
          <IconLoader color='#7e3af2' height={80} width={80} />
        </div>
      )}
    </div>
  );
};

export default DataTable;
