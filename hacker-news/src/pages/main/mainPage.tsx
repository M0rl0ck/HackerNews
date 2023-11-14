import { useEffect, useState } from "react";
import {
  useLazyGetNewsQuery,
  useLazyGetItemQuery,
} from "../../store/API/HN_API";
import type { INews } from "../../infostructure/INews";
import NewsShort from "../../components/News/News";
import styles from "./mainPage.module.css";

enum NEWS {
  LENGTH_SLICE_NEWS = 10,
  AMOUN_NEWS = 100,
}

const MainPage = () => {
  const [isLoading, setIsloading] = useState(false);
  const [getItem] = useLazyGetItemQuery();
  const [news, setNews] = useState<INews[]>([]);
  const [getNewsList, { data, isFetching }] = useLazyGetNewsQuery();

  useEffect(() => {
    getNewsList();
  }, [getNewsList]);

  useEffect(() => {
    async function getSliceNews(list: string[]) {
      const stories = [];
      for (let i = 0; i < list.length && i < NEWS.LENGTH_SLICE_NEWS; i++) {
        stories.push(getItem(list[i]));
      }
      const promisesStories = await Promise.all(stories);
      setNews((prev) => [
        ...prev,
        ...promisesStories.map((el) => el.data as INews),
      ]);
      setIsloading(false);
    }

    async function getNews(data: string[]) {
      setIsloading(true);
      const listStoriesId = [...data];
      let index = 0;
      while (index < listStoriesId.length && index < NEWS.AMOUN_NEWS) {
        getSliceNews(listStoriesId.slice(index));
        index += NEWS.LENGTH_SLICE_NEWS;
      }
    }
    if (data) {
      setNews([]);
      getNews(data);
    }
  }, [data, getItem]);

  return (
    <section>
      <div>
        {(isFetching || isLoading) && <h1>Loading...</h1>}
        {news &&
          !!news.length &&
          news.map((el) => <NewsShort key={el.id} news={el} />)}
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            getNewsList();
          }}
        >
          Reload
        </button>
      </div>
    </section>
  );
};

export default MainPage;
