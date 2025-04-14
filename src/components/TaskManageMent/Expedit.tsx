import React, { useState } from "react";
import {
  Button,
  Checkbox,
  NativeSelect,
  Textarea,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import { IconDots, IconSearch } from "@tabler/icons-react";
import AccordionComponent from "../Accordion";
import GridComponent from "../GridComponent";
import TableSelector from "../Common/TableDynamic/TableSelector";
import ModalSelector from "../Common/ModalSelector/Main";

const Expedit = () => {
  const [selectedExpeditor, setSelectedExpeditor] = useState<string>("");
  const [interval, setInterval] = useState<number>(1);
  const [note, setNote] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [expedites, setExpedites] = useState<any[]>([]);

  const [isModalOpen, setIsOpenModal] = useState(false);
  // const [accordionOpen, setAccordionOpen] = useState(true);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleModalSelect = () => {
    alert("Selected");
    setIsOpenModal(false);
  };

  const expeditorOptions = [
    { value: "john", label: "John" },
    { value: "sara", label: "Sara" },
    { value: "admin", label: "Admin" },
  ];

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
    // Reset
    setSelectedExpeditor("");
    setInterval(1);
    setNote("");
    setIsActive(true);
  };

  const handleOnDoubleClick = (data: any) => {
    setExpedites(expedites.filter((r) => r !== data));
  };

  const handleDelete = (row: any) => {
    setExpedites(expedites.filter((r) => r !== row));
  };

  return (
    <div className="p-4 w-full bg-white rounded shadow">
      <ModalSelector
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleModalSelect}
      />
      <h2 className="text-sm font-semibold mb-1">Existing Expedites:</h2>

      <TableSelector
        columnDefs={[
          { headerName: "Expeditor", field: "expeditor" },
          { headerName: "Note", field: "note" },
          { headerName: "Interval (day)", field: "interval" },
          { headerName: "State", field: "state" },
        ]}
        rowData={expedites}
        height={500}
        onDeleteButtonClick={handleDelete}
        isSelectDisabled={true}
        onRowDoubleClick={(e: any) => handleOnDoubleClick(e)}
      />

      <AccordionComponent header="New">
        <GridComponent gridCols={2} gridRows={1}>
          <div>
            <div className="flex flex-col gap-1">
              <div className="flex items-end gap-1">
                <div className="w-full">
                  <NativeSelect
                    label="Expeditor"
                    data={expeditorOptions}
                    value={selectedExpeditor}
                    onChange={(e) => setSelectedExpeditor(e.target.value)}
                  />
                </div>
                <ActionIcon color="blue" onClick={() => setIsOpenModal(true)}>
                  <IconDots size={20} />
                </ActionIcon>
              </div>
              <Checkbox
                label="Active"
                checked={isActive}
                onChange={(e) => setIsActive(e.currentTarget.checked)}
                className="mt-1"
              />
            </div>
            <div className="flex gap-4 mt-2">
              <Button color="blue" className="w-28" onClick={handleAdd}>
                Add
              </Button>
              <Button variant="outline" className="w-28">
                Cancel
              </Button>
            </div>
          </div>
          <div>
            <TextInput
              label="Interval (day)"
              type="number"
              min={1}
              max={400}
              value={interval}
              onChange={(e) => setInterval(parseInt(e.target.value))}
            />

            <Textarea
              label="Note"
              maxLength={400}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              autosize
              minRows={2}
            />
          </div>
        </GridComponent>
      </AccordionComponent>

      <div className="flex justify-center mt-4">
        <Button color="blue" fullWidth>
          Exit
        </Button>
      </div>
    </div>
  );
};

export default Expedit;
