import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              cn(
                'my-1',
                isActive
                  ? 'relative text-black font-bold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:animate-slide-down'
                  : 'relative text-gray-700 hover:text-black after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
              )
            }
          >
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {!!item.items && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <NavLink
                            to={subItem.url}
                            className={({ isActive }) =>
                              cn(
                                'my-1',
                                isActive
                                  ? 'relative text-blue-500 font-bold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full '
                                  : 'relative text-gray-700  after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full'
                              )
                            }
                          >
                            <span>{subItem.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </NavLink>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
