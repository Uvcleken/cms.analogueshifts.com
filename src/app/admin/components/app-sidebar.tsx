"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  UserCheck,
  GraduationCap,
  BookOpen,
  Award,
  Building2,
  UserCircle,
  Calendar,
  CreditCard,
  Settings,
  Shield,
  ClipboardList,
  LogOut,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const navGroups = [
  {
    label: "OVERVIEW",
    items: [
      { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "RECRUITMENT",
    items: [
      { title: "Jobs", url: "/admin/jobs", icon: Briefcase },
      { title: "Candidates", url: "/admin/candidates", icon: Users },
      { title: "Applications", url: "/admin/applications", icon: FileText },
      { title: "Direct Hire", url: "/admin/direct-hire", icon: UserCheck },
    ],
  },
  {
    label: "TRAINING",
    items: [
      { title: "Courses", url: "/admin/training", icon: GraduationCap },
      { title: "Enrollments", url: "/admin/enrollments", icon: BookOpen },
      { title: "Certificates", url: "/admin/certificates", icon: Award },
    ],
  },
  {
    label: "PEOPLE",
    items: [
      { title: "Employers", url: "/admin/employers", icon: Building2 },
      { title: "Talents", url: "/admin/candidates", icon: UserCircle },
      { title: "Users", url: "/admin/users", icon: Users },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { title: "Events", url: "/admin/events", icon: Calendar },
      { title: "Payments", url: "/admin/payments", icon: CreditCard },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { title: "Settings", url: "/admin/settings", icon: Settings },
      { title: "Roles & Permissions", url: "/admin/roles", icon: Shield },
      { title: "Audit Logs", url: "/admin/audit-logs", icon: ClipboardList },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="z-50 bg-[#0F4A4A] border-r-0"
    >
      <SidebarHeader className="px-4 py-5 bg-[#0F4A4A]">
        <Link href="https://www.analogueshifts.com" className="flex items-center gap-2">
          <Image
            className="block h-[28px] w-max"
            src="/nav-logo.svg"
            width={160}
            height={28}
            alt="AnalogueShifts Logo"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-[#0F4A4A] px-0 pb-4">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className="px-0 py-1">
            <SidebarGroupLabel className="px-4 text-[10px] font-semibold tracking-widest text-[#5A9A9A] uppercase mb-1">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title} className="px-2">
                      <SidebarMenuButton
                        asChild
                        className={`
                          relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                          transition-all duration-200 group
                          ${isActive
                            ? "bg-[#1C7272] text-white border-l-2 border-[#F5A623]"
                            : "text-[#A8C8C8] hover:bg-[#1C7272]/50 hover:text-white border-l-2 border-transparent"
                          }
                        `}
                        tooltip={item.title}
                      >
                        <a href={item.url}>
                          <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#F5A623]" : ""}`} />
                          <span>{item.title}</span>
                          {isActive && (
                            <ChevronRight className="ml-auto w-3.5 h-3.5 opacity-60" />
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="bg-[#0F4A4A] border-t border-[#1C7272] px-2 py-3 gap-1">
        <SidebarMenuItem className="list-none">
          <SidebarMenuButton
            asChild
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#A8C8C8] hover:bg-[#1C7272]/50 hover:text-white transition-all duration-200"
            tooltip="Help"
          >
            <a href="/admin/help">
              <HelpCircle className="w-4 h-4 flex-shrink-0" />
              <span>Help & Support</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem className="list-none">
          <SidebarMenuButton
            asChild
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#A8C8C8] hover:bg-red-900/40 hover:text-red-300 transition-all duration-200"
            tooltip="Logout"
          >
            <a onClick={logout} href="#">
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span>Log out</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
