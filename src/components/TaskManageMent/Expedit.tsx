import React, { useState } from "react";
import { Accordion, Button, Checkbox, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TableSelector from "../Common/TableDynamic/TableSelector";
import AccordionComponent from "../Accordion";
import Input from "../Common/InputComponent"; // کامپوننت Input که از TextInput, NumberInput, و Textarea پشتیبانی می‌کند
import SelectOption, { Option } from "../Common/SelectOption";
import RolePickerTabs from "../Common/RolesGroups/RolePickerTabs";

const expeditorOptions: Option[] = [
  { value: "john", label: "John" },
  { value: "sara", label: "Sara" },
  { value: "admin", label: "Admin" },
];

const Expedit = () => {
  // استیت‌های مربوط به فرم Expedit
  const [selectedExpeditor, setSelectedExpeditor] = useState<string>("");
  const [interval, setInterval] = useState<number>(1);
  const [note, setNote] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [expedites, setExpedites] = useState<any[]>([]);

  // ثابت تعداد حداکثر کاراکتر برای Note
  const noteMaxLength = 400;

  // مدیریت مودال انتخاب Expeditor با RolePickerTabs
  const [rolePickerOpened, { open: openRolePicker, close: closeRolePicker }] = useDisclosure(false);

  // رویداد افزودن Expedit جدید
  const handleAdd = () => {
    setExpedites([
      ...expedites,
      {
        expeditor: selectedExpeditor,
        interval,
        note,
        state: isActive ? "Active" : "Inactive",
      },
    ]);
    // ریست مقادیر فرم
    setSelectedExpeditor("");
    setInterval(1);
    setNote("");
    setIsActive(true);
  };

  // حذف یک سطر از لیست
  const handleDelete = (row: any) => {
    setExpedites(expedites.filter((r) => r !== row));
  };

  // دابل کلیک برای حذف
  const handleOnDoubleClick = (data: any) => {
    setExpedites(expedites.filter((r) => r !== data));
  };

  // وقتی در RolePickerTabs گزینه‌ای انتخاب شد:
  const handleModalSelect = (selectedExp: any) => {
    if (typeof selectedExp === "string") {
      setSelectedExpeditor(selectedExp);
    }
    closeRolePicker();
  };

  return (
    <div className="p-4 w-full bg-white rounded shadow">
      <h2 className="text-sm font-semibold mb-2">Existing Expedites:</h2>
      <TableSelector
        columnDefs={[
          { headerName: "Expeditor", field: "expeditor" },
          { headerName: "Interval (day)", field: "interval" },
          { headerName: "Note", field: "note" },
          { headerName: "State", field: "state" },
        ]}
        rowData={expedites}
        height={500}
        onRowDoubleClick={handleOnDoubleClick}
        onDeleteButtonClick={handleDelete}
      />

      <AccordionComponent header="New">
        <div className="p-4 border rounded">
          <div className="flex flex-col md:flex-row gap-16">
            {/* ستون سمت چپ (Expeditor و دکمه‌ها) */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <SelectOption
                label="Expeditor"
                name="expeditor"
                options={expeditorOptions}
                selectedValue={selectedExpeditor}
                onChange={(val) => setSelectedExpeditor(val as string)}
                multiple={false}
                showButton={true}
                onButtonClick={openRolePicker} // با کلیک روی "..."، مودال باز می‌شود
              />
              <Checkbox
                label="Active"
                checked={isActive}
                onChange={(e) => setIsActive(e.currentTarget.checked)}
                className="mt-1"
              />
              <div className="flex gap-4 mt-4">
                <Button fullWidth color="blue" onClick={handleAdd}>
                  Add
                </Button>
                <Button
                  fullWidth
                  variant="outline"
                  onClick={() => {
                    setSelectedExpeditor("");
                    setInterval(1);
                    setNote("");
                    setIsActive(true);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>

            {/* ستون سمت راست (Interval, Note) */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {/* فیلد عددی Interval */}
              <Input
                inputType="number"
                label="Interval (day)"
                value={interval}
                onChange={
                  ((v: number | undefined) => setInterval(v ?? 0)) as any
                }
              />
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium">Note</label>
                <Input
                  inputType="textarea"
                  label=""
                  placeholder="Enter note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={noteMaxLength}
                />
                <div className="text-right text-sm text-gray-500">
                  {note.length}/{noteMaxLength}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccordionComponent>

      {/* مودال انتخاب Expeditor با کامپوننت RolePickerTabs */}
      <Modal opened={rolePickerOpened} onClose={closeRolePicker} withCloseButton={false}>
        <RolePickerTabs onSelect={handleModalSelect} onClose={closeRolePicker} />
      </Modal>

      <div className="flex justify-center mt-4">
        <Button fullWidth color="blue">
          Exit
        </Button>
      </div>
    </div>
  );
};

export default Expedit;
