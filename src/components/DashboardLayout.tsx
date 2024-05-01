import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MenuNavBar } from './MenuNavBar';
import { NavItem } from '../nav-item';
import { RouteContainer } from './RouteContainer';

const navItems: NavItem[] = [
  {
    label: 'Todo',
    icon: 'i-mdi-alarm text-orange-400',
    link: '/dashboard/todo',
  },
  {
    label: 'About',
    icon: 'i-mdi-alarm text-orange-400',
    link: '#',
    links: [
      {
        label: 'About 1',
        link: '/dashboard/about',
      },
      {
        label: 'About 2',
        link: '/dashboard/about',
      },
    ],
  },
];

export function DashBoardLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      layout="alt"
      zIndex={100}
      transitionDuration={500}
      transitionTimingFunction="ease"
      header={{
        height: 35,
      }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="sm"
    >
      <AppShell.Navbar p="md">
        <MenuNavBar data={navItems} />
      </AppShell.Navbar>
      <AppShell.Main>
        <RouteContainer />
      </AppShell.Main>
    </AppShell>
  );
}
