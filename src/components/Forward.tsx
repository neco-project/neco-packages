import React, { useState } from "react";
import { Button, Modal } from "@mantine/core";
import {
  IconCalendarTime,
  IconUser,
  IconAlarm,
  IconArrowRight,
} from "@tabler/icons-react";
import Input from "./InputComponent";
import AdvancedDatePicker from "./DatePicker";
import SelectOption, { Option } from "./SelectOption";
import GenericCombobox from "./ComboBox";
import DataTable from "../TableDynamic/DataTable";
import ModalSelector from "./ModalSelector/Main";
import { DateTimePicker } from "@mantine/dates";

const forwardToOptions: Option[] = [
  { value: "UserA", label: "User A" },
  { value: "UserB", label: "User B" },
  { value: "UserC", label: "User C" },
];

const instructionOptions: string[] = [
  "جهت تهیه پاسخ",
  "جهت پیگیری",
  "جهت اقدام مقتضی",
  "جهت استحضار",
  "جهت اخطار",
  "درخواست راهنمایی",
  "درخواست مشاوره",
  "درخواست اعلام نظر",
];

interface CCRow {
  id: string;
  cc: string;
  instruction: string;
}

const Forward: React.FC = () => {
  const [forward, setForward] = useState<string>("");
  const [forwardTo, setForwardTo] = useState<string>("");
  const [allowedDuration, setAllowedDuration] = useState<number>(3);
  const [forwardDate, setForwardDate] = useState<Date | null>(null);
  const [calendarModalOpen, setCalendarModalOpen] = useState<boolean>(false);
  const [ccValue, setCcValue] = useState<string>("");
  const [ccDuration, setCcDuration] = useState<number>(3);
  const [ccInstruction, setCcInstruction] = useState<string>("");
  const [ccRows, setCcRows] = useState<CCRow[]>([]);
  const [selectedCcRows, setSelectedCcRows] = useState<CCRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleModalSelect = (selected: any[]) => {
    if (selected.length > 0) {
      setForwardTo(selected[0].name);
    }
    closeModal();
  };

  const handleAddCCRow = () => {
    if (!ccValue || !ccInstruction) return;
    const newRow: CCRow = {
      id: Date.now().toString(),
      cc: ccValue,
      instruction: ccInstruction,
    };
    setCcRows((prev) => [...prev, newRow]);
    setCcValue("");
    setCcInstruction("");
  };

  const handleDeleteCCRow = () => {
    if (selectedCcRows.length === 0) return;
    const idsToDelete = selectedCcRows.map((row) => row.id);
    setCcRows((prev) => prev.filter((r) => !idsToDelete.includes(r.id)));
  };

  const onCCSelectionChanged = (rows: any[]) => {
    setSelectedCcRows(rows as CCRow[]);
  };

  const handleCCRowDoubleClick = (data: any) => {
    console.log("Double clicked row =>", data);
  };

  const handleForward = () => {
    console.log("Forward:", forward);
    console.log("Forward To:", forwardTo);
    console.log("Allowed Duration:", allowedDuration);
    console.log("Forward Date:", forwardDate);
    console.log("Enter Your Comment:", comment);
    console.log("CC:", ccRows);
    console.log("CC Duration:", ccDuration);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow space-y-6">
      <ModalSelector
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleModalSelect}
      />
      <Modal
        opened={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        title="Select Date"
      >
        <AdvancedDatePicker
          controlled
          value={forwardDate}
          onChange={(val) => {
            if (val instanceof Date) {
              setForwardDate(val);
              setCalendarModalOpen(false);
            }
          }}
        />
      </Modal>
      <div className="mb-4">
        <label className="block text-sm font-bold text-left mb-1">
          Select Date
        </label>
      </div>
      <div className="text-sm text-gray-700 space-y-1">
        <p className="font-semibold">
          By forwarding, you can ask others comments about this task.
        </p>
        <p>
          The receiver can fill the form or leave a comment, but the task
          responsible is still you and only you can submit it finally.
        </p>
      </div>

      {/* Row 1: Forward and Forward Date */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Input
            inputType="text"
            label="From"
            placeholder="From ..."
            value={forward}
            onChange={(e) => setForward(e.currentTarget.value)}
            leftIcon={<IconUser stroke={1} />}
          />
        </div>
        <div className="w-full md:w-1/2">
          <DateTimePicker
            label="Select Date"
            placeholder="Pick date and time"
            value={forwardDate}
            onChange={setForwardDate}
            leftSection={<IconCalendarTime stroke={1} />}
          />
        </div>
      </div>

      {/* Row 2: Forward To and Allowed Duration */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <SelectOption
            label="Forward To"
            name="forwardTo"
            options={forwardToOptions}
            selectedValue={forwardTo}
            onChange={(val) => setForwardTo(val as string)}
            leftIcon={<IconArrowRight stroke={1} />}
            showButton
            onButtonClick={openModal}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Input
            inputType="number"
            label="Allowed Duration"
            placeholder="Enter allowed duration..."
            value={allowedDuration}
            onChange={(val) =>
              setAllowedDuration(typeof val === "number" ? val : 0)
            }
            leftIcon={<IconAlarm />}
          />
        </div>
      </div>

      {/* Row 3: Enter Your Comment using GenericCombobox */}
      <div className="w-full">
        <GenericCombobox
          label="Enter Your Comment"
          options={instructionOptions}
          value={comment}
          onChange={setComment}
          placeholder="Select or enter comment..."
        />
      </div>

      {/* CC section */}
      <div className="flex items-center gap-2">
        <Button variant="default" onClick={handleAddCCRow}>
          Add
        </Button>
        <Button
          variant="default"
          color="red"
          onClick={handleDeleteCCRow}
          disabled={selectedCcRows.length === 0}
        >
          Delete
        </Button>
      </div>
      <DataTable
        columnDefs={[
          { headerName: "CC", field: "cc", sortable: true },
          { headerName: "Instruction", field: "instruction", sortable: true },
        ]}
        rowData={ccRows}
        rowSelectionType="multiple"
        onSelectionChanged={onCCSelectionChanged}
        onRowDoubleClick={handleCCRowDoubleClick}
        showSearch={false}
        containerHeight="250px"
        onRowClick={() => {}}
        onView={() => {}}
        onAdd={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        onDuplicate={() => {}}
      />

      {/* Final action buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleForward}
          variant="filled"
          color="blue"
          className="flex-1"
        >
          Forward
        </Button>
        <Button
          onClick={handleCancel}
          variant="outline"
          color="gray"
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Forward;
