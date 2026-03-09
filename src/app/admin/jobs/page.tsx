"use client";
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  MapPin,
  Users,
  DollarSign,
  X,
} from "lucide-react";
import { mockJobs } from "@/lib/mock-data";
import { Job, JobStatus, JobType } from "@/types/schema";

const statusConfig: Record<JobStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "#22A87A", bg: "#E7F8F2" },
  closed: { label: "Closed", color: "#E84545", bg: "#FEEDED" },
  draft: { label: "Draft", color: "#5A7A7A", bg: "#F7FAFA" },
};

const typeConfig: Record<JobType, { color: string; bg: string }> = {
  Remote: { color: "#1C7272", bg: "#EEF5F5" },
  Hybrid: { color: "#F5A623", bg: "#FEF6E9" },
  Onsite: { color: "#3B9EE0", bg: "#EBF5FE" },
};

function JobDrawer({ job, onClose }: { job?: Partial<Job>; onClose: () => void }) {
  const isNew = !job?.id;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#DCE9E9]">
          <h2 className="text-lg font-semibold text-[#0D1F1F]">
            {isNew ? "Post New Job" : "Edit Job"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F7FAFA] transition-colors">
            <X className="w-4 h-4 text-[#5A7A7A]" />
          </button>
        </div>
        <div className="flex-1 px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Job Title *</label>
            <input
              type="text"
              defaultValue={job?.title ?? ""}
              placeholder="e.g. Senior React Developer"
              className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Company *</label>
            <input
              type="text"
              defaultValue={job?.company ?? ""}
              placeholder="e.g. Paystack"
              className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Job Type</label>
              <select className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30">
                <option>Remote</option>
                <option>Hybrid</option>
                <option>Onsite</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Category</label>
              <select className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30">
                <option>Frontend</option>
                <option>Backend</option>
                <option>DevOps</option>
                <option>Design</option>
                <option>Data</option>
                <option>Mobile</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Location</label>
              <input
                type="text"
                defaultValue={job?.location ?? ""}
                placeholder="e.g. Lagos, Nigeria"
                className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Salary Range</label>
              <input
                type="text"
                defaultValue={job?.salary_range ?? ""}
                placeholder="e.g. $60k–$90k"
                className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Status</label>
            <select className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30">
              <option>active</option>
              <option>draft</option>
              <option>closed</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Description</label>
            <textarea
              rows={5}
              defaultValue={job?.description ?? ""}
              placeholder="Describe the role, requirements, and responsibilities..."
              className="w-full px-3 py-2 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272] resize-none"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#DCE9E9] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg border border-[#DCE9E9] text-sm font-medium text-[#5A7A7A] hover:bg-[#F7FAFA] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg bg-[#1C7272] text-white text-sm font-medium hover:bg-[#0F4A4A] active:scale-[0.97] transition-all shadow-sm"
          >
            {isNew ? "Post Job" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editJob, setEditJob] = useState<Partial<Job> | undefined>();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filtered = mockJobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || job.status === statusFilter;
    const matchCategory = categoryFilter === "all" || job.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  const categories = ["all", ...Array.from(new Set(mockJobs.map((j) => j.category)))];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D1F1F]" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Jobs
          </h1>
          <p className="text-sm text-[#5A7A7A] mt-1">
            {filtered.length} job listings found
          </p>
        </div>
        <button
          onClick={() => { setEditJob(undefined); setDrawerOpen(true); }}
          className="flex items-center gap-2 h-10 px-5 rounded-lg bg-[#1C7272] text-white text-sm font-medium hover:bg-[#0F4A4A] active:scale-[0.97] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A7A7A]" />
          <input
            type="text"
            placeholder="Search jobs..."
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
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#DCE9E9] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#DCE9E9] bg-[#F7FAFA]">
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Title</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Company</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Type</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Category</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Applicants</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Posted</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <>
                  <tr
                    key={job.id}
                    className="border-b border-[#DCE9E9] last:border-0 hover:bg-[#F7FAFA] transition-colors cursor-pointer"
                    onClick={() => setExpandedRow(expandedRow === job.id ? null : job.id)}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-[#5A7A7A] flex-shrink-0 transition-transform ${expandedRow === job.id ? "rotate-180" : ""}`}
                        />
                        <div>
                          <p className="text-sm font-medium text-[#0D1F1F]">{job.title}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#5A7A7A]" />
                            <span className="text-xs text-[#5A7A7A]">{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[#0D1F1F]">{job.company}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ color: typeConfig[job.type].color, backgroundColor: typeConfig[job.type].bg }}
                      >
                        {job.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[#5A7A7A]">{job.category}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#5A7A7A]" />
                        <span className="text-sm text-[#0D1F1F] font-medium">{job.applicants_count}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ color: statusConfig[job.status].color, backgroundColor: statusConfig[job.status].bg }}
                      >
                        {statusConfig[job.status].label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[#5A7A7A]">
                      {new Date(job.posted_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => { setEditJob(job); setDrawerOpen(true); }}
                          className="px-3 py-1 text-xs font-medium text-[#1C7272] hover:bg-[#EEF5F5] rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F7FAFA] transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-[#5A7A7A]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === job.id && (
                    <tr key={`${job.id}-expanded`} className="bg-[#F7FAFA]">
                      <td colSpan={8} className="px-12 py-4">
                        <div className="flex items-start gap-6">
                          <div className="flex-1">
                            <p className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide mb-1">Description</p>
                            <p className="text-sm text-[#0D1F1F]">{job.description}</p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <DollarSign className="w-3.5 h-3.5 text-[#5A7A7A]" />
                            <span className="text-sm font-medium text-[#0D1F1F]">{job.salary_range}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {drawerOpen && (
        <JobDrawer job={editJob} onClose={() => setDrawerOpen(false)} />
      )}
    </div>
  );
}
