import React, { useState } from "react";
import {
  Button,
  TextInput,
  Textarea,
  NativeSelect,
  Table,
  Collapse,
} from "@mantine/core";
import TableSelector from "../Common/TableDynamic/TableSelector";

const TaskCategory = () => {
  const [categories, setCategories] = useState([
    { schedule: "2", field: "دیسکرت پیشنی", channel: "" },
    { schedule: "3", field: "3", channel: "" },
    { schedule: "4", field: "4", channel: "" },
    { schedule: "5", field: "5", channel: "" },
  ]);

  const categoryColumns = [
    { headerName: "Alert Sched", field: "schedule" },
    { headerName: "Field", field: "field" },
    { headerName: "Duration", field: "duration" },
    { headerName: "Sending ch", field: "channel" },
    { headerName: "Alert text", field: "text" },
    { headerName: "Receiver", field: "receiver" },
  ];

  const [isFormOpen, setIsFormOpen] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creatorPost, setCreatorPost] = useState("");

  const handleAddCategory = (e: any) => {
    setCategories([
      ...categories,
      { schedule: "asdf", field: "asdf", channel: creatorPost },
    ]);
    setName("");
    setDescription("");
    setCreatorPost("");
  };

  const handleDelete = () => {
    alert("Delete clicked");
  };

  const handleAssign = () => {
    alert("Assign clicked");
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full">
      <h1 className="text-sm font-semibold mb-2">Existing Task Categories:</h1>
      <TableSelector
        columnDefs={categoryColumns}
        rowData={categories}
        onDeleteButtonClick={handleDelete}
        isSelectDisabled={true}
        height={500}
        onRowDoubleClick={(e: any) => handleAddCategory(e)}
        onAssign={handleAssign}
      />

      <div className="mt-4">
        <Button variant="subtle" onClick={() => setIsFormOpen((prev) => !prev)}>
          {isFormOpen ? "Cancel" : "Add New Category"}
        </Button>
        <Collapse in={isFormOpen}>
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <TextInput
              label="Name"
              placeholder="Enter name"
              value={name}
              maxLength={50}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              label="Description"
              placeholder="Enter description"
              value={description}
              maxLength={150}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-3"
            />
            <NativeSelect
              label="Creator Post"
              data={["", "Admin", "User", "Manager"]}
              value={creatorPost}
              onChange={(e) => setCreatorPost(e.target.value)}
              className="mt-3"
            />
            <div className="flex gap-2 mt-4">
              <Button fullWidth onClick={handleAddCategory}>
                Add
              </Button>
              <Button
                fullWidth
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Collapse>
      </div>

      <Button fullWidth className="mt-4" color="blue">
        Exit
      </Button>
    </div>
  );
};

export default TaskCategory;
