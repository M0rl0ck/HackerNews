import { INews } from "../../infostructure/INews";
import { useNavigate } from "react-router-dom";
import styles from "./newsShort.module.css";

interface INewsShort {
  news: INews;
}

const NewsShort = ({ news }: INewsShort) => {
  const navigate = useNavigate();
  function redirectToNews() {
    navigate(`/news/${news.id}`);
  }

  return (
    <div className={styles.news} onClick={redirectToNews}>
      <h2>{news.title}</h2>
      <p>Score: {news.score}</p>
      <p>
        Create by: <span className={styles.autorName}>{news.by}</span>
      </p>
      <p>{new Date(news.time).toDateString()}</p>
    </div>
  );
};

export default NewsShort;
