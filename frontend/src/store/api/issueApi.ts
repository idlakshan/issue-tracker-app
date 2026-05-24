import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import type { Issue } from "../../types/issue";

export interface GetIssuesResponse {
  issues: Issue[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface GetIssuesParams {
  page: number;
  limit: number;
  status?: string;
  priority?: string;
  assignee?: string[];
  search?: string;
}

interface IssueStats {
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  total: number;
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  priority: string;
  status: string;
  assignees: string[];
}

interface CreateIssueResponse {
  message: string;
  issue: Issue;
}

export interface UpdateIssueRequest {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignees: string[];
}

export const issueApi = createApi({
  reducerPath: "issueApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Issues", "Stats"],
  endpoints: (builder) => ({
    getIssues: builder.query<GetIssuesResponse, GetIssuesParams>({
      query: ({ page, limit, status, priority, assignee, search }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        if (status && status !== "ALL") params.append("status", status);
        if (priority && priority !== "ALL") params.append("priority", priority);
        if (assignee && assignee.length > 0) {
          assignee.forEach((a) => params.append("assignee", a));
        }
        if (search && search.trim()) params.append("search", search.trim());

        return {
          url: `/issues?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Issues"],
    }),
    createIssue: builder.mutation<CreateIssueResponse, CreateIssueRequest>({
      query: (body) => ({
        url: "/issues",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Issues", "Stats"],
    }),
    updateIssue: builder.mutation<CreateIssueResponse, UpdateIssueRequest>({
      query: ({ id, ...body }) => ({
        url: `/issues/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Issues", "Stats"],
    }),

    deleteIssue: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/issues/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Issues", "Stats"],
    }),

    getIssueStats: builder.query<IssueStats, void>({
      query: () => ({
        url: "/issues/stats",
        method: "GET",
        providesTags: ["Stats"],
      }),
    }),
  }),
});

export const {
  useGetIssuesQuery,
  useGetIssueStatsQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
  useDeleteIssueMutation,
} = issueApi;
