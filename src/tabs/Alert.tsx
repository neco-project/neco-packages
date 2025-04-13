import React, { useState } from "react";
import {
  Button,
  NativeSelect,
  Radio,
  Textarea,
  ActionIcon,
} from "@mantine/core";
import TableSelector from "../components/TableSelector";
import InputComponent from "../components/InputComponent";
import GridComponent from "../components/GridComponent";
import AccordionComponent from "../components/Accordion";
import DynamicModal from "../components/Modal";
import AdvancedDatePicker from "../components/DatePicker";
import { IconDots, IconCalendarEvent } from "@tabler/icons-react";

const Alert = () => {
  const [isTimeBased, setIsTimeBased] = useState(true);
  const [timeField, setTimeField] = useState<string>();
  const [duration, setDuration] = useState<string>();
  const [changingField, setChangingField] = useState<string>();
  const [step, setStep] = useState<string>();
  const [receiver, setReceiver] = useState<string>();
  const [alertText, setAlertText] = useState<string>("");
  const [sendingChannel, setSendingChannel] = useState<string>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const alertColumns = [
    { headerName: "Alert Sched", field: "schedule" },
    { headerName: "Field", field: "field" },
    { headerName: "Duration", field: "duration" },
    { headerName: "Sending ch", field: "channel" },
    { headerName: "Alert text", field: "text" },
    { headerName: "Receiver", field: "receiver" },
  ];

  const [alerts, setAlerts] = useState<any[]>([]);

  const timeFields = [
    { value: "created", label: "Created Date" },
    { value: "modified", label: "Modified Date" },
  ];

  const receivers = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const channels = [
    { value: "sms", label: "SMS" },
    { value: "email", label: "Email" },
  ];

  const handleDeleteClick = (row: any) => {
    alert("Deleted: " + row.name);
  };

  const handleAddAlert = () => {
    setAlerts([
      ...alerts,
      {
        schedule: isTimeBased ? "Time Based" : "Event Based",
        field: isTimeBased ? timeField : changingField,
        duration: duration ?? step,
        channel: sendingChannel,
        text: alertText,
        receiver: receiver,
      },
    ]);
  };

  const handleDeleteAlert = (row: any) => {
    setAlerts(alerts.filter((a) => a !== row));
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full">
      <h1 className="text-sm font-semibold mb-2">Existing Alerts:</h1>
      <TableSelector
        columnDefs={alertColumns}
        rowData={alerts}
        onDeleteButtonClick={handleDeleteAlert}
        isSelectDisabled={true}
        height={500}
        onRowDoubleClick={(e) => handleDeleteClick(e)}
      />

      <AccordionComponent header="New">
        <GridComponent header="Alert schedule" gridCols={3}>
          <Radio
            name="alertType"
            label="Time Based"
            checked={isTimeBased}
            onClick={() => setIsTimeBased(true)}
          />
          <NativeSelect
            label="Time Field"
            data={timeFields}
            disabled={!isTimeBased}
            onChange={(e) => setTimeField(e.target.value)}
          />
          <InputComponent
            label="Days"
            inputType="text"
            disabled={!isTimeBased}
            onChange={(e) => setDuration(e.target.value)}
          />

          <Radio
            name="alertType"
            label="Event Based"
            checked={!isTimeBased}
            onClick={() => setIsTimeBased(false)}
          />
          <InputComponent
            label="Changing Field"
            inputType="text"
            disabled={isTimeBased}
            onChange={(e) => setChangingField(e.target.value)}
          />
          <InputComponent
            label="Step"
            inputType="text"
            disabled={isTimeBased}
            onChange={(e) => setStep(e.target.value)}
          />
        </GridComponent>

        <GridComponent
          header="Notification information"
          gridCols={2}
          gridRows={1}
        >
          <div className="w-full">
            <div className="flex items-end gap-1">
              <div className="w-full">
                <NativeSelect
                  label="Receiver"
                  data={receivers}
                  onChange={(e) => setReceiver(e.target.value)}
                />
              </div>
              <ActionIcon variant="default" color="blue">
                <IconDots size={20} />
              </ActionIcon>
            </div>
            <NativeSelect
              label="Sending channel"
              data={channels}
              onChange={(e) => setSendingChannel(e.target.value)}
            />
            <div className="flex gap-2 pt-6">
              <Button fullWidth onClick={handleAddAlert}>
                Add
              </Button>
              <Button fullWidth variant="outline">
                Cancel
              </Button>
            </div>
          </div>

          <Textarea
            placeholder="Alert text"
            value={alertText}
            onChange={(e) => setAlertText(e.target.value)}
            maxLength={350}
            autosize
            minRows={2}
          />
        </GridComponent>
      </AccordionComponent>

      <Button fullWidth className="mt-4" color="blue">
        Exit
      </Button>

      <DynamicModal
        isOpen={isDatePickerOpen}
        title="Select Date"
        children={
          <AdvancedDatePicker
            onChange={(e: any) => {
              setIsDatePickerOpen(false);
            }}
          />
        }
        onClose={() => setIsDatePickerOpen(false)}
      />
    </div>
  );
};

export default Alert;
