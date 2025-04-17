// Alert.tsx
import React, { useState } from 'react';
import { Accordion, Button, Radio } from '@mantine/core';
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
  // form state
  const [isTimeBased,   setIsTimeBased]   = useState(true);
  const [timeField,     setTimeField]     = useState('');
  const [duration,      setDuration]      = useState('');
  const [changingField, setChangingField] = useState('');
  const [step,          setStep]          = useState('');
  const [receiver,      setReceiver]      = useState('');
  const [alertText,     setAlertText]     = useState('');
  const [sendingChannel,setSendingChannel]= useState('');
  const [opened,        setOpened]        = useState<string | null>(null);

  const alertMaxLength = 350;

  // existing alerts
  const [alerts, setAlerts] = useState<any[]>([
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
    // reset form
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
      {/* Existing Alerts */}
      <h2 className="text-lg font-semibold mb-4">Existing Alerts</h2>
      <DataTable
        columnDefs={alertColumns}
        rowData={alerts}
        onRowDoubleClick={handleEditExisting}
        onDeleteButtonClick={handleDeleteAlert}
        onSelectButtonClick={handleEditExisting}
        isSelectDisabled={false}
        isDeleteDisabled={false}

        showSearch
        showAddIcon={false}
        showEditIcon={false}
        showDeleteIcon={false}
        showDuplicateIcon={false}
        showViewIcon={false}
        containerHeight="300px"
      />

      {/* New Alert */}
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
                      onChange={v => setTimeField(v as string)}
                      showButton
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
                      onChange={v => setReceiver(v as string)}
                      showButton
                      children={
                        <RolePickerTabs
                          onSelect={(items: SelectedItem[]) =>
                            setReceiver(items.map(i => i.name).join(', '))
                          }
                          onClose={() => {}}
                        />
                      }
                    />
                    <SelectOption
                      label="Channel"
                      options={channels}
                      selectedValue={sendingChannel}
                      onChange={v => setSendingChannel(v as string)}
                      showButton={false}
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

      {/* Exit */}
      <div className="flex justify-center mt-4">
        <Button fullWidth color="blue">
          Exit
        </Button>
      </div>
    </div>
  );
};

export default Alert;
