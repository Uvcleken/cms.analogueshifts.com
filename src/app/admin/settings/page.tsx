"use client";
import { useState } from "react";
import { Save, Key, Copy, RefreshCw, Trash2 } from "lucide-react";

const tabs = ["General", "Roles & Permissions", "Email Templates", "Integrations", "Billing"] as const;
type Tab = (typeof tabs)[number];

const roles = [
  { id: "super-admin", name: "Super Admin", description: "Full system access" },
  { id: "admin", name: "Admin", description: "Manage users and content" },
  { id: "recruiter", name: "Recruiter", description: "Manage jobs and candidates" },
  { id: "trainer", name: "Trainer", description: "Manage courses and enrollments" },
  { id: "viewer", name: "Viewer", description: "Read-only access" },
];

const permissions = [
  "View Dashboard",
  "Manage Jobs",
  "Manage Candidates",
  "Manage Applications",
  "Manage Courses",
  "Manage Users",
  "View Reports",
  "Manage Settings",
  "Manage Roles",
  "View Audit Logs",
];

const rolePermissions: Record<string, Set<string>> = {
  "super-admin": new Set(permissions),
  admin: new Set(permissions.filter((p) => p !== "Manage Roles")),
  recruiter: new Set(["View Dashboard", "Manage Jobs", "Manage Candidates", "Manage Applications", "View Reports"]),
  trainer: new Set(["View Dashboard", "Manage Courses", "View Reports"]),
  viewer: new Set(["View Dashboard", "View Reports"]),
};

const apiKeys = [
  { id: "key-001", name: "Production API Key", key: "as_prod_...7f2a", created: "2024-01-15", last_used: "2 mins ago" },
  { id: "key-002", name: "Staging API Key", key: "as_stg_...3c9b", created: "2024-02-01", last_used: "3 days ago" },
];

function GeneralTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl border border-[#DCE9E9] p-6">
        <h3 className="text-sm font-semibold text-[#0D1F1F] mb-4">Organization Settings</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Organization Name</label>
            <input
              type="text"
              defaultValue="AnalogueShifts"
              className="w-full max-w-md h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Website URL</label>
            <input
              type="url"
              defaultValue="https://analogueshifts.com"
              className="w-full max-w-md h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Support Email</label>
            <input
              type="email"
              defaultValue="support@analogueshifts.com"
              className="w-full max-w-md h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Timezone</label>
            <select className="w-full max-w-md h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30">
              <option>Africa/Lagos (WAT, UTC+1)</option>
              <option>UTC</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
            </select>
          </div>
        </div>
        <button className="mt-5 flex items-center gap-2 h-9 px-4 rounded-lg bg-[#1C7272] text-white text-sm font-medium hover:bg-[#0F4A4A] transition-colors">
          <Save className="w-3.5 h-3.5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function RolesTab() {
  const [selectedRole, setSelectedRole] = useState("recruiter");
  const [perms, setPerms] = useState(new Map(Object.entries(rolePermissions).map(([k, v]) => [k, new Set(v)])));

  const togglePerm = (role: string, perm: string) => {
    const next = new Map(perms);
    const rolePerms = new Set(next.get(role) ?? []);
    if (rolePerms.has(perm)) rolePerms.delete(perm);
    else rolePerms.add(perm);
    next.set(role, rolePerms);
    setPerms(next);
  };

  return (
    <div className="bg-white rounded-xl border border-[#DCE9E9] overflow-hidden">
      <div className="p-5 border-b border-[#DCE9E9]">
        <h3 className="text-sm font-semibold text-[#0D1F1F]">Roles & Permissions Matrix</h3>
        <p className="text-xs text-[#5A7A7A] mt-0.5">Configure what each role can access</p>
      </div>
      <div className="flex">
        {/* Role List */}
        <div className="w-56 border-r border-[#DCE9E9] flex-shrink-0">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`w-full text-left px-4 py-3.5 border-b border-[#DCE9E9] transition-colors ${
                selectedRole === role.id ? "bg-[#EEF5F5]" : "hover:bg-[#F7FAFA]"
              }`}
            >
              <p className={`text-sm font-medium ${selectedRole === role.id ? "text-[#1C7272]" : "text-[#0D1F1F]"}`}>{role.name}</p>
              <p className="text-xs text-[#5A7A7A] mt-0.5">{role.description}</p>
            </button>
          ))}
        </div>
        {/* Permissions */}
        <div className="flex-1 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {permissions.map((perm) => {
              const enabled = perms.get(selectedRole)?.has(perm) ?? false;
              return (
                <label
                  key={perm}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#DCE9E9] hover:bg-[#F7FAFA] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => togglePerm(selectedRole, perm)}
                    className="rounded accent-[#1C7272] w-4 h-4"
                  />
                  <span className="text-sm text-[#0D1F1F]">{perm}</span>
                </label>
              );
            })}
          </div>
          <button className="mt-4 flex items-center gap-2 h-9 px-4 rounded-lg bg-[#1C7272] text-white text-sm font-medium hover:bg-[#0F4A4A] transition-colors">
            <Save className="w-3.5 h-3.5" />
            Save Permissions
          </button>
        </div>
      </div>
    </div>
  );
}

function IntegrationsTab() {
  return (
    <div className="flex flex-col gap-4">
      {/* API Keys */}
      <div className="bg-white rounded-xl border border-[#DCE9E9] overflow-hidden">
        <div className="p-5 border-b border-[#DCE9E9] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#0D1F1F]">API Keys</h3>
            <p className="text-xs text-[#5A7A7A] mt-0.5">Manage API access credentials</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[#1C7272] text-white text-xs font-medium hover:bg-[#0F4A4A] transition-colors">
            <Key className="w-3.5 h-3.5" />
            Generate New Key
          </button>
        </div>
        <div className="divide-y divide-[#DCE9E9]">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#0D1F1F]">{apiKey.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <code className="text-xs font-mono text-[#5A7A7A] bg-[#F7FAFA] px-2 py-0.5 rounded">
                    {apiKey.key}
                  </code>
                  <span className="text-xs text-[#5A7A7A]">Last used: {apiKey.last_used}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F7FAFA] text-[#5A7A7A] hover:text-[#0D1F1F] transition-colors" title="Copy">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F7FAFA] text-[#5A7A7A] hover:text-[#0D1F1F] transition-colors" title="Regenerate">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#5A7A7A] hover:text-red-500 transition-colors" title="Revoke">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhook Config */}
      <div className="bg-white rounded-xl border border-[#DCE9E9] p-5">
        <h3 className="text-sm font-semibold text-[#0D1F1F] mb-3">Webhook Configuration</h3>
        <div>
          <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Webhook URL</label>
          <input
            type="url"
            placeholder="https://your-server.com/webhooks/as"
            className="w-full max-w-lg h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
          />
        </div>
        <button className="mt-4 flex items-center gap-2 h-9 px-4 rounded-lg bg-[#1C7272] text-white text-sm font-medium hover:bg-[#0F4A4A] transition-colors">
          <Save className="w-3.5 h-3.5" />
          Save Webhook
        </button>
      </div>
    </div>
  );
}

function EmailTemplatesTab() {
  const templates = [
    { id: "welcome", name: "Welcome Email", subject: "Welcome to AnalogueShifts!" },
    { id: "application-received", name: "Application Received", subject: "We received your application" },
    { id: "shortlisted", name: "Shortlisted", subject: "You have been shortlisted!" },
    { id: "rejection", name: "Application Rejection", subject: "Update on your application" },
    { id: "offer", name: "Job Offer", subject: "Congratulations! Job Offer from AnalogueShifts" },
  ];

  const [selected, setSelected] = useState(templates[0]);

  return (
    <div className="bg-white rounded-xl border border-[#DCE9E9] overflow-hidden">
      <div className="flex">
        <div className="w-56 border-r border-[#DCE9E9] flex-shrink-0">
          {templates.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setSelected(tmpl)}
              className={`w-full text-left px-4 py-3.5 border-b border-[#DCE9E9] transition-colors ${
                selected.id === tmpl.id ? "bg-[#EEF5F5]" : "hover:bg-[#F7FAFA]"
              }`}
            >
              <p className={`text-sm font-medium ${selected.id === tmpl.id ? "text-[#1C7272]" : "text-[#0D1F1F]"}`}>
                {tmpl.name}
              </p>
            </button>
          ))}
        </div>
        <div className="flex-1 p-5 flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Subject</label>
            <input
              type="text"
              defaultValue={selected.subject}
              key={selected.id}
              className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Email Body</label>
            <textarea
              rows={10}
              defaultValue={`Dear {{candidate_name}},\n\nThank you for your interest in ${selected.name.toLowerCase()} at AnalogueShifts.\n\n...\n\nBest regards,\nThe AnalogueShifts Team`}
              key={selected.id}
              className="w-full px-3 py-2 rounded-lg border border-[#DCE9E9] bg-white text-sm text-[#0D1F1F] focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272] resize-none font-mono"
            />
          </div>
          <button className="self-start flex items-center gap-2 h-9 px-4 rounded-lg bg-[#1C7272] text-white text-sm font-medium hover:bg-[#0F4A4A] transition-colors">
            <Save className="w-3.5 h-3.5" />
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="bg-white rounded-xl border border-[#DCE9E9] p-6">
      <h3 className="text-sm font-semibold text-[#0D1F1F] mb-4">Billing & Plan</h3>
      <div className="flex items-center gap-4 p-4 rounded-xl border border-[#1C7272]/20 bg-[#EEF5F5] mb-6">
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#1C7272]">Enterprise Plan</p>
          <p className="text-xs text-[#5A7A7A] mt-0.5">Unlimited users · All features · Priority support</p>
        </div>
        <span className="text-sm font-bold text-[#0D1F1F]">$499/mo</span>
      </div>
      <p className="text-sm text-[#5A7A7A]">Next billing date: <span className="font-medium text-[#0D1F1F]">April 1, 2024</span></p>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("General");

  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1F1F]" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Settings
        </h1>
        <p className="text-sm text-[#5A7A7A] mt-1">Manage your AnalogueShifts CMS configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-[#DCE9E9]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all -mb-px ${
              activeTab === tab
                ? "border-[#1C7272] text-[#1C7272]"
                : "border-transparent text-[#5A7A7A] hover:text-[#0D1F1F] hover:border-[#DCE9E9]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "General" && <GeneralTab />}
      {activeTab === "Roles & Permissions" && <RolesTab />}
      {activeTab === "Email Templates" && <EmailTemplatesTab />}
      {activeTab === "Integrations" && <IntegrationsTab />}
      {activeTab === "Billing" && <BillingTab />}
    </div>
  );
}
