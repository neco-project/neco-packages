import React, { useState } from "react";
import TableSelector from "../Common/TableDynamic/TableSelector";
import { Accordion, Button, Radio } from "@mantine/core";
import Input from "../Common/InputComponent"; // کامپوننت Input (پشتیبانی از text)
import { DateTimePicker } from "@mantine/dates";
import AccordionComponent from "../Accordion";
import { IconCalendarTime } from "@tabler/icons-react";
import SelectOption, { Option } from "../Common/SelectOption";

const formOptions: Option[] = [
  { value: "creationdate", label: "CreationDate" },
  { value: "senddate", label: "SendDate" },
  { value: "seendate", label: "SeenDate" },
  { value: "completiondate", label: "CompletionDate" },
  { value: "duedate", label: "DueDate" },
];

const sendingChannelOptions: Option[] = [
  { value: "sms", label: "SMS" },
  { value: "email", label: "Email" },
];

const FollowUp = () => {
  const alertMaxLength = 350;

  // ستون‌های جدول
  const [columns] = useState([
    { headerName: "Follow Up Type", field: "followUpType" },
    { headerName: "Form / From", field: "form" },
    { headerName: "Day", field: "day" },
    { headerName: "Sending Channel", field: "sendingChannel" },
  ]);

  // داده‌های اولیه جدول
  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      followUpType: "Dynamic Date",
      form: "creationdate - 3",
      day: "Yesterday",
      sendingChannel: "SMS",
    },
    {
      id: 2,
      followUpType: "Dynamic Date",
      form: "senddate - 2",
      day: "Today",
      sendingChannel: "Email",
    },
  ]);

  // حالت انتخاب Dynamic/Fix date
  const [isDynamicDate, setIsDynamicDate] = useState(true);

  // مقادیر مرتبط با Dynamic date
  const [form, setForm] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  // مقادیر مربوط به Fix date
  const [fixedDate, setFixedDate] = useState<Date | null>(null);

  // Notification information
  const [sendingChannelData, setSendingChannelData] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");

  // افزودن سطر جدید
  const handleOnAdd = () => {
    const newFollowUp = {
      id: Date.now(),
      followUpType: isDynamicDate ? "Dynamic Date" : "Fix Date",
      form: isDynamicDate
        ? `${form} - ${duration}`
        : "Date: " + (fixedDate ? fixedDate.toLocaleString() : "Not set"),
      day: fixedDate ? fixedDate.toLocaleString() : "Not set",
      sendingChannel: sendingChannelData || "Not set",
    };
    setFollowUps([...followUps, newFollowUp]);

    // ریست کردن مقادیر فرم
    setForm("");
    setDuration("");
    setFixedDate(null);
    setSendingChannelData("");
    setAlertText("");
  };

  const handleOnCancel = () => {
    console.log("Cancel clicked");
  };

  const handleRowDoubleClick = (row: any) => {
    console.log("Row double clicked:", row);
  };

  const handleDeleteClick = (row: any) => {
    alert("Deleted: " + row.name);
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow">
      {/* جدول موجود */}
      <h1 className="text-sm font-semibold mb-4">Existing Follow Ups:</h1>
      <TableSelector
        columnDefs={columns}
        rowData={followUps}
        onRowDoubleClick={handleRowDoubleClick}
        onDeleteButtonClick={handleDeleteClick}
        isSelectDisabled={false}
        height={500}
      />

      <AccordionComponent header="New">
        {/* Follow up schedule */}
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-lg font-semibold mb-4">Follow up schedule</h2>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* ستون سمت چپ: رادیو باتن‌ها */}
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
            {/* ستون سمت راست: ورودی‌ها */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-row gap-4">
                <div className="w-full">
                  <SelectOption
                    label="From"
                    name="form"
                    options={formOptions}
                    selectedValue={form}
                    onChange={(val) => setForm(val as string)}
                    multiple={false}
                    disabled={!isDynamicDate}
                  />
                </div>
                <div className="w-full">
                  <Input
                    inputType="text"
                    label="Duration"
                    placeholder="Enter duration..."
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    disabled={!isDynamicDate}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full">
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
        </div>

        {/* Notification information */}
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-lg font-semibold mb-4">Notification information</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {/* ستون چپ: Sending channel + دکمه‌ها */}
            <div className="flex flex-col flex-1">
              <SelectOption
                label="Sending channel"
                name="sendingChannel"
                options={sendingChannelOptions}
                selectedValue={sendingChannelData}
                onChange={(val) => setSendingChannelData(val as string)}
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
            {/* ستون راست: Alert text */}
            <div className="flex flex-col flex-1">
              <label className="block text-sm font-medium mb-1">Alert text</label>
              <Input
                inputType="textarea"
                placeholder="Enter alert text..."
                value={alertText}
                onChange={(e) => setAlertText(e.target.value)}
                maxLength={alertMaxLength}
                label=""
              />
              <div className="text-right text-sm text-gray-500 pt-1">
                {alertText.length}/{alertMaxLength}
              </div>
            </div>
          </div>
        </div>
      </AccordionComponent>

      <Button className="mt-3" fullWidth>
        Exit
      </Button>
    </div>
  );
};

export default FollowUp;
