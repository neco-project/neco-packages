import { Accordion } from "@mantine/core";
import React from "react";

interface AccordionComponentProps {
  header: String;
  children: any;
}
const AccordionComponent: React.FC<AccordionComponentProps> = ({
  header: headerOpen,
  children,
}) => {
  return (
    <Accordion variant="filled" chevronPosition="left">
      <Accordion.Item value="item-1">
        <Accordion.Control>{headerOpen}</Accordion.Control>
        <Accordion.Panel>{children}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionComponent;
