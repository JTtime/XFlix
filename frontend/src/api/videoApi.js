import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const SAMPLE_BASE_URL = 'https://xflix-nodejs-server.onrender.com/v1';

const videoApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://2fa05a82-cb6a-467f-9650-0a307ef17311.mock.pstmn.io/v1' }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => '/videos',
    }),
    getVideoById: builder.query({
      query: (id) => `/videos/${id}`,
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoByIdQuery } = videoApi;
export default videoApi;