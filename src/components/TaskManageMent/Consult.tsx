// Consult.tsx
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

const consultWithOptions: Option[] = [
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

export const Consult: React.FC = () => {
  // Consult form state
  const [consultWith, setConsultWith]           = useState<string>("");
  const [consultDuration, setConsultDuration]   = useState<number>(3);
  const [consultInstruction, setConsultInstruction] = useState<string>("");

  // CC form state
  const [ccValue, setCcValue]               = useState<string>("");
  const [ccDuration, setCcDuration]         = useState<number>(3);
  const [ccInstruction, setCcInstruction]   = useState<string>("");

  // CC rows and selection
  const [ccRows, setCcRows]                 = useState<CCRow[]>([]);
  const [selectedCcRows, setSelectedCcRows] = useState<CCRow[]>([]);

  const noteMaxLength = 400;

  const ccColumnDefs = [
    { headerName: "CC", field: "cc", sortable: true },
    { headerName: "Instruction", field: "instruction", sortable: true },
  ];

  // Add a new CC row
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

  // Delete selected CC rows
  const handleDeleteCCRow = () => {
    const ids = selectedCcRows.map(r => r.id);
    setCcRows(prev => prev.filter(r => !ids.includes(r.id)));
    setSelectedCcRows([]);
  };

  const onCCSelectionChanged = (rows: any[]) => {
    setSelectedCcRows(rows as CCRow[]);
  };

  const handleCCRowDoubleClick = (row: any) => {
    console.log("Double clicked CC row:", row);
  };

  // When user confirms "Consult"
  const handleConsult = () => {
    console.log({
      consultWith,
      consultDuration,
      consultInstruction,
      ccRows,
      ccDuration,
    });
  };

  // Cancel
  const handleCancel = () => {
    console.log("Consult cancelled");
  };

  // Handlers for RolePickerTabs selections
  const handleConsultWithSelect = (items: SelectedItem[] | string) => {
    const val = Array.isArray(items) ? (items[0] as SelectedItem).name : items;
    setConsultWith(val as string);
  };
  const handleCcSelect = (items: SelectedItem[] | string) => {
    const val = Array.isArray(items) ? (items[0] as SelectedItem).name : items;
    setCcValue(val as string);
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow space-y-6">
      {/* Instructions */}
      <div className="text-sm text-gray-700 space-y-1">
        <p className="font-semibold">
          By consulting, you can ask others comments about this task.
        </p>
        <p>
          The receiver can fill the form or leave a comment, but the task responsible is still you and only you can submit it finally.
        </p>
      </div>

      {/* Consult With & Duration & Instruction */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <SelectOption
            label="Consult with"
            options={consultWithOptions}
            selectedValue={consultWith}
            onChange={v => setConsultWith(v as string)}
            showButton
            children={
              <RolePickerTabs
                onSelect={handleConsultWithSelect}
                onClose={() => {}}
              />
            }
            leftIcon={<IconProgressHelp />}
            allowCustom
          />
          <Input
            inputType="number"
            label="Allowed Duration (Days)"
            min={1}
            value={consultDuration}
            onChange={v => setConsultDuration(typeof v === "number" ? v : 1)}
            leftIcon={<IconAlarm />}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Combobox
            label="Consult Instruction"
            options={instructionOptions}
            value={consultInstruction}
            onChange={setConsultInstruction}
            placeholder="انتخاب دستور..."
          />
        </div>
      </div>

      {/* CC & CC Duration & CC Instruction */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <SelectOption
            label="Send also a Carbon Copy to"
            options={ccOptions}
            selectedValue={ccValue}
            onChange={v => setCcValue(v as string)}
            showButton
            children={
              <RolePickerTabs
                onSelect={handleCcSelect}
                onClose={() => {}}
              />
            }
            leftIcon={<IconCopy size={18} />}
            allowCustom
          />
          <Input
            inputType="number"
            label="Allowed Duration (Days)"
            min={1}
            value={ccDuration}
            onChange={v => setCcDuration(typeof v === "number" ? v : 1)}
            leftIcon={<IconAlarm size={18} />}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Combobox
            label="CC Instruction"
            options={instructionOptions}
            value={ccInstruction}
            onChange={setCcInstruction}
            placeholder="انتخاب دستور..."
          />
        </div>
      </div>

      {/* Add / Delete CC rows */}
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

      {/* CC rows table */}
      <DataTable
        columnDefs={ccColumnDefs}
        rowData={ccRows}
        onRowDoubleClick={handleCCRowDoubleClick}
        rowSelectionType="multiple"
        onSelectionChanged={onCCSelectionChanged}
        showSearch={false}
        containerHeight="250px"
      />

      {/* Consult / Cancel buttons */}
      <div className="flex gap-2">
        <Button onClick={handleConsult} color="blue" className="flex-1">
          Consult
        </Button>
        <Button onClick={handleCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Consult;
