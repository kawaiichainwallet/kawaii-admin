"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronRight, Wallet } from "lucide-react";
import { navigationConfig } from "@/config/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sidebar-primary-foreground">
                  <Wallet className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    KawaiiChain
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    管理后台
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>导航菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationConfig.map((item) =>
                item.children ? (
                  <Collapsible key={item.title} defaultOpen={isActive(item.href)}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={isActive(item.href) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                        >
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant={item.urgent ? "destructive" : "secondary"}
                              className={`ml-auto ${item.urgent ? "animate-pulse" : ""}`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                          <ChevronRight className="ml-auto size-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  href={subItem.href}
                                  className={
                                    isActive(subItem.href)
                                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                      : ""
                                  }
                                >
                                  <subItem.icon className="size-4" />
                                  <span>{subItem.title}</span>
                                  {subItem.badge && (
                                    <Badge
                                      variant={subItem.urgent ? "destructive" : "secondary"}
                                      className={`ml-auto ${subItem.urgent ? "animate-pulse" : ""}`}
                                    >
                                      {subItem.badge}
                                    </Badge>
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={
                          isActive(item.href)
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : ""
                        }
                      >
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant={item.urgent ? "destructive" : "secondary"}
                            className={`ml-auto ${item.urgent ? "animate-pulse" : ""}`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-sidebar-foreground/70">
              <span>版本 v1.0.0</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}