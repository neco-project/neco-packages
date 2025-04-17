// Alert.tsx
import React, { useState } from 'react';
import { Accordion, Button, Radio, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Input from '../Common/InputComponent';
import SelectOption, { Option } from '../Common/SelectOption';
import RolePickerTabs from '../Common/RolesGroups/RolePickerTabs';
import DataTable from '../Common/TableDynamic/DataTable';
import { SelectedItem } from '../Common/RolesGroups/MembersTable';

const timeFields: Option[] = [
  { value: 'created',  label: 'Created Date'  },
  { value: 'modified', label: 'Modified Date' },
];

const receivers: Option[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'user',  label: 'User'  },
];

const channels: Option[] = [
  { value: 'sms',   label: 'SMS'   },
  { value: 'email', label: 'Email' },
];

const Alert: React.FC = () => {
  // Stateهای فرم
  const [isTimeBased,    setIsTimeBased]    = useState(true);
  const [timeField,      setTimeField]      = useState('');
  const [duration,       setDuration]       = useState('');
  const [changingField,  setChangingField]  = useState('');
  const [step,           setStep]           = useState('');
  const [receiver,       setReceiver]       = useState('');
  const [alertText,      setAlertText]      = useState('');
  const [sendingChannel, setSendingChannel] = useState('');
  const [alerts,         setAlerts]         = useState<any[]>([
    {
      schedule: 'Time Based',
      field:    'created',
      duration: '2',
      channel:  'SMS',
      text:     'Send welcome SMS',
      receiver: 'Admin',
    },
    {
      schedule: 'Event Based',
      field:    'status',
      duration: '1',
      channel:  'Email',
      text:     'Notify on status change',
      receiver: 'User',
    },
  ]);
  const [opened,         setOpened]         = useState<string | null>(null);
  const [rolePickerOpened, { open: openRolePicker, close: closeRolePicker }] =
    useDisclosure(false);

  const alertMaxLength = 350;

  const alertColumns = [
    { headerName: 'Schedule', field: 'schedule' },
    { headerName: 'Field',    field: 'field'    },
    { headerName: 'Duration', field: 'duration' },
    { headerName: 'Channel',  field: 'channel'  },
    { headerName: 'Text',     field: 'text'     },
    { headerName: 'Receiver', field: 'receiver' },
  ];

  const handleAddAlert = () => {
    setAlerts(prev => [
      ...prev,
      {
        schedule: isTimeBased ? 'Time Based' : 'Event Based',
        field:    isTimeBased ? timeField : changingField,
        duration: isTimeBased ? duration   : step,
        channel:  sendingChannel,
        text:     alertText,
        receiver,
      },
    ]);
    // Reset فرم
    setTimeField('');
    setDuration('');
    setChangingField('');
    setStep('');
    setSendingChannel('');
    setAlertText('');
    setReceiver('');
  };

  const handleDeleteAlert = (row: any) => {
    setAlerts(prev => prev.filter(a => a !== row));
  };

  const handleRoleSelect = (items: SelectedItem[]) => {
    setReceiver(items.map(i => i.name).join(', '));
    closeRolePicker();
  };

  const handleEditExisting = (data: any) => {
    setIsTimeBased(data.schedule === 'Time Based');
    setTimeField(data.field);
    setDuration(data.duration);
    setChangingField(data.field);
    setStep(data.duration);
    setSendingChannel(data.channel);
    setAlertText(data.text);
    setReceiver(data.receiver);
    setOpened('new-alert');
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full">
      {/* Modal RolePicker */}
      <Modal opened={rolePickerOpened} onClose={closeRolePicker} withCloseButton={false}>
        <RolePickerTabs onSelect={handleRoleSelect} onClose={closeRolePicker} />
      </Modal>
  
      {/* Existing Alerts */}

      <h1 className="text-sm font-semibold mb-4">Existing Follow Ups:</h1>
      <DataTable
        columnDefs={alertColumns}
        rowData={alerts}
        onRowDoubleClick={handleEditExisting}
        onDeleteButtonClick={handleDeleteAlert}
        isSelectDisabled={false}
        isDeleteDisabled={false}
        showSearch={true}
        showAddIcon={false}
        showEditIcon={false}
        showDeleteIcon={false}
        showDuplicateIcon={false}
        showViewIcon={false}
        containerHeight="300px"
      />
      {/* New Alert Accordion */}
      <Accordion
        value={opened}
        onChange={setOpened}
        chevronPosition="left"
        variant="filled"
        styles={{
          item:    { backgroundColor: "transparent" },
          control: {
            backgroundColor: "transparent",
            padding: "0.5rem 0",
            display: "flex",
            alignItems: "center",
          },
          chevron: {
            backgroundColor: "#197CAE",
            color: "#fff",
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          },
          label: { fontWeight: 500, fontSize: "1rem" },
          panel: { backgroundColor: "transparent", paddingTop: 8 },
        }}
        className='-mt-10'
      >
        <Accordion.Item value="new-alert">
          <Accordion.Control>New Alert</Accordion.Control>
          <Accordion.Panel>
            <div className="space-y-6">
              {/* Alert Schedule */}
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="text-md font-semibold mb-3">Alert Schedule</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-4">
                    <Radio
                      name="alertType"
                      label="Time Based"
                      checked={isTimeBased}
                      onClick={() => setIsTimeBased(true)}
                    />
                    <Radio
                      name="alertType"
                      label="Event Based"
                      checked={!isTimeBased}
                      onClick={() => setIsTimeBased(false)}
                    />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectOption
                      label="Time Field"
                      options={timeFields}
                      selectedValue={timeField}
                      onChange={val => setTimeField(val as string)}
                      disabled={!isTimeBased}
                    />
                    <Input
                      inputType="text"
                      label="Days"
                      placeholder="Enter days"
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      disabled={!isTimeBased}
                    />
                    <Input
                      inputType="text"
                      label="Changing Field"
                      placeholder="Enter field"
                      value={changingField}
                      onChange={e => setChangingField(e.target.value)}
                      disabled={isTimeBased}
                    />
                    <Input
                      inputType="text"
                      label="Step"
                      placeholder="Enter step"
                      value={step}
                      onChange={e => setStep(e.target.value)}
                      disabled={isTimeBased}
                    />
                  </div>
                </div>
              </div>
  
              {/* Notification Info */}
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="text-md font-semibold mb-3">Notification Info</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col gap-4">
                    <SelectOption
                      label="Receiver"
                      options={receivers}
                      selectedValue={receiver}
                      onChange={val => setReceiver(val as string)}
                      allowCustom
                      showButton
                      onButtonClick={openRolePicker}
                    />
                    <SelectOption
                      label="Channel"
                      options={channels}
                      selectedValue={sendingChannel}
                      onChange={val => setSendingChannel(val as string)}
                    />
                    <div className="mt-auto flex gap-2 pt-4">
                      <Button fullWidth onClick={handleAddAlert}>
                        Add
                      </Button>
                      <Button fullWidth variant="outline" onClick={() => setOpened(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="block text-sm font-medium mb-1">Alert Text</label>
                    <Input
                      inputType="textarea"
                      placeholder="Enter alert text..."
                      value={alertText}
                      onChange={e => setAlertText(e.target.value)}
                      maxLength={alertMaxLength}
                      label=""
                    />
                    <div className="text-right text-sm text-gray-500 pt-1">
                      {alertText.length}/{alertMaxLength}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
  
      {/* Exit Button */}
      <div className="flex justify-center mt-4">
        <Button fullWidth color="blue">
          Exit
        </Button>
      </div>
    </div>
  );
};

export default Alert;
