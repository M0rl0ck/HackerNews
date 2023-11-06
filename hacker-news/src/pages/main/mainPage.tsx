import { useEffect, useState } from "react";
import { useGetNewsQuery, useLazyGetItemQuery } from "../../store/API/HN_API";
import type { INews } from "../../infostructure/INews";
import NewsShort from "../../components/News/News";

const MainPage = () => {
  const { data, isFetching } = useGetNewsQuery();
  const [getItem] = useLazyGetItemQuery();
  const [news, setNews] = useState<INews[]>([]);

  useEffect(() => {
    async function getNews(data: string[]) {
      let tempNews = 0;
      let index = 0;
      while (tempNews <= 100 && index < data.length) {
        const { data: a } = await getItem(data[index]);
        if (a && a.type === "story") {
          tempNews++;
          setNews((prev) => [...prev, a]);
        }
        index++;
      }
    }
    if (data) {
      setNews([]);
      getNews(data);
    }
  }, [data, getItem]);

  return (
    <div>
      {isFetching && <h1>Loading...</h1>}
      {news &&
        !!news.length &&
        news.map((el) => <NewsShort key={el.id} news={el} />)}
    </div>
  );
};

export default MainPage;
