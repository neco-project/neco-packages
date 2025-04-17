// Expedit.tsx
import React, { useState } from 'react';
import { Accordion, Button, Checkbox, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Input from '../Common/InputComponent';
import SelectOption, { Option } from '../Common/SelectOption';
import RolePickerTabs from '../Common/RolesGroups/RolePickerTabs';
import DataTable from '../Common/TableDynamic/DataTable';
import { SelectedItem } from '../Common/RolesGroups/MembersTable';

const expeditorOptions: Option[] = [
  { value: 'john',  label: 'John'  },
  { value: 'sara',  label: 'Sara'  },
  { value: 'admin', label: 'Admin' },
];

const Expedit: React.FC = () => {
  // فرم
  const [selectedExpeditor, setSelectedExpeditor] = useState<string>('');
  const [interval,           setInterval]        = useState<number>(1);
  const [note,               setNote]            = useState<string>('');
  const [isActive,           setIsActive]        = useState<boolean>(true);

  // جدول (با دو ردیف مثال)
  const [expedites, setExpedites] = useState<any[]>([
    { expeditor: 'john', interval: 3, note: 'First batch',  state: 'Active'   },
    { expeditor: 'sara', interval: 1, note: 'Urgent items', state: 'Inactive' },
  ]);

  // کنترل Accordion
  const [opened, setOpened] = useState<string | null>(null);

  // Modal Expeditor
  const [rolePickerOpened, { open: openRolePicker, close: closeRolePicker }] =
    useDisclosure(false);

  const noteMaxLength = 400;

  const columns = [
    { headerName: 'Expeditor',      field: 'expeditor' },
    { headerName: 'Interval (day)', field: 'interval'  },
    { headerName: 'Note',           field: 'note'      },
    { headerName: 'State',          field: 'state'     },
  ];

  const handleAdd = () => {
    setExpedites(prev => [
      ...prev,
      {
        expeditor: selectedExpeditor,
        interval,
        note,
        state: isActive ? 'Active' : 'Inactive',
      },
    ]);
    // ریست فرم
    setSelectedExpeditor('');
    setInterval(1);
    setNote('');
    setIsActive(true);
  };

  const handleDelete = (row: any) => {
    setExpedites(prev => prev.filter(r => r !== row));
  };

  const handleSelectExisting = (sel: any | any[]) => {
    const row = Array.isArray(sel) ? sel[0] : sel;
    if (!row) return;
    setSelectedExpeditor(row.expeditor);
    setInterval(row.interval);
    setNote(row.note);
    setIsActive(row.state === 'Active');
    setOpened('new-expedite');
  };

  const handleDoubleClick = (row: any) => {
    handleSelectExisting(row);
  };

  const handleModalSelect = (items: SelectedItem[] | string) => {
    const val = Array.isArray(items) ? (items[0] as any).name : items;
    setSelectedExpeditor(val as string);
    closeRolePicker();
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow">
      {/* Existing Expedites */}
      <h2 className="text-sm font-semibold mb-4">Existing Expedites:</h2>
      <DataTable
        columnDefs={columns}
        rowData={expedites}
        onRowDoubleClick={handleDoubleClick}

        // toolbar
        showSearch={true}
        showAddIcon={false}
        showEditIcon={false}
        showDeleteIcon={false}
        showDuplicateIcon={false}
        showViewIcon={false}

        rowSelectionType="single"
        onDeleteButtonClick={handleDelete}
        onSelectButtonClick={handleSelectExisting}
        isDeleteDisabled={false}
        isSelectDisabled={false}

        // نیم کردن ارتفاع جدول
        containerHeight="300px"
      />

      {/* New Expedite Accordion */}
      <Accordion
        value={opened}
        onChange={setOpened}
        chevronPosition="left"
        variant="filled"
        className="-mt-10"
        styles={{
          item:    { backgroundColor: 'transparent' },
          control: {
            backgroundColor: 'transparent',
            padding: '0.5rem 0',
            display: 'flex',
            alignItems: 'center',
          },
          chevron: {
            backgroundColor: '#197CAE',
            color: '#fff',
            width: 28,
            height: 28,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
          },
          label: { fontWeight: 500, fontSize: '1rem' },
          panel: { backgroundColor: 'transparent', paddingTop: 8 },
        }}
      >
        <Accordion.Item value="new-expedite">
          <Accordion.Control>New Expedite</Accordion.Control>
          <Accordion.Panel>
            <div className="bg-white p-4 rounded shadow-inner">
              <div className="flex flex-col md:flex-row gap-16">
                {/* Left side */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  <SelectOption
                    label="Expeditor"
                    name="expeditor"
                    options={expeditorOptions}
                    selectedValue={selectedExpeditor}
                    onChange={val => setSelectedExpeditor(val as string)}
                    multiple={false}
                    showButton
                    onButtonClick={openRolePicker}
                  />
                  <Checkbox
                    label="Active"
                    checked={isActive}
                    onChange={e => setIsActive(e.currentTarget.checked)}
                  />
                  <div className="flex gap-4 mt-4">
                    <Button fullWidth onClick={handleAdd}>
                      Add
                    </Button>
                    <Button
                      fullWidth
                      variant="outline"
                      onClick={() => {
                        setSelectedExpeditor('');
                        setInterval(1);
                        setNote('');
                        setIsActive(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>

                {/* Right side */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  <Input
                    inputType="number"
                    label="Interval (day)"
                    value={interval}
                    onChange={v => setInterval(v as number)}
                  />
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium">Note</label>
                    <Input
                      inputType="textarea"
                      placeholder="Enter note..."
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      maxLength={noteMaxLength}
                      label=""
                    />
                    <div className="text-right text-sm text-gray-500">
                      {note.length}/{noteMaxLength}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {/* Modal Expeditor */}
      <Modal opened={rolePickerOpened} onClose={closeRolePicker} withCloseButton={false}>
        <RolePickerTabs onSelect={handleModalSelect} onClose={closeRolePicker} />
      </Modal>

      {/* Exit Button */}
      <div className="flex justify-center mt-4">
        <Button fullWidth color="blue">
          Exit
        </Button>
      </div>
    </div>
  );
};

export default Expedit;
