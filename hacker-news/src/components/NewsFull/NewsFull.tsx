import { useState } from "react";
import { INews } from "../../infostructure/INews";
import Comments from "../Comments/Comments";

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
    <div>
      <h2>{news.title}</h2>
      <p>{news.score}</p>
      <p>Create by: {news.by}</p>
      <p>{new Date(news.time).toDateString()}</p>
      <a href={news.url}>{news.url}</a>
      <p>Comments: {news.descendants}</p>
      {isUpdateComments && <p>Loading...</p>}
      {news.kids && !isUpdateComments && (
        <Comments
          ids={news.kids}
          choosedNews={isCommentChecked}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default NewsShort;
