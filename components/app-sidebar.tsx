'use client';

import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  CommandIcon,
} from 'lucide-react';
import Link from 'next/link';

const data = {
  navMain: [
    {
      title: '캐릭터',
      url: '/dashboard/character',
      icon: <LayoutDashboardIcon />,
    },
    {
      title: '레이드',
      url: '/dashboard/raid',
      icon: <ListIcon />,
    },
    {
      title: '아이템',
      url: '/dashboard/item',
      icon: <ChartBarIcon />,
    },
    {
      title: '인챈트',
      url: '/dashboard/enchant',
      icon: <FolderIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className='data-[slot=sidebar-menu-button]:p-1.5!'
              render={<Link href='/dashboard' />}
            >
              <CommandIcon className='size-5!' />
              <span className='text-base font-semibold'>망스비 대시보드</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
