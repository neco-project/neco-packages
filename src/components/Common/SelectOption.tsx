import React, {
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
} from 'react';
import { Select, MultiSelect, Button, Modal } from '@mantine/core';
import DataTable from '../Common/TableDynamic/DataTable';

export interface Option {
  value: string;
  label: string;
}

interface DynamicSelectorProps {
  name?: string;
  options: Option[];
  selectedValue: string | string[];
  onChange: (value: string | string[]) => void;
  label?: string;
  showButton?: boolean;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  multiple?: boolean;
  allowCustom?: boolean;
  /** If present, rendered inside modal (e.g. RolePickerTabs). */
  children?: ReactNode;
}

const SelectOption: React.FC<DynamicSelectorProps> = ({
  options = [],
  selectedValue,
  onChange,
  label = 'Select',
  showButton = false,
  leftIcon,
  disabled = false,
  loading = false,
  multiple = false,
  children,
}) => {
  const [data, setData] = useState<Option[]>(options);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setData(options);
  }, [options]);

  // When user picks from our default table
  const handleDefaultSelect = (row: any) => {
    onChange(row.value);
    setModalOpen(false);
  };

  const selectProps = {
    label,
    disabled,
    leftSection: leftIcon,
    data,
  };

  return (
    <>
      <div className="flex gap-2 items-end">
        {multiple ? (
          <MultiSelect
            {...selectProps}
            value={selectedValue as string[]}
            onChange={(vals) => onChange(vals)}
            className="w-full"
          />
        ) : (
          <Select
            {...selectProps}
            value={selectedValue as string}
            onChange={(val) => val !== null && onChange(val)}
            className="w-full"
          />
        )}

        {showButton && !loading && (
          <Button
            size="sm"
            onClick={() => setModalOpen(true)}
            disabled={disabled}
            title="Open selector…"
          >
            …
          </Button>
        )}
      </div>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        size="xl"
        title={label}
        withCloseButton
      >
        {children ? (
          // If children is a single React element, inject onSelect & onClose
          isValidElement(children) ? (
            cloneElement(children as ReactElement<any>, {
              onSelect: (val: any) => {
                // call the child’s onSelect if it has one
                const childOnSelect = (children as any).props.onSelect;
                if (typeof childOnSelect === 'function') {
                  childOnSelect(val);
                }
                setModalOpen(false);
              },
              onClose: () => setModalOpen(false),
            })
          ) : (
            // If it's not a single element, just render as-is
            children
          )
        ) : (
          // Default: a DataTable in tableSelect mode
          <DataTable
            columnDefs={[
              { headerName: 'Label', field: 'label' },
              { headerName: 'Value', field: 'value' },
            ]}
            rowData={data}
            tableSelect
            onSelectButtonClick={handleDefaultSelect}
            onRowDoubleClick={handleDefaultSelect}
            isSelectDisabled={false}
            showSearch
            showAddIcon={false}
            showEditIcon={false}
            showDeleteIcon={false}
            showDuplicateIcon={false}
            showViewIcon={false}
            containerHeight="300px"
          />
        )}
      </Modal>
    </>
  );
};

export default SelectOption;
