import React, { useState, useEffect } from "react";
import TableSelector from "../Common/TableDynamic/TableSelector";
import {
  Accordion,
  ActionIcon,
  Button,
  NativeSelect,
  Radio,
} from "@mantine/core";
import GridComponent from "../GridComponent";
import InputComponent from "../Common/InputComponent";
import AdvancedDatePicker from "../Common/DatePicker";
import DynamicModal from "../Common/Modal";
import { IconCalendarEvent } from "@tabler/icons-react";
import AccordionComponent from "../Accordion";

const FollowUp = () => {
  const [columns, setColumns] = useState([
    // { headerName: "ID", field: "id" },
    { headerName: "Follow Up Type", field: "followUpType" },
    { headerName: "Form", field: "form" },
    { headerName: "Day", field: "day" },
    { headerName: "Sending Channel", field: "sendingChannel" },
  ]);

  const [isDynamicDate, setIsDynamicDate] = useState(true);
  const [form, setForm] = useState<string>();
  const [duration, setDuration] = useState<string>();
  const [date, setDate] = useState();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [sendingChannelData, setSendingChannelData] = useState<string>();
  const [alertText, setAlertText] = useState<string>();

  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      followUpType: "Ali",
      form: "ali@example.com",
      day: "Yesterday",
      sendingChannel: "SMS",
    },
    {
      id: 2,
      followUpType: "Sara",
      form: "sara@example.com",
      day: "Today",
      sendingChannel: "Email",
    },
    {
      id: 3,
      followUpType: "Reza",
      form: "reza@example.com",
      day: "Tommarow",
      sendingChannel: "Telegraph",
    },
  ]);

  const formOptions = [
    { value: "creationdate", label: "CreationDate" },
    { value: "senddate", label: "SendDate" },
    { value: "seendate", label: "SeenDate" },
    { value: "completiondate", label: "CompletionDate" },
    { value: "duedate", label: "DueDate" },
  ];

  const sendingChannel = [
    { value: "sms", label: "SMS" },
    { value: "email", label: "Email" },
  ];

  const handleDoubleClick = (row: any) => {
    setForm(row.form);
    setAlertText(row.alertText);
    setSendingChannelData(row.sendingChannel);
  };

  // const handleRowClick = (row: any) => {
  //   console.log("Row clicked:", row);
  // };

  const handleDeleteClick = (row: any) => {
    alert("Deleted: " + row.name);
  };

  const handleOnAdd = () => {
    setFollowUps([
      ...followUps,
      {
        id: 8,
        day: date ?? "Error",
        form: `${form ?? "" + duration}` ?? "Error",
        followUpType: isDynamicDate ? "Dynamic Date" : "Fix Date",
        sendingChannel: sendingChannelData ?? "Error",
      },
    ]);
  };

  const handleOnCancel = () => {};

  return (
    <div className="w-full p-4 bg-white rounded shadow ">
      <h1 className="text-sm font-semibold mb-4">Existing Follow Ups: </h1>
      <TableSelector
        columnDefs={columns}
        rowData={followUps}
        onRowDoubleClick={handleDoubleClick}
        // onRowClick={handleRowClick}
        // onSelectButtonClick={handleSelectClick}
        onDeleteButtonClick={handleDeleteClick}
        isSelectDisabled={false}
        height={500}
      />

      <AccordionComponent header={"New"}>
        <GridComponent header={"Follow up schedule"}>
          <Radio
            name="dateType"
            label="Dynamic date"
            checked={isDynamicDate}
            // value={isDynamicDate}
            onClick={() => setIsDynamicDate(true)}
          />
          <NativeSelect
            label="Form"
            data={formOptions}
            onChange={(e) => setForm(e.target.value)}
            disabled={!isDynamicDate}
          />
          <InputComponent
            label={"Duration"}
            onChange={(e: any) => setDuration(e.target.value)}
            inputType="text"
            disabled={!isDynamicDate}
          />
          <Radio
            name="dateType"
            label="Fix date"
            // value={isDynamicDate}
            onClick={() => setIsDynamicDate(false)}
          />

          <ActionIcon
            onClick={() => setIsDatePickerOpen(true)}
            disabled={isDynamicDate}
          >
            <IconCalendarEvent stroke={1.5} />
          </ActionIcon>
          <DynamicModal
            isOpen={isDatePickerOpen}
            title="Enter Date"
            children={
              <AdvancedDatePicker
                onChange={(e: any) => {
                  setDate(e.toString());
                  setIsDatePickerOpen(false);

                  // console.log(e);
                  // console.log(e?.toLocaleString());
                }}
              />
            }
            onClose={() => setIsDatePickerOpen(false)}
          />
        </GridComponent>
        <GridComponent
          header={"Notification information"}
          gridCols={2}
          gridRows={1}
        >
          <div>
            <NativeSelect
              label="Sending Channel"
              data={sendingChannel}
              onChange={(e) => {
                setSendingChannelData(e.target.value);
              }}
            />
            <div className="flex gap-1.5 py-2">
              <Button fullWidth onClick={handleOnAdd}>
                Add
              </Button>
              <Button fullWidth onClick={handleOnCancel}>
                Cancel
              </Button>
            </div>
          </div>

          <InputComponent
            inputType="text"
            label={"AlertText"}
            onChange={(e: any) => setAlertText(e.target.value)}
          ></InputComponent>
        </GridComponent>
      </AccordionComponent>
      <Button className="mt-3" fullWidth>
        Exit
      </Button>
    </div>
  );
};

export default FollowUp;
