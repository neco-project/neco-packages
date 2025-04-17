// Reassign.tsx
import React, { useState } from "react";
import { Button } from "@mantine/core";
import { IconProgressHelp, IconAlarm, IconCopy } from "@tabler/icons-react";
import Input from "../Common/InputComponent";
import SelectOption, { Option } from "../Common/SelectOption";
import Combobox from "../Common/ComboBox";
import DataTable from "../Common/TableDynamic/DataTable";
import RolePickerTabs from "../Common/RolesGroups/RolePickerTabs";
import { SelectedItem } from "../Common/RolesGroups/MembersTable";

interface CCRow {
  id: string;
  cc: string;
  instruction: string;
}

const reassignToOptions: Option[] = [
  { value: "PersonA", label: "Person A" },
  { value: "PersonB", label: "Person B" },
  { value: "PersonC", label: "Person C" },
];

const ccOptions: Option[] = [
  { value: "CCUser1", label: "CC User 1" },
  { value: "CCUser2", label: "CC User 2" },
  { value: "CCUser3", label: "CC User 3" },
];

const instructionOptions = [
  "جهت تهیه پاسخ",
  "جهت پیگیری",
  "جهت اقدام مقتضی",
  "جهت استحضار",
  "جهت اخطار",
  "درخواست راهنمایی",
  "درخواست مشاوره",
  "درخواست اعلام نظر",
];

export const Reassign: React.FC = () => {
  // Reassign form
  const [reassignTo, setReassignTo]           = useState<string>("");
  const [reassignDuration, setReassignDuration] = useState<number>(3);
  const [reassignInstruction, setReassignInstruction] = useState<string>("");

  // CC form
  const [ccValue, setCcValue]               = useState<string>("");
  const [ccDuration, setCcDuration]         = useState<number>(3);
  const [ccInstruction, setCcInstruction]   = useState<string>("");

  // CC rows & selection
  const [ccRows, setCcRows]                 = useState<CCRow[]>([]);
  const [selectedCcRows, setSelectedCcRows] = useState<CCRow[]>([]);

  const noteMaxLength = 400;

  const ccColumnDefs = [
    { headerName: "CC", field: "cc", sortable: true },
    { headerName: "Instruction", field: "instruction", sortable: true },
  ];

  // Add / delete CC rows
  const handleAddCCRow = () => {
    if (!ccValue || !ccInstruction) return;
    const newRow: CCRow = {
      id: Date.now().toString(),
      cc: ccValue,
      instruction: ccInstruction,
    };
    setCcRows(prev => [...prev, newRow]);
    setCcValue("");
    setCcInstruction("");
  };
  const handleDeleteCCRow = () => {
    const ids = selectedCcRows.map(r => r.id);
    setCcRows(prev => prev.filter(r => !ids.includes(r.id)));
    setSelectedCcRows([]);
  };
  const onCCSelectionChanged = (rows: any[]) => {
    setSelectedCcRows(rows as CCRow[]);
  };
  const handleCCRowDoubleClick = (row: any) => {
    console.log("Double-clicked CC row:", row);
  };

  // Handle final reassign
  const handleReassign = () => {
    console.log("Reassign To:", reassignTo);
    console.log("Duration:", reassignDuration);
    console.log("Instruction:", reassignInstruction);
    console.log("CC rows:", ccRows, "CC Duration:", ccDuration);
  };
  const handleCancel = () => {
    console.log("Reassign cancelled");
  };

  // Handlers for RolePickerTabs
  const handleReassignSelect = (items: SelectedItem[] | string) => {
    const val = Array.isArray(items) ? (items[0] as SelectedItem).name : items;
    setReassignTo(val as string);
  };
  const handleCcSelect = (items: SelectedItem[] | string) => {
    const val = Array.isArray(items) ? (items[0] as SelectedItem).name : items;
    setCcValue(val as string);
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded shadow space-y-6">
      {/* Instructions */}
      <div className="text-sm text-gray-700 space-y-1">
        <p className="font-semibold">
          By reassigning, you can ask others for comments about this task.
        </p>
        <p>
          The receiver can fill the form or leave a comment, but the task responsible remains you and only you can submit it finally.
        </p>
      </div>

      {/* Reassign To & Duration & Instruction */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <SelectOption
            label="Reassign To"
            options={reassignToOptions}
            selectedValue={reassignTo}
            onChange={v => setReassignTo(v as string)}
            showButton
            leftIcon={<IconProgressHelp stroke={1} />}
            allowCustom
            children={
              <RolePickerTabs
                onSelect={handleReassignSelect}
                onClose={() => {}}
              />
            }
          />
          <Input
            inputType="number"
            label="Allowed Duration (Days)"
            min={1}
            value={reassignDuration}
            onChange={v =>
              setReassignDuration(typeof v === "number" ? v : 1)
            }
            leftIcon={<IconAlarm stroke={1} />}
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-bold mb-1">Reassign Instruction</label>
          <Combobox
            options={instructionOptions}
            value={reassignInstruction}
            onChange={setReassignInstruction}
            placeholder="انتخاب دستور..."
            label=""
          />
        </div>
      </div>

      {/* CC & CC Duration & CC Instruction */}
      <div className="flex flex-col md:flex-row gap-4 pt-4">
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <SelectOption
            label="Send also a Carbon Copy to"
            options={ccOptions}
            selectedValue={ccValue}
            onChange={v => setCcValue(v as string)}
            showButton
            leftIcon={<IconCopy stroke={1} />}
            allowCustom
            children={
              <RolePickerTabs
                onSelect={handleCcSelect}
                onClose={() => {}}
              />
            }
          />
          <Input
            inputType="number"
            label="Allowed Duration (Days)"
            min={1}
            value={ccDuration}
            onChange={v =>
              setCcDuration(typeof v === "number" ? v : 1)
            }
            leftIcon={<IconAlarm stroke={1} />}
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-bold mb-1">CC Instruction</label>
          <Combobox
            options={instructionOptions}
            value={ccInstruction}
            onChange={setCcInstruction}
            placeholder="انتخاب دستور..."
            label=""
          />
        </div>
      </div>

      {/* Add/Delete CC rows */}
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

      {/* CC table */}
      <DataTable
        columnDefs={ccColumnDefs}
        rowData={ccRows}
        rowSelectionType="multiple"
        onSelectionChanged={onCCSelectionChanged}
        onRowDoubleClick={handleCCRowDoubleClick}
        showSearch={false}
        containerHeight="250px"
      />

      {/* Reassign / Cancel */}
      <div className="flex gap-2">
        <Button onClick={handleReassign} color="blue" className="flex-1">
          Reassign
        </Button>
        <Button onClick={handleCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Reassign;
