// RolesGroups/RoleGroupPostPicker.tsx
import React, { useState } from 'react';
import DataTable from '../TableDynamic/DataTable';
import { Loader } from '@mantine/core';
import { SelectedItem } from './MembersTable';

interface RoleGroupPostPickerProps {
  onSelect: (selected: SelectedItem[]) => void;
  onClose: () => void;
  preSelectedIds?: string[];
}

interface PostCat {
  ID: string;
  Name: string;
  Description: string;
}

const fakeRoleGroups: PostCat[] = [
  { ID: '100', Name: 'Group A', Description: 'Description A' },
  { ID: '200', Name: 'Group B', Description: 'Description B' },
];

const RoleGroupPostPicker: React.FC<RoleGroupPostPickerProps> = ({
  onSelect,
  onClose,
  preSelectedIds = [],
}) => {
  const [loading] = useState(false);

  const columnDefs = [
    { headerName: 'Name',        field: 'Name'        },
    { headerName: 'Description', field: 'Description' },
  ];

  const handleRowDoubleClick = (data: any) => {
    if (data?.ID && data?.Name) {
      onSelect([{ id: String(data.ID), name: data.Name }]);
      onClose();
    }
  };

  const handleSelect = (selected: any | any[]) => {
    const rows = Array.isArray(selected) ? selected : [selected];
    const mapped: SelectedItem[] = rows.map(r => ({
      id: String(r.ID),
      name: r.Name,
    }));
    onSelect(mapped);
    onClose();
  };

  return (
    <div style={{ padding: 16 }}>
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          containerHeight="400px"
          columnDefs={columnDefs}
          rowData={fakeRoleGroups}
          onRowDoubleClick={handleRowDoubleClick}
          rowSelectionType="multiple"
          preSelectedIds={preSelectedIds}
          showSearch
          tableSelect
          onSelectButtonClick={handleSelect}
        />
      )}
    </div>
  );
};

export default RoleGroupPostPicker;
