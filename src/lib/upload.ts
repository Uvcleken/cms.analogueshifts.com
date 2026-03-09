import type { MediaItem } from "@/types/schema";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export interface UploadResult {
  success: boolean;
  media?: MediaItem;
  error?: string;
}

/**
 * Validates a file before upload.
 * Returns an error message string on failure, or null on success.
 */
export function validateFile(
  file: File,
  allowedTypes: string[] = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES],
  maxSizeBytes: number = MAX_FILE_SIZE_BYTES
): string | null {
  if (!allowedTypes.includes(file.type)) {
    return `File type "${file.type}" is not allowed. Allowed types: ${allowedTypes.join(", ")}`;
  }

  if (file.size > maxSizeBytes) {
    const maxMB = (maxSizeBytes / 1024 / 1024).toFixed(0);
    return `File size exceeds the ${maxMB} MB limit.`;
  }

  return null;
}

/**
 * Uploads a single file to the CMS upload endpoint.
 * Requires the caller to supply a valid Bearer token.
 */
export async function uploadFile(
  file: File,
  token: string,
  altText?: string
): Promise<UploadResult> {
  const validationError = validateFile(file);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const formData = new FormData();
  formData.append("file", file);
  if (altText) {
    formData.append("alt_text", altText);
  }

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data?.message ?? `Upload failed with status ${response.status}`,
      };
    }

    return { success: true, media: data.data as MediaItem };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return { success: false, error: message };
  }
}

/** Returns a human-readable file size string (e.g. "4.2 MB"). */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
