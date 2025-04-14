// components/AppTabs.tsx
import { Tabs } from "@mantine/core";
import Consult from "../../TaskManageMent/Consult";
import ReAssign from "../../TaskManageMent/ReAssign";
import {
  IconView360Arrow,
  IconArrowForwardUp,
  IconPlayerTrackNext,
  IconCategory,
  IconFlag,
  IconRotate,
} from "@tabler/icons-react";
import Forward from "../../TaskManageMent/Forward";
import Account from "../../Profile/Account";
import Category from "../../TaskManageMent/Category";
import Expedit from "../../TaskManageMent/Expedit";
import FollowUp from "../../TaskManageMent/Followup";
import Alert from "../../TaskManageMent/Alert";

export default function AppTabs() {
  return (
    <Tabs color="red" variant="outline" defaultValue="FollowUp">
      <Tabs.List>
        <Tabs.Tab value="Category" leftSection={<IconCategory stroke={2} />}>
          Category
        </Tabs.Tab>
        <Tabs.Tab value="FollowUp" leftSection={<IconFlag stroke={2} />}>
          FollowUp
        </Tabs.Tab>
        <Tabs.Tab
          value="Alert"
          leftSection={<IconPlayerTrackNext stroke={2} />}
        >
          Alert
        </Tabs.Tab>
        <Tabs.Tab value="Expedit" leftSection={<IconRotate stroke={2} />}>
          Expedit
        </Tabs.Tab>
        <Tabs.Tab value="Consult" leftSection={<IconView360Arrow stroke={2} />}>
          Consult
        </Tabs.Tab>
        <Tabs.Tab
          value="Reassign"
          leftSection={<IconArrowForwardUp stroke={2} />}
        >
          Reassign
        </Tabs.Tab>
        <Tabs.Tab
          value="Forward"
          leftSection={<IconPlayerTrackNext stroke={2} />}
        >
          Forward
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Category" pt="xs">
        <Category />
      </Tabs.Panel>

      <Tabs.Panel value="FollowUp" pt="xs">
        <FollowUp />
      </Tabs.Panel>

      <Tabs.Panel value="Alert" pt="xs">
        <Alert />
      </Tabs.Panel>

      <Tabs.Panel value="Expedit" pt="xs">
        <Expedit />
      </Tabs.Panel>

      <Tabs.Panel value="Consult" pt="xs">
        <Consult />
      </Tabs.Panel>

      <Tabs.Panel value="Reassign" pt="xs">
        <ReAssign />
      </Tabs.Panel>

      <Tabs.Panel value="Forward" pt="xs">
        <Forward />
      </Tabs.Panel>
    </Tabs>
  );
}
