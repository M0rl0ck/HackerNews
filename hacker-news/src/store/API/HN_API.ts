import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl, NEWS, PARAM, ITEM } from "./constants";
import type { INews, IComment } from "../../infostructure/INews";

const hackerNewsApi = createApi({
  reducerPath: "hackerNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (build) => ({
    getNews: build.query<string[], void>({
      query: () => ({
        url: `${NEWS}`,
        params: PARAM,
      }),
    }),
    getItem: build.query<INews | IComment, string>({
      query: (id) => ({
        url: `${ITEM}${id}.json`,
        params: PARAM,
      }),
    }),
  }),
});

export { hackerNewsApi };

export const { useGetNewsQuery, useLazyGetItemQuery, useLazyGetNewsQuery } =
  hackerNewsApi;
