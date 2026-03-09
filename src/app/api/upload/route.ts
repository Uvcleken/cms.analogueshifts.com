import { type NextRequest, NextResponse } from "next/server";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_DOCUMENT_TYPES,
  MAX_FILE_SIZE_BYTES,
} from "@/lib/upload";

const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];

/**
 * POST /api/upload
 *
 * Accepts a multipart/form-data request with:
 *   - file      (required) – the file to upload
 *   - alt_text  (optional) – accessible alt text for images
 *
 * The handler validates the file locally, then proxies it to the backend
 * upload endpoint using the Bearer token forwarded from the client.
 */
export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "Invalid form data" },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { message: "No file provided" },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      {
        message: `File type "${file.type}" is not allowed.`,
      },
      { status: 415 }
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const maxMB = (MAX_FILE_SIZE_BYTES / 1024 / 1024).toFixed(0);
    return NextResponse.json(
      { message: `File exceeds the ${maxMB} MB size limit.` },
      { status: 413 }
    );
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { message: "Backend URL is not configured." },
      { status: 500 }
    );
  }

  try {
    const proxyForm = new FormData();
    proxyForm.append("file", file);

    const altText = formData.get("alt_text");
    if (altText && typeof altText === "string") {
      proxyForm.append("alt_text", altText);
    }

    const backendResponse = await fetch(`${backendUrl}/admin/media`, {
      method: "POST",
      headers: {
        Authorization: authorization,
        Accept: "application/json",
      },
      body: proxyForm,
    });

    const responseData = await backendResponse.json();

    return NextResponse.json(responseData, { status: backendResponse.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ message }, { status: 502 });
  }
}
