"use client";
import { useState } from "react";
import { Search, Filter, MoreHorizontal } from "lucide-react";
import { recentApplications } from "@/lib/mock-data";
import { ApplicationStatus } from "@/types/schema";

const statusConfig: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
  applied: { label: "Applied", color: "#3B9EE0", bg: "#EBF5FE" },
  shortlisted: { label: "Shortlisted", color: "#F5A623", bg: "#FEF6E9" },
  hired: { label: "Hired", color: "#22A87A", bg: "#E7F8F2" },
  rejected: { label: "Rejected", color: "#E84545", bg: "#FEEDED" },
};

const allApplications = [
  ...recentApplications,
  {
    id: "app-006",
    candidate_name: "Chibuzor Eze",
    candidate_avatar: null,
    candidate_email: "chibu.e@email.com",
    job_title: "iOS Developer",
    company: "PiggyVest",
    status: "applied" as ApplicationStatus,
    applied_date: "2024-03-05",
  },
  {
    id: "app-007",
    candidate_name: "Fatima Bello",
    candidate_avatar: null,
    candidate_email: "fatima.b@email.com",
    job_title: "Frontend Developer",
    company: "Cowrywise",
    status: "shortlisted" as ApplicationStatus,
    applied_date: "2024-03-04",
  },
  {
    id: "app-008",
    candidate_name: "Yemi Adebayo",
    candidate_avatar: null,
    candidate_email: "yemi.a@email.com",
    job_title: "Machine Learning Engineer",
    company: "Terragon Group",
    status: "applied" as ApplicationStatus,
    applied_date: "2024-03-03",
  },
];

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = allApplications.filter((app) => {
    const matchSearch =
      app.candidate_name.toLowerCase().includes(search.toLowerCase()) ||
      app.job_title.toLowerCase().includes(search.toLowerCase()) ||
      app.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = {
    all: allApplications.length,
    applied: allApplications.filter((a) => a.status === "applied").length,
    shortlisted: allApplications.filter((a) => a.status === "shortlisted").length,
    hired: allApplications.filter((a) => a.status === "hired").length,
    rejected: allApplications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0D1F1F]" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Applications
        </h1>
        <p className="text-sm text-[#5A7A7A] mt-1">{filtered.length} applications</p>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 bg-[#F7FAFA] border border-[#DCE9E9] rounded-xl p-1">
        {(["all", "applied", "shortlisted", "hired", "rejected"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === status
                ? "bg-white text-[#0D1F1F] shadow-sm"
                : "text-[#5A7A7A] hover:text-[#0D1F1F]"
            }`}
          >
            <span className="capitalize">{status === "all" ? "All" : statusConfig[status].label}</span>
            <span
              className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
              style={
                statusFilter === status && status !== "all"
                  ? { color: statusConfig[status].color, backgroundColor: statusConfig[status].bg }
                  : { color: "#5A7A7A", backgroundColor: "#DCE9E9" }
              }
            >
              {statusCounts[status]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A7A7A]" />
          <input
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-[#DCE9E9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
          />
        </div>
        <Filter className="w-4 h-4 text-[#5A7A7A]" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#DCE9E9] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[#DCE9E9] bg-[#F7FAFA]">
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Candidate</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Job Title</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Company</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Applied Date</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-[#DCE9E9] last:border-0 hover:bg-[#F7FAFA] transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1C7272]/10 flex items-center justify-center text-[#1C7272] text-xs font-semibold flex-shrink-0">
                        {app.candidate_name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#0D1F1F]">{app.candidate_name}</p>
                        <p className="text-xs text-[#5A7A7A]">{app.candidate_email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium text-[#0D1F1F]">{app.job_title}</td>
                  <td className="px-5 py-3.5 text-sm text-[#5A7A7A]">{app.company}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ color: statusConfig[app.status].color, backgroundColor: statusConfig[app.status].bg }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: statusConfig[app.status].color }}
                      />
                      {statusConfig[app.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#5A7A7A]">
                    {new Date(app.applied_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="px-3 py-1 text-xs font-medium text-[#1C7272] hover:bg-[#EEF5F5] rounded-lg transition-colors">
                        Review
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F7FAFA] transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-[#5A7A7A]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
