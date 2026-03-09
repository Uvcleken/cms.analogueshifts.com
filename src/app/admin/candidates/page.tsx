"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Mail,
  MoreHorizontal,
  MapPin,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { mockCandidates } from "@/lib/mock-data";
import { CandidateStatus } from "@/types/schema";

const statusConfig: Record<CandidateStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "#22A87A", bg: "#E7F8F2" },
  inactive: { label: "Inactive", color: "#5A7A7A", bg: "#F7FAFA" },
  hired: { label: "Hired", color: "#1C7272", bg: "#EEF5F5" },
  blacklisted: { label: "Blacklisted", color: "#E84545", bg: "#FEEDED" },
};

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = mockCandidates.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((c) => c.id)));
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D1F1F]" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Candidates
          </h1>
          <p className="text-sm text-[#5A7A7A] mt-1">{filtered.length} candidates in database</p>
        </div>
        {selected.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#5A7A7A]">{selected.size} selected</span>
            <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#DCE9E9] text-sm text-[#5A7A7A] hover:bg-[#F7FAFA] transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#DCE9E9] text-sm text-[#5A7A7A] hover:bg-[#F7FAFA] transition-colors">
              <Mail className="w-3.5 h-3.5" /> Email
            </button>
            <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#DCE9E9] text-sm text-[#5A7A7A] hover:bg-[#F7FAFA] transition-colors">
              <ChevronDown className="w-3.5 h-3.5" /> Change Status
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A7A7A]" />
          <input
            type="text"
            placeholder="Search by name, skill, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-[#DCE9E9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#5A7A7A]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="hired">Hired</option>
            <option value="inactive">Inactive</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#DCE9E9] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#DCE9E9] bg-[#F7FAFA]">
                <th className="px-5 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="rounded border-[#DCE9E9] accent-[#1C7272]"
                  />
                </th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Candidate</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Skills</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Location</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Experience</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Applied Jobs</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="border-b border-[#DCE9E9] last:border-0 hover:bg-[#F7FAFA] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.has(candidate.id)}
                      onChange={() => toggleSelect(candidate.id)}
                      className="rounded border-[#DCE9E9] accent-[#1C7272]"
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1C7272]/10 flex items-center justify-center text-[#1C7272] text-sm font-semibold flex-shrink-0">
                        {candidate.name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#0D1F1F]">{candidate.name}</p>
                        <p className="text-xs text-[#5A7A7A]">{candidate.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#EEF5F5] text-[#1C7272]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#5A7A7A]" />
                      <span className="text-sm text-[#5A7A7A]">{candidate.location}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#0D1F1F]">{candidate.experience_years} yrs</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#5A7A7A]" />
                      <span className="text-sm font-medium text-[#0D1F1F]">{candidate.applied_jobs}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ color: statusConfig[candidate.status].color, backgroundColor: statusConfig[candidate.status].bg }}
                    >
                      {statusConfig[candidate.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="px-3 py-1 text-xs font-medium text-[#1C7272] hover:bg-[#EEF5F5] rounded-lg transition-colors">
                        View
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
        {/* Pagination */}
        <div className="px-5 py-3.5 border-t border-[#DCE9E9] flex items-center justify-between">
          <p className="text-sm text-[#5A7A7A]">
            Showing {filtered.length} of {mockCandidates.length} candidates
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="h-8 px-3 rounded-lg border border-[#DCE9E9] text-sm text-[#5A7A7A] disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-[#0D1F1F] px-2">Page 1</span>
            <button
              disabled
              className="h-8 px-3 rounded-lg border border-[#DCE9E9] text-sm text-[#5A7A7A] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
