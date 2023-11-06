import { configureStore } from "@reduxjs/toolkit";
import newsReduser from "./redusers/newsSlice";
import { hackerNewsApi } from "./API/HN_API";

const store = configureStore({
  reducer: {
    [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,
    news: newsReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hackerNewsApi.middleware),
});
type RootState = ReturnType<typeof store.getState>;
type AppStore = typeof store;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppStore, AppDispatch };
export default store;
