"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Bell, Search, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/contexts/user";

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = Cookies.get("analogueshiftsCmsToken");
  const { logout } = useAuth();
  const { user } = useUser();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      redirect("/");
    }
  }, [token]);

  return (
    <SidebarProvider className="w-full min-h-screen bg-[#F7FAFA]">
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen bg-[#F7FAFA] overflow-hidden">
        {/* Top Navbar */}
        <header className="w-full h-16 bg-white border-b border-[#DCE9E9] sticky top-0 z-40 flex items-center px-4 gap-4 shadow-sm">
          <SidebarTrigger className="text-[#5A7A7A] hover:text-[#1C7272] transition-colors" />

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A7A7A]" />
            <input
              type="text"
              placeholder="Search jobs, candidates, users..."
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-[#DCE9E9] bg-[#F7FAFA] text-sm text-[#0D1F1F] placeholder:text-[#5A7A7A] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Notification Bell */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F7FAFA] border border-transparent hover:border-[#DCE9E9] transition-all">
              <Bell className="w-4.5 h-4.5 text-[#5A7A7A]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F5A623] rounded-full border-2 border-white" />
            </button>

            {/* User Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 h-9 px-3 rounded-lg hover:bg-[#F7FAFA] border border-transparent hover:border-[#DCE9E9] transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#1C7272] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {user?.email?.slice(0, 1)?.toUpperCase() ?? "A"}
                </div>
                <span className="text-sm font-medium text-[#0D1F1F] hidden sm:block max-w-[100px] truncate">
                  {user?.user_profile?.first_name ?? user?.username ?? "Admin"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5A7A7A]" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-[#DCE9E9] shadow-lg py-1 z-50">
                  <a
                    href="/admin/profile"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0D1F1F] hover:bg-[#F7FAFA] transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4 text-[#5A7A7A]" />
                    Profile
                  </a>
                  <a
                    href="/admin/settings"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0D1F1F] hover:bg-[#F7FAFA] transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-[#5A7A7A]" />
                    Settings
                  </a>
                  <hr className="my-1 border-[#DCE9E9]" />
                  <button
                    onClick={() => { setUserMenuOpen(false); logout(); }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
