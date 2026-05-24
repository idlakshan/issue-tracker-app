import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery"; 

export interface ActivityResponse {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  type: "CREATE" | "STATUS_CHANGE" | "ASSIGN" | "RESOLVE";
  issue: {
    _id: string;
    title: string;
  };
  createdAt: string;
}

export const activityApi = createApi({
  reducerPath: "activityApi",
  baseQuery: baseQueryWithReauth, 
  endpoints: (builder) => ({
    getRecentActivities: builder.query<ActivityResponse[], void>({
      query: () => ({
        url: "/activities",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRecentActivitiesQuery } = activityApi;