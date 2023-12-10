import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { INews } from "../../infostructure/INews";

interface newsState {
  news: INews[];
}

const initialState: newsState = {
  news: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<INews>) => {
      state.news = [...state.news, action.payload];
    },
    clearNews: (state) => {
      state.news = [];
    },
  },
});

const { addNews, clearNews } = newsSlice.actions;
const selectNews = (state: RootState) => state.news.news;

export default newsSlice.reducer;
export { addNews, clearNews, selectNews, newsSlice };
