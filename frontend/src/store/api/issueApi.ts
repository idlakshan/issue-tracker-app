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

export const issueApi = createApi({
  reducerPath: "issueApi",
  baseQuery: baseQueryWithReauth,
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
    }),
  }),
});

export const { useGetIssuesQuery } = issueApi;