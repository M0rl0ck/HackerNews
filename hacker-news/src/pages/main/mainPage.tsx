import { useEffect, useState } from "react";
import {
  useLazyGetNewsQuery,
  useLazyGetItemQuery,
} from "../../store/API/HN_API";
import type { INews } from "../../infostructure/INews";
import NewsShort from "../../components/News/NewsShort";
import styles from "./mainPage.module.css";
import ButtonReload from "../../components/Button/ButtonReload";
import Loading from "../../components/Loading/Loading";

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
    const idInterval = setInterval(() => {
      getNewsList();
    }, 60000);
    return () => {
      clearInterval(idInterval);
    };
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
    <section className={styles.mainContainer}>
      <div className={styles.newsContainer}>
        {(isFetching || isLoading) && <Loading font_size="32px" />}
        {news &&
          !isFetching &&
          !!news.length &&
          news.map((el) => <NewsShort key={el.id} news={el} />)}
      </div>
      <div className={styles.buttonContainer}>
        <ButtonReload
          callBack={() => {
            getNewsList();
          }}
          text="Reload"
        />
      </div>
    </section>
  );
};

export default MainPage;
