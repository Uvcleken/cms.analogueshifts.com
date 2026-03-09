export interface UserCollection {
  uuid: string;
  username: string;
  email: string;
  phone_code: string | null;
  phone_number: string | null;
  balance: string;
  status: string;
  user_type: string; // e.g., "user"
  user_mode: string; // e.g., "job"
  device_type: string | null;
  OTP_created_at: string | null; // ISO 8601 format or null
  email_verified_at: string | null; // ISO 8601 format or null
  phone_number_verified_at: string | null; // ISO 8601 format or null
  created_at: Date; // ISO 8601 format
  updated_at: Date; // ISO 8601 format

  // User profile
  user_profile: {
    user_uuid: string;
    first_name: string | null;
    last_name: string | null;
    avatar: string | null;
    biography: string | null;
    country: string | null;
    city: string | null;
    town: string | null;
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
  };

  // User job profile
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
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
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

// ─── Job Posting ────────────────────────────────────────────────────────────

export type JobType = "full-time" | "part-time" | "contract" | "internship";
export type JobStatus = "draft" | "published" | "closed" | "archived";

export interface JobPosting {
  uuid: string;
  title: string;
  slug: string;
  company: string;
  location: string;
  remote: boolean;
  job_type: JobType;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  description: string;
  requirements: string;
  benefits: string | null;
  application_url: string | null;
  status: JobStatus;
  published_at: string | null;
  expires_at: string | null;
  created_by: string; // user uuid
  created_at: string;
  updated_at: string;
}

export interface JobPostingsInfo {
  current_page: number;
  data: JobPosting[];
  first_page_url: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
  per_page: number;
}

// ─── Article / Blog Post ─────────────────────────────────────────────────────

export type ArticleStatus = "draft" | "published" | "archived";

export interface Article {
  uuid: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  tags: string[];
  status: ArticleStatus;
  published_at: string | null;
  author_uuid: string;
  created_at: string;
  updated_at: string;
}

export interface ArticlesInfo {
  current_page: number;
  data: Article[];
  first_page_url: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
  per_page: number;
}

// ─── Media / File Upload ─────────────────────────────────────────────────────

export type MediaType = "image" | "document" | "video" | "other";

export interface MediaItem {
  uuid: string;
  filename: string;
  original_filename: string;
  url: string;
  mime_type: string;
  media_type: MediaType;
  size: number; // bytes
  width: number | null; // pixels, images only
  height: number | null; // pixels, images only
  alt_text: string | null;
  uploaded_by: string; // user uuid
  created_at: string;
  updated_at: string;
}

export interface MediaInfo {
  current_page: number;
  data: MediaItem[];
  first_page_url: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
  per_page: number;
}

// ─── Content Versioning ──────────────────────────────────────────────────────

export type VersionableContentType = "article" | "job_posting";

export interface ContentVersion {
  uuid: string;
  content_type: VersionableContentType;
  content_uuid: string;
  version_number: number;
  snapshot: Record<string, unknown>; // full content snapshot at this version
  changed_by: string; // user uuid
  change_summary: string | null;
  created_at: string;
}

export interface ContentVersionsInfo {
  current_page: number;
  data: ContentVersion[];
  first_page_url: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
  per_page: number;
}
