import React from 'react';
import DataTable from '../TableDynamic/DataTable';
import { Loader } from '@mantine/core';

export interface SelectedItem {
  id: string;
  name: string;
}

interface MembersTableProps {
  onSelect: (items: SelectedItem[]) => void;
  onClose: () => void;
  preSelectedIds?: string[];
}

const MembersTable: React.FC<MembersTableProps> = ({
  onSelect,
  onClose,
  preSelectedIds = [],
}) => {
  const loading = false;

  const rows = [
    { ID: 1, Name: 'Role A', UserName: 'Alice',   Family: 'Smith',   Enterprise: 'Company A', SuperIndent: '—' },
    { ID: 2, Name: 'Role B', UserName: 'Bob',     Family: 'Johnson', Enterprise: 'Company B', SuperIndent: 'Role A' },
    { ID: 3, Name: 'Role C', UserName: 'Charlie', Family: 'Brown',   Enterprise: 'Company C', SuperIndent: 'Role B' },
  ];

  const cols = [
    { headerName: 'Role',        field: 'Name'       },
    { headerName: 'User Name',   field: 'UserName'   },
    { headerName: 'Family',      field: 'Family'     },
    { headerName: 'Enterprise',  field: 'Enterprise' },
    { headerName: 'Super‑indent',field: 'SuperIndent'},
  ];

  /** دابل کلیک = انتخاب فوری یک ردیف و بستن مودال */
  const onDbl = (r: any) => {
    onSelect([{ id: String(r.ID), name: r.Name }]);
    onClose();
  };

  /** دکمهٔ Select (ممکن است چند ردیف انتخاب شود) */
  const onSelectBtn = (sel: any | any[]) => {
    const arr = Array.isArray(sel) ? sel : [sel];
    onSelect(arr.map(r => ({ id: String(r.ID), name: r.Name })));
    onClose();
  };

  return loading ? (
    <Loader />
  ) : (
    <DataTable
      containerHeight="400px"
      columnDefs={cols}
      rowData={rows}
      onRowDoubleClick={onDbl}
      rowSelectionType="multiple"
      preSelectedIds={preSelectedIds}
      showSearch
      tableSelect
      onSelectButtonClick={onSelectBtn}
    />
  );
};

export default MembersTable;
