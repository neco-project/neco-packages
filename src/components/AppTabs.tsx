// components/AppTabs.tsx
import { Tabs } from '@mantine/core'
import Consult from './Consult'
import ReAssign from './ReAssign'
import { IconView360Arrow  , IconArrowForwardUp ,IconPlayerTrackNext} from '@tabler/icons-react'
import Forward from './Forward'


export default function AppTabs() {
  return (
    <Tabs color="red" variant="outline" defaultValue="Consult">
      <Tabs.List>
        <Tabs.Tab value="Consult" leftSection={<IconView360Arrow stroke={1} />}>
          Consult
        </Tabs.Tab>
        <Tabs.Tab value="Reassign" leftSection={<IconArrowForwardUp stroke={1} />}>
          Reassign
        </Tabs.Tab>
        <Tabs.Tab value="Forward" leftSection={<IconPlayerTrackNext stroke={1} />}>
          Forward
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Consult" pt="xs">
        <Consult />
      </Tabs.Panel>

      <Tabs.Panel value="Reassign" pt="xs">
        <ReAssign/>
      </Tabs.Panel>

      <Tabs.Panel value="Forward" pt="xs">
        <Forward/>
      </Tabs.Panel>
    </Tabs>
  )
}
