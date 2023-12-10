import { useState } from "react";
import { INews } from "../../infostructure/INews";
import Comments from "../Comments/Comments";
import styles from "./newsFull.module.css";
import Loading from "../Loading/Loading";

interface INewsFull {
  news: INews;
  isUpdateComments: boolean;
}

const NewsShort = ({ news, isUpdateComments }: INewsFull) => {
  const [isCommentChecked, setIsCommentChecked] = useState<{
    [key: string]: boolean;
  }>({});

  const setIsOpen = (id: string) => {
    const isOpen = isCommentChecked[id] ? false : true;
    setIsCommentChecked((prev) => {
      return { ...prev, ...{ [id]: isOpen } };
    });
  };

  return (
    <>
      <div className={styles.news}>
        <h2>{news.title}</h2>
        <p>Score: {news.score}</p>
        <p>
          Create by: <span className={styles.autorName}>{news.by}</span>
        </p>
        <p>{new Date(news.time).toDateString()}</p>
        <a href={news.url} className={styles.link}>
          {news.url}
        </a>
        <p>Comments: {news.descendants}</p>
      </div>

      {isUpdateComments && <Loading />}
      {news.kids && !isUpdateComments && (
        <Comments
          ids={news.kids}
          choosedNews={isCommentChecked}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default NewsShort;
