"use client";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import type {
  Article,
  ArticlesInfo,
  JobPosting,
  JobPostingsInfo,
} from "@/types/schema";

// ─── Shared helpers ───────────────────────────────────────────────────────────

function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// ─── Parameter interfaces ─────────────────────────────────────────────────────

interface GetListParams<T> {
  url: string;
  setLoading: (loading: boolean) => void;
  setData: (data: T) => void;
}

interface GetSingleParams<T> {
  uuid: string;
  setLoading: (loading: boolean) => void;
  setData: (data: T) => void;
}

interface MutateParams<TPayload> {
  data: TPayload;
  setLoading: (loading: boolean) => void;
  onSuccess?: () => void;
}

interface DeleteParams {
  uuid: string;
  setLoading: (loading: boolean) => void;
  onSuccess?: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useContent = () => {
  const router = useRouter();

  function getToken() {
    const token = Cookies.get("analogueshiftsCmsToken");
    if (!token) {
      router.push("/");
    }
    return token ?? "";
  }

  function handleAuthError(status?: number) {
    if (status === 401) {
      Cookies.remove("analogueshiftsCmsToken");
      router.push("/");
    }
  }

  // ── Articles ────────────────────────────────────────────────────────────────

  const getArticles = async ({
    url,
    setLoading,
    setData,
  }: GetListParams<ArticlesInfo>) => {
    const token = getToken();
    setLoading(true);
    try {
      const response = await axios.request({
        url,
        method: "GET",
        headers: authHeaders(token),
      });
      if (response.status === 200) {
        setData(response.data.data.articles as ArticlesInfo);
      }
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      handleAuthError(err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const getArticle = async ({
    uuid,
    setLoading,
    setData,
  }: GetSingleParams<Article>) => {
    const token = getToken();
    setLoading(true);
    try {
      const response = await axios.request({
        url: `/admin/articles/${uuid}`,
        method: "GET",
        headers: authHeaders(token),
      });
      if (response.status === 200) {
        setData(response.data.data.article as Article);
      }
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      handleAuthError(err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async ({
    data,
    setLoading,
    onSuccess,
  }: MutateParams<Partial<Article>>) => {
    const token = getToken();
    setLoading(true);
    try {
      await axios.request({
        url: "/admin/articles",
        method: "POST",
        headers: authHeaders(token),
        data,
      });
      onSuccess?.();
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      handleAuthError(err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async ({
    data,
    setLoading,
    onSuccess,
  }: MutateParams<Partial<Article> & { uuid: string }>) => {
    const token = getToken();
    setLoading(true);
    try {
      await axios.request({
        url: `/admin/articles/${data.uuid}`,
        method: "PUT",
        headers: authHeaders(token),
        data,
      });
      onSuccess?.();
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      handleAuthError(err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async ({
    uuid,
    setLoading,
    onSuccess,
  }: DeleteParams) => {
    const token = getToken();
    setLoading(true);
    try {
      await axios.request({
        url: `/admin/articles/${uuid}`,
        method: "DELETE",
        headers: authHeaders(token),
      });
      onSuccess?.();
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      handleAuthError(err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  // ── Job Postings ────────────────────────────────────────────────────────────

  const getJobPostings = async ({
    url,
    setLoading,
    setData,
  }: GetListParams<JobPostingsInfo>) => {
    const token = getToken();
    setLoading(true);
    try {
      const response = await axios.request({
        url,
        method: "GET",
        headers: authHeaders(token),
      });
      if (response.status === 200) {
        setData(response.data.data.jobs as JobPostingsInfo);
      }
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      handleAuthError(err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const getJobPosting = async ({
    uuid,
    setLoading,
    setData,
  }: GetSingleParams<JobPosting>) => {
    const token = getToken();
    setLoading(true);
    try {
      const response = await axios.request({
        url: `/admin/jobs/${uuid}`,
        method: "GET",
        headers: authHeaders(token),
      });
      if (response.status === 200) {
        setData(response.data.data.job as JobPosting);
      }
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      handleAuthError(err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const createJobPosting = async ({
    data,
    setLoading,
    onSuccess,
  }: MutateParams<Partial<JobPosting>>) => {
    const token = getToken();
    setLoading(true);
    try {
      await axios.request({
        url: "/admin/jobs",
        method: "POST",
        headers: authHeaders(token),
        data,
      });
      onSuccess?.();
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      handleAuthError(err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const updateJobPosting = async ({
    data,
    setLoading,
    onSuccess,
  }: MutateParams<Partial<JobPosting> & { uuid: string }>) => {
    const token = getToken();
    setLoading(true);
    try {
      await axios.request({
        url: `/admin/jobs/${data.uuid}`,
        method: "PUT",
        headers: authHeaders(token),
        data,
      });
      onSuccess?.();
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      handleAuthError(err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const deleteJobPosting = async ({
    uuid,
    setLoading,
    onSuccess,
  }: DeleteParams) => {
    const token = getToken();
    setLoading(true);
    try {
      await axios.request({
        url: `/admin/jobs/${uuid}`,
        method: "DELETE",
        headers: authHeaders(token),
      });
      onSuccess?.();
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      handleAuthError(err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  return {
    // Articles
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    // Job Postings
    getJobPostings,
    getJobPosting,
    createJobPosting,
    updateJobPosting,
    deleteJobPosting,
  };
};
