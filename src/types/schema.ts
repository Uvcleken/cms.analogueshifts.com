export interface UserCollection {
  uuid: string;
  username: string;
  email: string;
  phone_code: string | null;
  phone_number: string | null;
  balance: string;
  status: string;
  user_type: string;
  user_mode: string;
  device_type: string | null;
  OTP_created_at: string | null;
  email_verified_at: string | null;
  phone_number_verified_at: string | null;
  created_at: Date;
  updated_at: Date;
  user_profile: {
    user_uuid: string;
    first_name: string | null;
    last_name: string | null;
    avatar: string | null;
    biography: string | null;
    country: string | null;
    city: string | null;
    town: string | null;
    created_at: string;
    updated_at: string;
  };
  user_job_profile: {
    user_uuid: string;
    headline: string | null;
    industry: string | null;
    website: string | null;
    resume_cv: string | null;
    cover_letter: string | null;
    years_of_experience: number | null;
    experience_level: string | null;
    education: string | null;
    experience: string | null;
    projects: string | null;
    job_type: string | null;
    salary: string | null;
    locations: string | null;
    socials: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface UsersInfo {
  current_page: number;
  data: UserCollection[];
  first_page_url: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
  per_page: number;
}

export type JobStatus = 'active' | 'closed' | 'draft';
export type JobType = 'Remote' | 'Hybrid' | 'Onsite';

export interface Job {
  id: string;
  title: string;
  company: string;
  type: JobType;
  category: string;
  applicants_count: number;
  status: JobStatus;
  posted_date: string;
  description: string;
  location: string;
  salary_range: string;
}

export type CandidateStatus = 'active' | 'inactive' | 'hired' | 'blacklisted';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  skills: string[];
  location: string;
  status: CandidateStatus;
  applied_jobs: number;
  experience_years: number;
  created_at: string;
}

export type ApplicationStatus = 'applied' | 'shortlisted' | 'hired' | 'rejected';

export interface Application {
  id: string;
  candidate_name: string;
  candidate_avatar: string | null;
  candidate_email: string;
  job_title: string;
  company: string;
  status: ApplicationStatus;
  applied_date: string;
}

export type CourseStatus = 'published' | 'draft' | 'coming_soon';

export interface Course {
  id: string;
  title: string;
  thumbnail: string | null;
  instructor: string;
  enrolled_count: number;
  progress: number;
  status: CourseStatus;
  category: string;
  duration: string;
}

export interface Enrollment {
  id: string;
  student_name: string;
  student_avatar: string | null;
  course_title: string;
  progress: number;
  completion_date: string | null;
  certificate_issued: boolean;
}

export interface DashboardStats {
  total_candidates: number;
  total_candidates_change: number;
  active_jobs: number;
  active_jobs_new_today: number;
  placements_made: number;
  placements_change: number;
  revenue: number;
  revenue_change: number;
}

export interface ActivityItem {
  id: string;
  actor_name: string;
  actor_avatar: string | null;
  action: string;
  timestamp: string;
}
