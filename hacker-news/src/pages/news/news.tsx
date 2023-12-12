import { useLoaderData, useNavigate } from "react-router-dom";
import { useGetItemQuery, useLazyGetItemQuery } from "../../store/API/HN_API";
import type { INews } from "../../infostructure/INews";
import { useEffect, useState } from "react";
import NewsFull from "../../components/NewsFull/NewsFull";
import styles from "./news.module.css";
import ButtonReload from "../../components/Button/ButtonReload";
import Loading from "../../components/Loading/Loading";

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
    if (!data && !isFetching) {
      navigate("/404");
    }
  }, [data, isFetching, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <ButtonReload callBack={() => navigate("/")} text="Back" />
        <ButtonReload callBack={updateNews} text="Reload comments" />
      </div>

      <div className={styles.newsContainer}>
        {isFetching && !news && <Loading font_size="28px" />}
        {news && <NewsFull news={news} isUpdateComments={isUpdateComments} />}
      </div>
    </div>
  );
};

export default NewsPage;
