"use client";
import { useState } from "react";
import { Plus, BookOpen, Users, Award, CheckCircle, Clock, X } from "lucide-react";
import { mockCourses, mockEnrollments } from "@/lib/mock-data";
import { CourseStatus, Course } from "@/types/schema";

const statusConfig: Record<CourseStatus, { label: string; color: string; bg: string }> = {
  published: { label: "Published", color: "#22A87A", bg: "#E7F8F2" },
  draft: { label: "Draft", color: "#5A7A7A", bg: "#F7FAFA" },
  coming_soon: { label: "Coming Soon", color: "#F5A623", bg: "#FEF6E9" },
};

const categoryColors: Record<string, string> = {
  "Web Development": "#1C7272",
  Frontend: "#3B9EE0",
  Backend: "#22A87A",
  DevOps: "#F5A623",
  Design: "#9B59B6",
  Data: "#E84545",
  Mobile: "#E8931A",
};

function AddCourseModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#DCE9E9]">
          <h2 className="text-lg font-semibold text-[#0D1F1F]">Add New Course</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F7FAFA] transition-colors">
            <X className="w-4 h-4 text-[#5A7A7A]" />
          </button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Course Title *</label>
            <input
              type="text"
              placeholder="e.g. Advanced React Patterns"
              className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Instructor</label>
              <input
                type="text"
                placeholder="Instructor name"
                className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Duration</label>
              <input
                type="text"
                placeholder="e.g. 8 weeks"
                className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30 focus:border-[#1C7272]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Category</label>
              <select className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30">
                <option>Frontend</option>
                <option>Backend</option>
                <option>DevOps</option>
                <option>Design</option>
                <option>Data</option>
                <option>Mobile</option>
                <option>Web Development</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[#5A7A7A] uppercase tracking-wide block mb-1.5">Status</label>
              <select className="w-full h-10 px-3 rounded-lg border border-[#DCE9E9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C7272]/30">
                <option>draft</option>
                <option>published</option>
                <option>coming_soon</option>
              </select>
            </div>
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
            className="flex-1 h-10 rounded-lg bg-[#1C7272] text-white text-sm font-medium hover:bg-[#0F4A4A] active:scale-[0.97] transition-all"
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const cfg = statusConfig[course.status];
  const catColor = categoryColors[course.category] ?? "#1C7272";
  return (
    <div className="bg-white rounded-xl border border-[#DCE9E9] overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
      {/* Thumbnail */}
      <div
        className="h-36 flex items-center justify-center text-white text-3xl font-bold"
        style={{ background: `linear-gradient(135deg, ${catColor}dd, ${catColor}88)` }}
      >
        <BookOpen className="w-12 h-12 opacity-60" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ color: catColor, backgroundColor: `${catColor}15` }}
            >
              {course.category}
            </span>
          </div>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ color: cfg.color, backgroundColor: cfg.bg }}
          >
            {cfg.label}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-[#0D1F1F] leading-snug mb-1">{course.title}</h3>
        <p className="text-xs text-[#5A7A7A] mb-3">by {course.instructor} · {course.duration}</p>

        {course.status === "published" && (
          <>
            <div className="flex items-center justify-between text-xs text-[#5A7A7A] mb-1.5">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{course.enrolled_count} enrolled</span>
              </div>
              <span>{course.progress}% avg</span>
            </div>
            <div className="w-full h-1.5 bg-[#DCE9E9] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${course.progress}%`, backgroundColor: catColor }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function TrainingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D1F1F]" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Training & Courses
          </h1>
          <p className="text-sm text-[#5A7A7A] mt-1">{mockCourses.length} courses available</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 h-10 px-5 rounded-lg bg-[#1C7272] text-white text-sm font-medium hover:bg-[#0F4A4A] active:scale-[0.97] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Enrollment Table */}
      <div className="bg-white rounded-xl border border-[#DCE9E9] overflow-hidden">
        <div className="p-5 border-b border-[#DCE9E9]">
          <h2 className="text-base font-semibold text-[#0D1F1F]">Recent Enrollments</h2>
          <p className="text-xs text-[#5A7A7A] mt-0.5">{mockEnrollments.length} students enrolled</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#DCE9E9] bg-[#F7FAFA]">
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Student</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Course</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Progress</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Completion</th>
                <th className="text-left text-xs font-medium text-[#5A7A7A] px-5 py-3">Certificate</th>
              </tr>
            </thead>
            <tbody>
              {mockEnrollments.map((enr) => (
                <tr key={enr.id} className="border-b border-[#DCE9E9] last:border-0 hover:bg-[#F7FAFA] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#1C7272]/10 flex items-center justify-center text-[#1C7272] text-xs font-semibold flex-shrink-0">
                        {enr.student_name.slice(0, 1)}
                      </div>
                      <span className="text-sm font-medium text-[#0D1F1F]">{enr.student_name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#0D1F1F]">{enr.course_title}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-[#DCE9E9] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${enr.progress}%`,
                            backgroundColor: enr.progress === 100 ? "#22A87A" : "#1C7272",
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#5A7A7A]">{enr.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#5A7A7A]">
                    {enr.completion_date ? (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#22A87A]" />
                        {new Date(enr.completion_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#5A7A7A]" />
                        In progress
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {enr.certificate_issued ? (
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#F5A623]" />
                        <span className="text-xs font-medium text-[#F5A623]">Issued</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#5A7A7A]">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && <AddCourseModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
