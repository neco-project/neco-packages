import React, { useState } from "react";
import { Button } from "@mantine/core";
import { IconProgressHelp, IconAlarm, IconCopy } from "@tabler/icons-react";
import Input from "./InputComponent";
import SelectOption, { Option } from "./SelectOption";
import Combobox from "./ComboBox";
import DataTable from "../TableDynamic/DataTable";
import ModalSelector from "./ModalSelector/Main";

const consultWithOptions: Option[] = [
  { value: "PersonA", label: "Person A" },
  { value: "PersonB", label: "Person B" },
  { value: "PersonC", label: "Person C" }
];

const ccOptions: Option[] = [
  { value: "CCUser1", label: "CC User 1" },
  { value: "CCUser2", label: "CC User 2" },
  { value: "CCUser3", label: "CC User 3" }
];

const instructionOptions = [
  "جهت تهیه پاسخ",
  "جهت پیگیری",
  "جهت اقدام مقتضی",
  "جهت استحضار",
  "جهت اخطار",
  "درخواست راهنمایی",
  "درخواست مشاوره",
  "درخواست اعلام نظر"
];

interface CCRow {
  id: string;
  cc: string;
  instruction: string;
}

const Reassign: React.FC = () => {
  const [consultWith, setConsultWith] = useState<string>("");
  const [consultDuration, setConsultDuration] = useState<number>(3);
  const [consultInstruction, setConsultInstruction] = useState<string>("");
  const [ccValue, setCcValue] = useState<string>("");
  const [ccDuration, setCcDuration] = useState<number>(3);
  const [ccInstruction, setCcInstruction] = useState<string>("");
  const [ccRows, setCcRows] = useState<CCRow[]>([]);
  const [selectedCcRows, setSelectedCcRows] = useState<CCRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleModalSelect = (selected: any[]) => {
    if (selected.length > 0) {
      setConsultWith(selected[0].name);
    }
    closeModal();
  };
  const handleAddCCRow = () => {
    if (!ccValue || !ccInstruction) return;
    const newRow: CCRow = {
      id: Date.now().toString(),
      cc: ccValue,
      instruction: ccInstruction
    };
    setCcRows(prev => [...prev, newRow]);
    setCcValue("");
    setCcInstruction("");
  };
  const handleDeleteCCRow = () => {
    if (selectedCcRows.length === 0) return;
    const idsToDelete = selectedCcRows.map(row => row.id);
    setCcRows(prev => prev.filter(r => !idsToDelete.includes(r.id)));
  };
  const onCCSelectionChanged = (rows: any[]) => {
    setSelectedCcRows(rows as CCRow[]);
  };
  const handleCCRowDoubleClick = (data: any) => {
    console.log("Double clicked row =>", data);
  };
  const handleConsult = () => {
    console.log("Reassign with:", consultWith);
    console.log("Reassign duration:", consultDuration);
    console.log("Reassign instruction:", consultInstruction);
    console.log("CC:", ccRows);
    console.log("CC duration:", ccDuration);
  };
  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const ccColumnDefs = [
    { headerName: "CC", field: "cc", sortable: true },
    { headerName: "Instruction", field: "instruction", sortable: true },
  ];

  return (
    <div className="w-full mx-auto p-4 bg-white rounded shadow space-y-6">
      <ModalSelector isOpen={isModalOpen} onClose={closeModal} onSelect={handleModalSelect} />
      <div className="text-sm text-gray-700 space-y-1">
        <p className="font-semibold">
          By consulting, you can ask others comments about this task.
        </p>
        <p>
          The receiver can fill the form or leave a comment, but the task responsible is still you and only you can submit it finally.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <SelectOption
            label="Reassign To"
            name="consultWith"
            options={consultWithOptions}
            selectedValue={consultWith}
            onChange={(val) => setConsultWith(val as string)}
            multiple={false}
            allowCustom
            showButton
            onButtonClick={openModal}
            leftIcon={<IconProgressHelp stroke={1} />}
          />
          <Input
            inputType="number"
            label="Allowed Duration (Days)"
            min={1}
            value={consultDuration}
            onChange={(val) =>
              setConsultDuration(typeof val === "number" ? val : 1)
            }
            leftIcon={<IconAlarm stroke={1} />}
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-bold text-left mb-1">
            Reassign Instruction
          </label>
          <Combobox
            options={instructionOptions}
            value={consultInstruction}
            onChange={setConsultInstruction}
            placeholder="انتخاب دستور..."
            label=""
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 pt-4">
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <SelectOption
            label="Send also a Carbon Copy to"
            name="ccValue"
            options={ccOptions}
            selectedValue={ccValue}
            onChange={(val) => setCcValue(val as string)}
            multiple={false}
            allowCustom
            showButton
            onButtonClick={openModal}
            leftIcon={<IconCopy stroke={1} />}
          />
          <Input
            inputType="number"
            label="Allowed Duration (Days)"
            min={1}
            value={ccDuration}
            onChange={(val) =>
              setCcDuration(typeof val === "number" ? val : 1)
            }
            leftIcon={<IconAlarm stroke={1} />}
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-bold text-left mb-1">
            CC Instruction
          </label>
          <Combobox
            options={instructionOptions}
            value={ccInstruction}
            onChange={setCcInstruction}
            placeholder="انتخاب دستور..."
            label=""
          />
        </div>
      </div>
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
        columnDefs={ccColumnDefs}
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
      <div className="flex gap-2">
        <Button onClick={handleConsult} variant="filled" color="blue" className="flex-1">
          Reassign
        </Button>
        <Button onClick={handleCancel} variant="outline" color="gray" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Reassign;
