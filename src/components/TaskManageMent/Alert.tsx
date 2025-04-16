import { useState } from "react";
import { Button, Radio, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TableSelector from "../Common/TableDynamic/TableSelector";
import AccordionComponent from "../Accordion";
import Input from "../Common/InputComponent";
import SelectOption, { Option } from "../Common/SelectOption";
import RolePickerTabs from "../Common/RolesGroups/RolePickerTabs";

const timeFields: Option[] = [
  { value: "created", label: "Created Date" },
  { value: "modified", label: "Modified Date" },
];

const receivers: Option[] = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

const channels: Option[] = [
  { value: "sms", label: "SMS" },
  { value: "email", label: "Email" },
];

const Alert = () => {
  // State‌های Alert schedule
  const [isTimeBased, setIsTimeBased] = useState(true);
  const [timeField, setTimeField] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [changingField, setChangingField] = useState<string>("");
  const [step, setStep] = useState<string>("");

  // State‌های Notification information
  const [receiver, setReceiver] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");
  const [sendingChannel, setSendingChannel] = useState<string>("");

  // Modal برای RolePicker (Receiver)
  const [rolePickerOpened, { open: openRolePicker, close: closeRolePicker }] = useDisclosure(false);

  // جدول هشدارها
  const [alerts, setAlerts] = useState<any[]>([]);

  const alertColumns = [
    { headerName: "Alert Sched", field: "schedule" },
    { headerName: "Field", field: "field" },
    { headerName: "Duration", field: "duration" },
    { headerName: "Sending ch", field: "channel" },
    { headerName: "Alert text", field: "text" },
    { headerName: "Receiver", field: "receiver" },
  ];

  // ثابت maxLength Alert text
  const alertMaxLength = 350;

  const handleModalSelect = () => {
    alert("Selected");
    closeRolePicker();
  };

  const handleAddAlert = () => {
    setAlerts([
      ...alerts,
      {
        schedule: isTimeBased ? "Time Based" : "Event Based",
        field: isTimeBased ? timeField : changingField,
        duration: isTimeBased ? duration : step,
        channel: sendingChannel,
        text: alertText,
        receiver: receiver,
      },
    ]);
  };

  const handleDeleteAlert = (row: any) => {
    setAlerts(alerts.filter((a) => a !== row));
  };

  const handleRowDoubleClick = (row: any) => {
    console.log("Row double clicked:", row);
  };

  const handleOnCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full">
      {/* Modal برای RolePicker */}
      <Modal opened={rolePickerOpened} onClose={closeRolePicker} withCloseButton={false}>
        <RolePickerTabs onSelect={handleModalSelect} onClose={closeRolePicker} />
      </Modal>

      <h1 className="text-sm font-semibold mb-2">Existing Alerts:</h1>
      <TableSelector
        columnDefs={alertColumns}
        rowData={alerts}
        onDeleteButtonClick={handleDeleteAlert}
        isSelectDisabled={true}
        height={500}
        onRowDoubleClick={(e) => console.log("Row double clicked:", e)}
      />

      <AccordionComponent header="New">
        {/* Alert schedule */}
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-lg font-semibold mb-4">Alert schedule</h2>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* ستون سمت چپ: رادیو باتن‌ها */}
            <div className="flex flex-col gap-12">
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
            {/* ستون سمت راست: ورودی‌ها */}
            <div className="flex flex-col gap-4 flex-1">
              {/* همیشه هر دو گروه ورودی نشان داده می‌شوند، فقط با disabled شدن یکی از آن‌ها */}
              <div className="flex flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <SelectOption
                    label="Time Field"
                    name="timeField"
                    options={timeFields}
                    selectedValue={timeField}
                    onChange={(val) => setTimeField(val as string)}
                    multiple={false}
                    disabled={!isTimeBased} // فعال زمانی که Time Based انتخاب است، در غیر این صورت disabled
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Input
                    inputType="text"
                    label="Days"
                    placeholder="Enter days..."
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    disabled={!isTimeBased}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <Input
                    inputType="text"
                    label="Changing Field"
                    placeholder="Enter changing field..."
                    value={changingField}
                    onChange={(e) => setChangingField(e.target.value)}
                    disabled={isTimeBased} // فعال زمانی که Event Based انتخاب است
                    className="w-full"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Input
                    inputType="text"
                    label="Step"
                    placeholder="Enter step..."
                    value={step}
                    onChange={(e) => setStep(e.target.value)}
                    disabled={isTimeBased}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification information */}
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-lg font-semibold mb-4">Notification information</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {/* ستون چپ: Receiver و Sending channel + دکمه‌ها */}
            <div className="flex flex-col flex-1">
              <div className="flex items-end gap-1">
                <div className="w-full">
                  <SelectOption
                    label="Receiver"
                    options={receivers}
                    selectedValue={receiver}
                    onChange={(val) => setReceiver(val as string)}
                    disabled={false}
                    multiple={false}
                    allowCustom={true}
                    showButton={true}
                    onButtonClick={openRolePicker}
                  />
                </div>
              </div>
              <SelectOption
                label="Sending channel"
                options={channels}
                selectedValue={sendingChannel}
                onChange={(val) => setSendingChannel(val as string)}
                multiple={false}
              />
              <div className="mt-auto flex gap-2 pt-4">
                <Button fullWidth onClick={handleAddAlert}>
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
                inputType="text"
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

      <Button fullWidth className="mt-4" color="blue">
        Exit
      </Button>
    </div>
  );
};

export default Alert;
