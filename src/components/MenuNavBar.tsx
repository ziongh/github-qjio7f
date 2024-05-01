import classes from './Navbar.module.css';
import { AppShell, NavLink, ScrollArea } from '@mantine/core';
import { Link, useRouterState } from '@tanstack/react-router';
import { memo } from 'react';
import { NavItem } from '../nav-item';

// eslint-disable-next-line react/display-name
export const NavItemComponent = memo(
  ({ item, path, depth = 0 }: { item: NavItem; path: any; depth?: number }) => {
    return (
      <NavLink
        key={item.label}
        href={item.link}
        to={item.link}
        component={Link}
        label={item.label}
        active={
          item.link === path.location.pathname &&
          !item.links?.some(
            (subitem) => subitem.link === path.location.pathname
          )
        }
        childrenOffset={28 - depth * 4}
        defaultOpened={item.links?.some(
          (subitem) => subitem.link === path.location.pathname
        )}
      >
        {item.links?.map((subitem) => (
          <NavItemComponent
            key={subitem.label}
            item={subitem}
            path={path}
            depth={depth + 1}
          />
        ))}
      </NavLink>
    );
  },
  (prevProps, nextProps) => {
    // Add your custom comparison logic here
    return prevProps.path === nextProps.path;
  }
);

export interface MenuNavBarProps {
  data: NavItem[];
}

export function MenuNavBar({ data }: MenuNavBarProps) {
  const path = useRouterState();
  return (
    <AppShell.Section grow component={ScrollArea}>
      <div className={classes.linksInner}>
        {data.map((item) => (
          <NavItemComponent key={item.label} item={item} path={path} />
        ))}
      </div>
    </AppShell.Section>
  );
}
