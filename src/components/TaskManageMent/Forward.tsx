// src/components/Forward/Forward.tsx
import React, { useState } from "react";
import { Button } from "@mantine/core";
import {
  IconCalendarTime,
  IconUser,
  IconAlarm,
  IconArrowRight,
} from "@tabler/icons-react";
import Input from "../Common/InputComponent";
import { DateTimePicker } from "@mantine/dates";
import SelectOption, { Option } from "../Common/SelectOption";
import GenericCombobox from "../Common/ComboBox";
import DataTable from "../Common/TableDynamic/DataTable";
import RolePickerTabs from "../Common/RolesGroups/RolePickerTabs";
import { SelectedItem } from "../Common/RolesGroups/MembersTable";

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
  const [ccValue, setCcValue] = useState<string>("");
  const [ccInstruction, setCcInstruction] = useState<string>("");
  const [ccRows, setCcRows] = useState<CCRow[]>([]);
  const [selectedCcRows, setSelectedCcRows] = useState<CCRow[]>([]);
  const [comment, setComment] = useState<string>("");

  // Handler for when RolePickerTabs selects one or more items:
  const handleForwardToSelect = (items: SelectedItem[]) => {
    if (items.length > 0) {
      setForwardTo(items.map((i) => i.name).join(", "));
    }
  };

  const handleAddCCRow = () => {
    if (!ccValue || !ccInstruction) return;
    setCcRows((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        cc: ccValue,
        instruction: ccInstruction,
      },
    ]);
    setCcValue("");
    setCcInstruction("");
  };

  const handleDeleteCCRow = () => {
    const toDelete = new Set(selectedCcRows.map((r) => r.id));
    setCcRows((prev) => prev.filter((r) => !toDelete.has(r.id)));
  };

  const handleCCRowDoubleClick = (row: CCRow) => {
    console.log("Double clicked CC row:", row);
  };

  const handleForward = () => {
    console.log({
      forward,
      forwardTo,
      allowedDuration,
      forwardDate,
      comment,
      ccRows,
    });
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow space-y-6">
      {/* Explanation */}
      <div className="text-sm text-gray-700 space-y-1">
        <p className="font-semibold">
          By forwarding, you can ask others comments about this task.
        </p>
        <p>
          The receiver can fill the form or leave a comment, but the task
          responsible is still you and only you can submit it finally.
        </p>
      </div>

      {/* Row 1: From & Date */}
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

      {/* Row 2: Forward To & Allowed Duration */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Forward To */}
        <div className="w-full md:w-1/2">
          <SelectOption
            label="Forward To"
            name="forwardTo"
            options={forwardToOptions}
            selectedValue={forwardTo}
            onChange={(val) => setForwardTo(val as string)}
            leftIcon={<IconArrowRight stroke={1} />}
            showButton
            children={
              <RolePickerTabs
                onSelect={handleForwardToSelect}
                onClose={() => {}}
              />
            }
          />
        </div>

        {/* Allowed Duration */}
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

      {/* Row 3: Comment */}
      <div className="w-full">
        <GenericCombobox
          label="Enter Your Comment"
          options={instructionOptions}
          value={comment}
          onChange={setComment}
          placeholder="Select or enter comment..."
        />
      </div>

      {/* CC Section */}
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
        onSelectionChanged={(rows) => setSelectedCcRows(rows as CCRow[])}
        onRowDoubleClick={handleCCRowDoubleClick}
        onRowClick={() => {}}
        onView={() => {}}
        onAdd={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        onDuplicate={() => {}}
        showSearch={false}
        containerHeight="250px"
      />

      {/* Action Buttons */}
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
