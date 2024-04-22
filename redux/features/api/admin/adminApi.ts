import { apiSlice } from "../apiSlice";
import { allUsers } from "./adminSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: (data) => ({
        url: "all-student-details",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            allUsers({
              allUsers: result.data.allStudentDetails,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activateAccount: builder.mutation({
      query: ({ id, email }) => ({
        url: `account-verify/${id}`,
        method: "PUT",
        body: {
          email,
        },
        credentials: "include" as const,
      }),
    }),
    deactivateAccount: builder.mutation({
      query: ({ id, email, reason }) => ({
        url: `account-reject/${id}`,
        method: "PUT",
        body: {
          email,
          reason,
        },
        credentials: "include" as const,
      }),
    }),
    studentDetails: builder.query({
      query: ({ id }) => ({
        url: `single-student-details/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    adminMoocsCourseList: builder.query({
      query: ({}) => ({
        url: "moocs-course-list",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    adminMarCategoryList: builder.query({
      query: ({}) => ({
        url: "mar-category",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    uploadMoocsCourse: builder.mutation({
      query: ({ title,platform,credit }) => ({
        url: "create-moocs-course",
        method: "POST",
        body: {
          title,
          platform,
          credit
        },
        credentials: "include" as const,
      }),
    }),
    uploadMarCategory: builder.mutation({
      query: ({ category,perMarPoints,maximumMarPoints }) => ({
        url: "add-mar-category",
        method: "POST",
        body: {
          category,
          perMarPoints,
          maximumMarPoints
        },
        credentials: "include" as const,
      }),
    }),
    deactivteMarCategory: builder.mutation({
      query: ({ id }) => ({
        url: `deactivate-mar-category/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    activateMarCategory: builder.mutation({
      query: ({ id }) => ({
        url: `activate-mar-category/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    deactivteMoocsCourse: builder.mutation({
      query: ({ id }) => ({
        url: `deactivate-moocs-course/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    activateMoocsCourse: builder.mutation({
      query: ({ id }) => ({
        url: `activate-moocs-course/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),

    adminMoocsData: builder.query({
      query: ({}) => ({
        url: "all-moocs-list",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    verifyMoocs: builder.mutation({
      query: ({ id,email}) => ({
        url: `moocs-verify/${id}`,
        method: "PUT",
        body: {
          email,
        },
        credentials: "include" as const,
      }),
    }),
    rejectMoocs: builder.mutation({
      query: ({ id,email,reason}) => ({
        url: `moocs-reject/${id}`,
        method: "PUT",
        body: {
          email,
          reason
        },
        credentials: "include" as const,
      }),
    }),

    adminMarData: builder.query({
      query: ({}) => ({
        url: "all-mar-list",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    verifyMar: builder.mutation({
      query: ({ id,email}) => ({
        url: `mar-verify/${id}`,
        method: "PUT",
        body: {
          email,
        },
        credentials: "include" as const,
      }),
    }),
    rejectMar: builder.mutation({
      query: ({ id,email,reason}) => ({
        url: `mar-reject/${id}`,
        method: "PUT",
        body: {
          email,
          reason
        },
        credentials: "include" as const,
      }),
    }),

    allStudentData: builder.query({
      query: ({}) => ({
        url: "all-student-details",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    moocsMarStatistics: builder.query({
      query: ({year}) => ({
        url: `moocs-mar-statistics/${year}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAllUsersQuery,
  useActivateAccountMutation,
  useDeactivateAccountMutation,
  useStudentDetailsQuery,
  useAdminMoocsCourseListQuery,
  useAdminMarCategoryListQuery,
  useUploadMoocsCourseMutation,
  useUploadMarCategoryMutation,
  useDeactivteMarCategoryMutation,
  useActivateMarCategoryMutation,
  useDeactivteMoocsCourseMutation,
  useActivateMoocsCourseMutation,
  useAdminMoocsDataQuery,
  useVerifyMoocsMutation,
  useRejectMoocsMutation,
  useAdminMarDataQuery,
  useVerifyMarMutation,
  useRejectMarMutation,
  useAllStudentDataQuery,
  useMoocsMarStatisticsQuery
} = adminApi;
