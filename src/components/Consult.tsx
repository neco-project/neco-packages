// Consult.tsx
import React, { useState } from "react";
import { Button } from "@mantine/core";
import {
  IconProgressHelp,
  IconAlarm,
  IconCopy,
} from "@tabler/icons-react";
import NumberInput from "./NumberInput"; // فرض کنید کامپوننت NumberInput شما همان LeftIconNumberInput است.
import SelectOption, { Option } from "./SelectOption";  
import DataTable from "../TableDynamic/DataTable";                    
import ModalSelector from "./ModalSelector/Main"; // کامپوننت ModalSelector که شامل DynamicModal می‌باشد

// داده‌های نمونه برای SelectOption در Consult with
const consultWithOptions: Option[] = [
  { value: "PersonA", label: "Person A" },
  { value: "PersonB", label: "Person B" },
  { value: "PersonC", label: "Person C" },
];

// گزینه‌های Instruction برای هر دو فیلد
const instructionOptions: Option[] = [
  { value: "جهت تهیه پاسخ", label: "جهت تهیه پاسخ" },
  { value: "جهت پیگیری", label: "جهت پیگیری" },
  { value: "جهت اقدام مقتضی", label: "جهت اقدام مقتضی" },
  { value: "جهت استحضار", label: "جهت استحضار" },
  { value: "جهت اخطار", label: "جهت اخطار" },
  { value: "درخواست راهنمایی", label: "درخواست راهنمایی" },
  { value: "درخواست مشاوره", label: "درخواست مشاوره" },
  { value: "درخواست اعلام نظر", label: "درخواست اعلام نظر" },
];

// داده‌های نمونه برای CC در Send also a Carbon Copy to
const ccOptions: Option[] = [
  { value: "CCUser1", label: "CC User 1" },
  { value: "CCUser2", label: "CC User 2" },
  { value: "CCUser3", label: "CC User 3" },
];

// نوع داده برای سطرهای جدول Carbon Copy (CC)
interface CCRow {
  id: string;
  cc: string;          // نام گیرنده
  instruction: string; // دستور
}

const Consult: React.FC = () => {
  // State مربوط به فرم بخش "Consult"
  const [consultWith, setConsultWith] = useState<string>("");
  const [consultDuration, setConsultDuration] = useState<number>(3);
  const [consultInstruction, setConsultInstruction] = useState<string>("");

  // State مربوط به بخش "CC"
  const [ccValue, setCcValue] = useState<string>("");
  const [ccDuration, setCcDuration] = useState<number>(3);
  const [ccInstructionValue, setCcInstructionValue] = useState<string>("");

  // داده‌های جدول CC
  const [ccRows, setCcRows] = useState<CCRow[]>([]);
  const [selectedCcRows, setSelectedCcRows] = useState<CCRow[]>([]);

  // ستون‌های جدول CC
  const ccColumnDefs = [
    { headerName: "CC", field: "cc", sortable: true },
    { headerName: "Instruction", field: "instruction", sortable: true },
  ];

  // مدیریت نمایش ModalSelector
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleModalSelect = (selected: any[]) => {
    // به عنوان مثال، مقادیر انتخاب شده را به عنوان consultWith تنظیم می‌کنیم
    if (selected.length > 0) {
      setConsultWith(selected[0].name);
    }
    closeModal();
  };

  // افزودن ردیف جدید به جدول CC
  const handleAddCCRow = () => {
    if (!ccValue || !ccInstructionValue) return;
    const newRow: CCRow = {
      id: Date.now().toString(),
      cc: ccValue,
      instruction: ccInstructionValue,
    };
    setCcRows((prev) => [...prev, newRow]);
    // پاکسازی مقادیر ورودی CC
    setCcValue("");
    setCcInstructionValue("");
  };

  // حذف ردیف(های) انتخاب‌شده از جدول CC
  const handleDeleteCCRow = () => {
    if (selectedCcRows.length === 0) return;
    const idsToDelete = selectedCcRows.map((row) => row.id);
    setCcRows((prev) => prev.filter((r) => !idsToDelete.includes(r.id)));
  };

  // رویداد تغییر انتخاب در جدول CC
  const onCCSelectionChanged = (rows: any[]) => {
    setSelectedCcRows(rows as CCRow[]);
  };

  // رویداد دوبل‌کلیک روی ردیف جدول CC (در صورت نیاز)
  const handleCCRowDoubleClick = (data: any) => {
    console.log("Double clicked row =>", data);
  };

  // کلیک دکمه Consult
  const handleConsult = () => {
    console.log("Consult with:", consultWith);
    console.log("Consult duration:", consultDuration);
    console.log("Consult instruction:", consultInstruction);
    console.log("CC:", ccRows);
    console.log("CC duration:", ccDuration);
  };

  // کلیک دکمه Cancel
  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-white rounded shadow space-y-6">
      {/* نمایش ModalSelector در بالای صفحه (در داخل دیالوگ DynamicModal) */}
      <ModalSelector
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleModalSelect}
      />

      {/* توضیحات بالای فرم */}
      <div className="text-sm text-gray-700 space-y-1">
        <p className="font-semibold">
          By consulting, you can ask others comments about this task.
        </p>
        <p>
          The receiver can fill the form or leave a comment, but the task responsible is still you and only you can submit it finally.
        </p>
      </div>

      {/* سطر اول: ستون چپ (Consult with + Allowed Duration) زیر هم، ستون راست (Consult Instruction) */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* ستون چپ */}
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <SelectOption
            label="Consult with"
            name="consultWith"
            options={consultWithOptions}
            selectedValue={consultWith}
            onChange={(val) => setConsultWith(val as string)}
            multiple={false}
            allowCustom
            showButton
            onButtonClick={openModal}
            leftIcon={<IconProgressHelp size={18} />}
          />

          <NumberInput
            label="Allowed Duration (Days)"
            min={1}
            value={consultDuration}
            hideControls
            leftIcon={<IconAlarm size={18} />}
          />
        </div>

        {/* ستون راست */}
        <div className="w-full md:w-1/2">
          <SelectOption
            label="Consult Instruction"
            name="consultInstruction"
            options={instructionOptions}
            selectedValue={consultInstruction}
            onChange={(val) => setConsultInstruction(val as string)}
            multiple={false}
            allowCustom
            leftIcon={<IconProgressHelp size={18} />}
          />
        </div>
      </div>

      {/* سطر دوم: ستون چپ (Send also a Carbon Copy to + Allowed Duration) زیر هم، ستون راست (CC Instruction) */}
      <div className="flex flex-col md:flex-row gap-4 pt-4">
        {/* ستون چپ */}
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
            leftIcon={<IconCopy size={18} />}
          />

          <NumberInput
            label="Allowed Duration (Days)"
            min={1}
            value={ccDuration}
            hideControls
            leftIcon={<IconAlarm size={18} />}
          />
        </div>

        {/* ستون راست */}
        <div className="w-full md:w-1/2">
          <SelectOption
            label="CC Instruction"
            name="ccInstructionValue"
            options={instructionOptions}
            selectedValue={ccInstructionValue}
            onChange={(val) => setCcInstructionValue(val as string)}
            multiple={false}
            allowCustom
            leftIcon={<IconProgressHelp size={18} />}
          />
        </div>
      </div>

      {/* دکمه‌های Add / Delete برای جدول CC */}
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

      {/* جدول Carbon Copy */}
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

      {/* دکمه‌های نهایی */}
      <div className="flex justify-end gap-2">
        <Button onClick={handleConsult} variant="filled" color="blue" > 
          Consult
        </Button>
        <Button onClick={handleCancel} variant="outline" color="gray">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Consult;
