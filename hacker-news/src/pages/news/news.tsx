import { useLoaderData, useNavigate } from "react-router-dom";
import { useGetItemQuery, useLazyGetItemQuery } from "../../store/API/HN_API";
import type { INews } from "../../infostructure/INews";
import { useEffect, useState } from "react";
import NewsFull from "../../components/NewsFull/NewsFull";

const NewsPage = () => {
  const navigate = useNavigate();
  const { id } = useLoaderData() as { id: string };
  const { data, isFetching } = useGetItemQuery(id);
  const [getNews, { isFetching: isUpdateComments }] = useLazyGetItemQuery();
  const [news, setNews] = useState<INews>();

  async function updateNews() {
    const updatedNews = await getNews(id);
    if (updatedNews.data && updatedNews.data.type === "story") {
      setNews(updatedNews.data);
    }
  }

  useEffect(() => {
    if (data) {
      if (data.type === "story") {
        setNews(data);
      }
    }
  }, [data]);

  return (
    <div>
      <button onClick={() => navigate("/")}>Назад</button>
      <button onClick={updateNews}>Reload comments</button>
      {isFetching && !news && <p>Loading...</p>}
      {news && <NewsFull news={news} isUpdateComments={isUpdateComments} />}
    </div>
  );
};

export default NewsPage;
