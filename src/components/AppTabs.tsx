// components/AppTabs.tsx
import { Tabs } from '@mantine/core'
import Consult from './Consult'
import { IconView360Arrow  , IconArrowForwardUp ,IconPlayerTrackNext} from '@tabler/icons-react'


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
        Reassign tab content
      </Tabs.Panel>

      <Tabs.Panel value="Forward" pt="xs">
        Forward tab content
      </Tabs.Panel>
    </Tabs>
  )
}
