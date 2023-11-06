import { INews } from "../../infostructure/INews";

interface INewsShort {
  news: INews;
}

const NewsShort = ({ news }: INewsShort) => {
  return (
    <div>
      <h2>{news.title}</h2>
      <p>{news.score}</p>
      <p>Create by: {news.by}</p>
      <p>{new Date(news.time).toDateString()}</p>
    </div>
  );
};

export default NewsShort;
