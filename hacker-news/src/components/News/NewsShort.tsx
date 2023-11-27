import { INews } from "../../infostructure/INews";
import { useNavigate } from "react-router-dom";

interface INewsShort {
  news: INews;
}

const NewsShort = ({ news }: INewsShort) => {
  const navigate = useNavigate();
  function redirectToNews() {
    navigate(`/news/${news.id}`);
  }

  return (
    <div onClick={redirectToNews}>
      <h2>{news.title}</h2>
      <p>{news.score}</p>
      <p>Create by: {news.by}</p>
      <p>{new Date(news.time).toDateString()}</p>
    </div>
  );
};

export default NewsShort;
