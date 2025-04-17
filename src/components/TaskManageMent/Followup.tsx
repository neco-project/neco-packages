// FollowUp.tsx
import React, { useState } from "react";
import DataTable from "../Common/TableDynamic/DataTable";
import { Accordion, Button, Radio } from "@mantine/core";
import Input from "../Common/InputComponent";
import { DateTimePicker } from "@mantine/dates";
import SelectOption, { Option } from "../Common/SelectOption";
import { IconCalendarTime } from "@tabler/icons-react";

const formOptions: Option[] = [
  { value: "creationdate",   label: "CreationDate"   },
  { value: "senddate",       label: "SendDate"       },
  { value: "seendate",       label: "SeenDate"       },
  { value: "completiondate", label: "CompletionDate" },
  { value: "duedate",        label: "DueDate"        },
];

const sendingChannelOptions: Option[] = [
  { value: "sms",   label: "SMS"   },
  { value: "email", label: "Email" },
];

const FollowUp: React.FC = () => {
  const alertMaxLength = 350;

  const [columns] = useState([
    { headerName: "Follow Up Type",   field: "followUpType"   },
    { headerName: "Form / From",      field: "form"           },
    { headerName: "Day",              field: "day"            },
    { headerName: "Sending Channel",  field: "sendingChannel" },
  ]);
  const [followUps, setFollowUps] = useState<any[]>([
    {
      id: 1,
      followUpType: "Dynamic Date",
      form:         "creationdate - 3",
      day:          "Yesterday",
      sendingChannel: "SMS",
    },
    {
      id: 2,
      followUpType: "Dynamic Date",
      form:         "senddate - 2",
      day:          "Today",
      sendingChannel: "Email",
    },
  ]);

  const [opened, setOpened]                   = useState<string | null>(null);
  const [isDynamicDate, setIsDynamicDate]     = useState(true);
  const [form, setForm]                       = useState("");
  const [duration, setDuration]               = useState("");
  const [fixedDate, setFixedDate]             = useState<Date | null>(null);
  const [sendingChannelData, setSendingChannelData] = useState("");
  const [alertText, setAlertText]             = useState("");

  const handleOnAdd = () => {
    const newRow = {
      id: Date.now(),
      followUpType: isDynamicDate ? "Dynamic Date" : "Fix Date",
      form: isDynamicDate
        ? `${form} - ${duration}`
        : `Date: ${fixedDate?.toLocaleString() ?? "Not set"}`,
      day:          fixedDate?.toLocaleString() ?? "Not set",
      sendingChannel: sendingChannelData || "Not set",
    };
    setFollowUps(prev => [...prev, newRow]);
    setForm("");
    setDuration("");
    setFixedDate(null);
    setSendingChannelData("");
    setAlertText("");
  };

  const handleOnCancel = () => {
    setForm("");
    setDuration("");
    setFixedDate(null);
    setSendingChannelData("");
    setAlertText("");
  };

  const handleRowDoubleClick = (row: any) => {
    console.log("Row double clicked:", row);
  };
  const handleDeleteClick = (row: any) => {
    setFollowUps(prev => prev.filter(r => r.id !== row.id));
  };
  const handleSelectClick = (sel: any) => {
    console.log("Selected:", sel);
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow">
      <h1 className="text-sm font-semibold mb-4">Existing Follow Ups:</h1>
      <DataTable
        columnDefs={columns}
        rowData={followUps}
        onRowDoubleClick={handleRowDoubleClick}
        showSearch={true}
        showAddIcon={false}
        showEditIcon={false}
        showDeleteIcon={false}
        showDuplicateIcon={false}
        showViewIcon={false}
        onDeleteButtonClick={handleDeleteClick}
        onSelectButtonClick={handleSelectClick}
        isDeleteDisabled={false}
        isSelectDisabled={false}
        containerHeight="300px"
      />

      <Accordion
        value={opened}
        onChange={setOpened}
        chevronPosition="left"
        variant="filled"
        className="-mt-10"
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
      >
        <Accordion.Item value="new">
          <Accordion.Control>New</Accordion.Control>
          <Accordion.Panel>
            <div className="space-y-6">
              {/* Follow up schedule */}
              <div className="p-4 bg-gray-100 rounded">
                <h2 className="text-lg font-semibold mb-4">Follow up schedule</h2>
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex flex-col gap-12">
                    <Radio
                      name="dateType"
                      label="Dynamic date"
                      checked={isDynamicDate}
                      onClick={() => setIsDynamicDate(true)}
                    />
                    <Radio
                      name="dateType"
                      label="Fix date"
                      checked={!isDynamicDate}
                      onClick={() => setIsDynamicDate(false)}
                    />
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex flex-row gap-4">
                      <SelectOption
                        label="From"
                        name="form"
                        options={formOptions}
                        selectedValue={form}
                        onChange={v => setForm(v as string)}
                        disabled={!isDynamicDate}
                      />
                      <Input
                        inputType="text"
                        label="Duration"
                        placeholder="Enter duration..."
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        disabled={!isDynamicDate}
                        className="w-full"
                      />
                    </div>
                    <DateTimePicker
                      label="Pick date and time"
                      placeholder="Pick date and time"
                      value={fixedDate}
                      onChange={setFixedDate}
                      disabled={isDynamicDate}
                      className="w-full"
                      leftSection={<IconCalendarTime stroke={1} size={20} />}
                    />
                  </div>
                </div>
              </div>

              {/* Notification information */}
              <div className="p-4 bg-gray-100 rounded">
                <h2 className="text-lg font-semibold mb-4">Notification information</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col flex-1">
                    <SelectOption
                      label="Sending channel"
                      name="sendingChannel"
                      options={sendingChannelOptions}
                      selectedValue={sendingChannelData}
                      onChange={v => setSendingChannelData(v as string)}
                      multiple={false}
                    />
                    <div className="mt-auto flex gap-2 pt-4">
                      <Button fullWidth onClick={handleOnAdd}>
                        Add
                      </Button>
                      <Button fullWidth variant="outline" onClick={handleOnCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="block text-sm font-medium mb-1">Alert text</label>
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

      <Button className="mt-3" fullWidth>
        Exit
      </Button>
    </div>
  );
};

export default FollowUp;
