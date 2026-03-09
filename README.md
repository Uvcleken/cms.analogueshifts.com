# Analogueshifts CMS

A Next.js 15 admin CMS for managing content, users, and media on [analogueshifts.com](https://www.analogueshifts.com).

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

| Variable                     | Description                               |
| ---------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_BACKEND_URL`    | Base URL of the Analogueshifts API        |
| `NEXT_PUBLIC_SECRET_KEY`     | API secret key (login endpoint)           |
| `NEXT_PUBLIC_PUBLIC_KEY`     | API public key (login endpoint)           |

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the CMS.

---

## Project Structure

```
src/
├── app/
│   ├── admin/                  # Protected admin area
│   │   ├── components/         # Shared admin UI (sidebar, etc.)
│   │   ├── users/              # User management pages
│   │   ├── layout.tsx          # Admin shell with sidebar
│   │   └── page.tsx            # Redirects to /admin/users
│   ├── api/
│   │   └── upload/             # File upload proxy route
│   │       └── route.ts
│   ├── layout.tsx              # Root layout (fonts, providers)
│   └── page.tsx                # Login page
├── components/
│   ├── application/            # Feature components (login form, etc.)
│   └── ui/                     # shadcn/ui primitives
├── constants/                  # Shared constants and utilities
├── contexts/
│   ├── toast.tsx               # Toast notification context
│   └── user.tsx                # Authenticated user context
├── hooks/
│   ├── auth.tsx                # Login / logout / getUser
│   ├── content.tsx             # Articles & job postings CRUD
│   └── users.tsx               # User list / pagination
├── lib/
│   ├── axios.ts                # Pre-configured Axios instance
│   └── upload.ts               # File upload helpers & validation
└── types/
    └── schema.ts               # All TypeScript interfaces / models
```

---

## Authentication

Authentication uses a **Bearer token** stored in a cookie (`analogueshiftsCmsToken`).

- **Login** – `POST /login` via `useAuth().login()`
- **Logout** – removes the cookie and redirects to `/`
- **Session check** – the admin layout reads the cookie on each render and redirects unauthenticated users to `/`

All API requests attach the token via the `Authorization: Bearer <token>` header.

---

## Content Models

All models are defined in `src/types/schema.ts`.

### Users (`UserCollection`)

Represents a registered platform user with profile and job profile sub-objects.

### Articles (`Article`)

Blog posts and editorial content.

| Field          | Type             | Notes                              |
| -------------- | ---------------- | ---------------------------------- |
| `uuid`         | string           | Primary key                        |
| `title`        | string           | Post title                         |
| `slug`         | string           | URL-friendly identifier            |
| `content`      | string           | Full HTML/Markdown body            |
| `status`       | ArticleStatus    | `draft` \| `published` \| `archived` |
| `published_at` | string \| null   | ISO 8601 timestamp                 |

### Job Postings (`JobPosting`)

Employment listings displayed on the platform.

| Field        | Type       | Notes                                            |
| ------------ | ---------- | ------------------------------------------------ |
| `uuid`       | string     | Primary key                                      |
| `title`      | string     | Job title                                        |
| `job_type`   | JobType    | `full-time` \| `part-time` \| `contract` \| `internship` |
| `status`     | JobStatus  | `draft` \| `published` \| `closed` \| `archived` |
| `remote`     | boolean    | Remote-friendly flag                             |

### Media (`MediaItem`)

Images and documents managed through the CMS.

| Field               | Type      | Notes                               |
| ------------------- | --------- | ----------------------------------- |
| `uuid`              | string    | Primary key                         |
| `url`               | string    | Public CDN URL                      |
| `media_type`        | MediaType | `image` \| `document` \| `video` \| `other` |
| `size`              | number    | File size in bytes                  |

### Content Versions (`ContentVersion`)

Audit trail for changes to articles and job postings.

| Field            | Type                   | Notes                              |
| ---------------- | ---------------------- | ---------------------------------- |
| `content_type`   | VersionableContentType | `article` \| `job_posting`         |
| `content_uuid`   | string                 | UUID of the versioned document     |
| `version_number` | number                 | Monotonically increasing           |
| `snapshot`       | object                 | Full document state at save time   |

---

## API Routes

### `POST /api/upload`

Proxies a file upload to the backend `/admin/media` endpoint after performing local validation.

**Request** – `multipart/form-data`

| Field      | Required | Description                    |
| ---------- | -------- | ------------------------------ |
| `file`     | ✅        | The file to upload             |
| `alt_text` | ❌        | Accessible alt text (images)   |

**Headers**

```
Authorization: Bearer <token>
```

**Validation**

- Allowed MIME types: JPEG, PNG, GIF, WebP, SVG, PDF, DOC, DOCX
- Maximum size: **10 MB**

**Responses**

| Status | Meaning                              |
| ------ | ------------------------------------ |
| 200    | Upload succeeded; returns `MediaItem` |
| 400    | Missing or malformed form data       |
| 401    | Missing or invalid Bearer token      |
| 413    | File exceeds size limit              |
| 415    | Unsupported file type                |
| 502    | Backend unreachable                  |

---

## File Upload (Client)

Use the helpers in `src/lib/upload.ts`:

```typescript
import { uploadFile, validateFile } from "@/lib/upload";

// Validate before upload (returns error string or null)
const error = validateFile(file);
if (error) {
  // show error to user
  return;
}

// Upload
const result = await uploadFile(file, token, "My image description");
if (result.success) {
  console.log(result.media); // MediaItem
} else {
  console.error(result.error);
}
```

---

## Content Management (Hook)

Use `useContent()` from `src/hooks/content.tsx` inside any client component:

```typescript
import { useContent } from "@/hooks/content";

const { getArticles, createArticle, updateArticle, deleteArticle } = useContent();

// Fetch paginated articles
getArticles({
  url: "/admin/articles?count=20",
  setLoading,
  setData, // receives ArticlesInfo
});
```

The hook also exposes the same CRUD pattern for `JobPosting`:
`getJobPostings`, `getJobPosting`, `createJobPosting`, `updateJobPosting`, `deleteJobPosting`.

---

## Security

- All admin routes require a valid session cookie.
- The upload API route validates file type and size before proxying to the backend.
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.) are applied globally via `next.config.ts`.
- API keys are kept server-side in environment variables prefixed with `NEXT_PUBLIC_` only where browser access is required.

---

## Available Scripts

| Script        | Description                        |
| ------------- | ---------------------------------- |
| `npm run dev` | Start development server           |
| `npm run build` | Production build                 |
| `npm run start` | Start production server          |
| `npm run lint`  | Run ESLint                       |

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Analogueshifts](https://www.analogueshifts.com)
