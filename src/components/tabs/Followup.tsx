import React from "react";
import TableSelector from "../TableSelector";
import { Accordion } from "@mantine/core";

const FollowUp = () => {
  const columns = [
    // { headerName: "ID", field: "id" },
    { headerName: "Follow Up Type", field: "followUpType" },
    { headerName: "Form", field: "form" },
    { headerName: "Day", field: "day" },
    { headerName: "Sending Channel", field: "sendingChannel" },
  ];

  const data = [
    { id: 1, followUpType: "Ali", form: "ali@example.com", day:"Yesterday",sendingChannel:"SMS" },
    { id: 2, followUpType: "Sara", form: "sara@example.com", day:"Today",sendingChannel:"Email" },
    { id: 3, followUpType: "Reza", form: "reza@example.com", day:"Tommarow",sendingChannel:"Telegraph" },
  ];

  const handleDoubleClick = (row: any) => {
    alert("Double clicked: " + row.name);
  };

  const handleRowClick = (row: any) => {
    console.log("Row clicked:", row);
  };

  const handleSelectClick = (row: any) => {
    alert("Selected: " + row.name);
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow ">
      <h1 className="text-sm font-semibold mb-4">Existing Follow Ups: </h1>
      <TableSelector
        columnDefs={columns}
        rowData={data}
        onRowDoubleClick={handleDoubleClick}
        onRowClick={handleRowClick}
        onSelectButtonClick={handleSelectClick}
        isSelectDisabled={false}
      />

      <Accordion defaultValue="item-1" variant="filled" chevronPosition="left" >
            <Accordion.Item value="item-1">
              <Accordion.Control>New</Accordion.Control>
              <Accordion.Panel>This is the content of the first item</Accordion.Panel>
            </Accordion.Item>
          </Accordion>
    </div>
  );
};

export default FollowUp;
