import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
   baseUrl: "http://127.0.0.1:9636"
  }),
  endpoints: () => ({}),
});


export default apiSlice