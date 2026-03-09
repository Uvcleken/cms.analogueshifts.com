"use client";
import {
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  dashboardStats,
  registrationsVsPlacements,
  jobCategories,
  recentApplications,
  activityFeed,
  topJobCategories,
  upcomingEvents,
} from "@/lib/mock-data";
import { ApplicationStatus } from "@/types/schema";

const statusConfig: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
  applied: { label: "Applied", color: "#3B9EE0", bg: "#EBF5FE" },
  shortlisted: { label: "Shortlisted", color: "#F5A623", bg: "#FEF6E9" },
  hired: { label: "Hired", color: "#22A87A", bg: "#E7F8F2" },
  rejected: { label: "Rejected", color: "#E84545", bg: "#FEEDED" },
};

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.color }} />
      {cfg.label}
    </span>
  );
}

const statCards = [
  {
    title: "Total Candidates",
    value: dashboardStats.total_candidates.toLocaleString(),
    change: dashboardStats.total_candidates_change,
    changeLabel: "this month",
    icon: Users,
    iconBg: "#E7F8F2",
    iconColor: "#22A87A",
  },
  {
    title: "Active Job Listings",
    value: dashboardStats.active_jobs.toLocaleString(),
    change: null,
    changeLabel: `+${dashboardStats.active_jobs_new_today} today`,
    icon: Briefcase,
    iconBg: "#EBF5FE",
    iconColor: "#3B9EE0",
  },
  {
    title: "Placements Made",
    value: dashboardStats.placements_made.toLocaleString(),
    change: dashboardStats.placements_change,
    changeLabel: "this month",
    icon: TrendingUp,
    iconBg: "#FEF6E9",
    iconColor: "#F5A623",
  },
  {
    title: "Revenue (USD)",
    value: `$${(dashboardStats.revenue / 1000).toFixed(0)}k`,
    change: dashboardStats.revenue_change,
    changeLabel: "MoM",
    icon: DollarSign,
    iconBg: "#EEF5F5",
    iconColor: "#1C7272",
  },
];

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0D1F1F]" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Dashboard
        </h1>
        <p className="text-sm text-[#5A7A7A] mt-1">
          Welcome back — here&apos;s what&apos;s happening at AnalogueShifts today.
        </p>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl border border-[#DCE9E9] p-5 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide">{card.title}</p>
                <p className="text-2xl font-bold text-[#0D1F1F] mt-1">{card.value}</p>
              </div>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: card.iconBg }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.iconColor }} />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {card.change !== null ? (
                <>
                  {card.change >= 0 ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#22A87A]" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 text-[#E84545]" />
                  )}
                  <span className={`text-xs font-semibold ${card.change >= 0 ? "text-[#22A87A]" : "text-[#E84545]"}`}>
                    {card.change >= 0 ? "+" : ""}{card.change}%
                  </span>
                  <span className="text-xs text-[#5A7A7A]">{card.changeLabel}</span>
                </>
              ) : (
                <span className="text-xs font-medium text-[#F5A623]">{card.changeLabel}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Area Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#DCE9E9] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-[#0D1F1F]">Registrations vs Placements</h2>
              <p className="text-xs text-[#5A7A7A]">Last 12 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#5A7A7A]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#1C7272] inline-block rounded" />
                Registrations
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#F5A623] inline-block rounded" />
                Placements
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={registrationsVsPlacements} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1C7272" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1C7272" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPlace" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A623" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#DCE9E9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5A7A7A" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5A7A7A" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #DCE9E9", fontSize: "12px" }}
                cursor={{ stroke: "#DCE9E9" }}
              />
              <Area type="monotone" dataKey="registrations" stroke="#1C7272" strokeWidth={2} fill="url(#colorReg)" />
              <Area type="monotone" dataKey="placements" stroke="#F5A623" strokeWidth={2} fill="url(#colorPlace)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#DCE9E9] p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[#0D1F1F]">Job Categories</h2>
            <p className="text-xs text-[#5A7A7A]">Distribution by type</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={jobCategories}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {jobCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #DCE9E9", fontSize: "12px" }}
                formatter={(value) => [`${value}%`, "Share"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-1">
            {jobCategories.map((cat) => (
              <div key={cat.name} className="flex items-center gap-1.5 text-xs text-[#5A7A7A]">
                <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
                {cat.name} <span className="font-medium text-[#0D1F1F] ml-auto">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables & Feed Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Applications Table */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#DCE9E9] overflow-hidden">
          <div className="p-5 border-b border-[#DCE9E9] flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#0D1F1F]">Recent Applications</h2>
              <p className="text-xs text-[#5A7A7A]">Latest candidate applications</p>
            </div>
            <a href="/admin/applications" className="text-xs font-medium text-[#1C7272] hover:text-[#0F4A4A] transition-colors">
              View all →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#DCE9E9] bg-[#F7FAFA]">
                  <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Candidate</th>
                  <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Job Title</th>
                  <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Company</th>
                  <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} className="border-b border-[#DCE9E9] last:border-0 hover:bg-[#F7FAFA] transition-colors cursor-pointer">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#1C7272]/10 flex items-center justify-center text-[#1C7272] text-xs font-semibold flex-shrink-0">
                          {app.candidate_name.slice(0, 1)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#0D1F1F]">{app.candidate_name}</p>
                          <p className="text-xs text-[#5A7A7A]">{app.candidate_email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-[#0D1F1F]">{app.job_title}</td>
                    <td className="px-5 py-3 text-sm text-[#5A7A7A]">{app.company}</td>
                    <td className="px-5 py-3"><StatusBadge status={app.status} /></td>
                    <td className="px-5 py-3 text-sm text-[#5A7A7A]">
                      {new Date(app.applied_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#DCE9E9] overflow-hidden">
          <div className="p-5 border-b border-[#DCE9E9]">
            <h2 className="text-base font-semibold text-[#0D1F1F]">Recent Activity</h2>
            <p className="text-xs text-[#5A7A7A]">Live system events</p>
          </div>
          <div className="divide-y divide-[#DCE9E9]">
            {activityFeed.map((item) => (
              <div key={item.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-[#F7FAFA] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#1C7272]/10 flex items-center justify-center text-[#1C7272] text-xs font-semibold flex-shrink-0 mt-0.5">
                  {item.actor_name.slice(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0D1F1F] leading-snug">
                    <span className="font-medium">{item.actor_name}</span>{" "}
                    <span className="text-[#5A7A7A]">{item.action}</span>
                  </p>
                  <p className="text-xs text-[#5A7A7A] mt-0.5">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Job Categories Bar Chart */}
        <div className="bg-white rounded-xl border border-[#DCE9E9] p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[#0D1F1F]">Top Performing Job Categories</h2>
            <p className="text-xs text-[#5A7A7A]">Placements by category</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={topJobCategories}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#DCE9E9" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#5A7A7A" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 11, fill: "#5A7A7A" }}
                axisLine={false}
                tickLine={false}
                width={130}
              />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #DCE9E9", fontSize: "12px" }}
                cursor={{ fill: "#F7FAFA" }}
              />
              <Bar dataKey="placements" fill="#1C7272" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-[#DCE9E9] overflow-hidden">
          <div className="p-5 border-b border-[#DCE9E9] flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#0D1F1F]">Upcoming Events</h2>
              <p className="text-xs text-[#5A7A7A]">Trainings & programmes</p>
            </div>
            <a href="/admin/events" className="text-xs font-medium text-[#1C7272] hover:text-[#0F4A4A] transition-colors">
              View all →
            </a>
          </div>
          <div className="divide-y divide-[#DCE9E9]">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-[#F7FAFA] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#1C7272]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4.5 h-4.5 text-[#1C7272]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0D1F1F] truncate">{event.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-[#5A7A7A]">{event.date}</span>
                    <span className="text-[#DCE9E9]">·</span>
                    <span className="text-xs text-[#5A7A7A]">{event.registered} registered</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                    event.type === "Virtual"
                      ? "bg-[#EBF5FE] text-[#3B9EE0]"
                      : "bg-[#E7F8F2] text-[#22A87A]"
                  }`}
                >
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
