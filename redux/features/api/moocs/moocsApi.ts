import { apiSlice } from "../apiSlice";
import { myMar, myMoocs } from "./moocsSlice";

export const moocsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadMoocs: builder.mutation({
      query: ({ title, startDate, endDate, year, verificationUrl, file }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("year", year);
        formData.append("verificationUrl", verificationUrl);
        formData.append("file", file); // Append the file to FormData

        return {
          url: "upload-moocs",
          method: "POST",
          body: formData,
          credentials: "include" as const,
        };
      },
    }),
    myMoocs: builder.query({
      query: (data) => ({
        url: "my-moocs",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            myMoocs({
              myMoocs: result.data.moocs,
              totalCreditPoints: result.data.totalCreditPoints,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    loadMoocsList: builder.query({
      query: (data) => ({
        url: "moocs-list",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteMyMoocs: builder.mutation({
      query: (id) => ({
        url: `delete-moocs/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    uploadMar: builder.mutation({
      query: ({ title, category, year, date, file }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("year", year);
        formData.append("category", category);
        formData.append("date", date);
        formData.append("file", file);

        return {
          url: "upload-mar",
          method: "POST",
          body: formData,
          credentials: "include" as const,
        };
      },
    }),
    myMar: builder.query({
      query: (data) => ({
        url: "mar-list",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            myMar({
              myMar: result.data.mar,
              totalMarPoints: result.data.totalMarPoints,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    marCategoryList: builder.query({
      query: (data) => ({
        url: "mar-category-list",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteMyMar: builder.mutation({
      query: (id) => ({
        url: `delete-mar/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUploadMoocsMutation,
  useMyMoocsQuery,
  useLoadMoocsListQuery,
  useDeleteMyMoocsMutation,
  useUploadMarMutation,
  useMarCategoryListQuery,
  useMyMarQuery,
  useDeleteMyMarMutation
} = moocsApi;
