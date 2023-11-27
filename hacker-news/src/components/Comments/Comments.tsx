import { IComment } from "../../infostructure/INews";
import { useEffect, useState } from "react";
import { useLazyGetItemQuery } from "../../store/API/HN_API";
import Comment from "./Comment";
import styles from "./comments.module.css";

interface IComments {
  ids: number[];
  choosedNews: { [key: string]: boolean };
  setIsOpen: (id: string) => void;
}

const Comments = ({ ids, choosedNews, setIsOpen }: IComments) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [getComment, { isFetching }] = useLazyGetItemQuery();

  useEffect(() => {
    async function getComments(ids: number[]) {
      const commentsPromise = [];
      for (let i = 0; i < ids.length; i++) {
        commentsPromise.push(getComment(ids[i].toString()));
      }
      const commentsAll = await Promise.all(commentsPromise);
      setComments([
        ...commentsAll
          .map((el) => el.data as IComment)
          .filter((comment) => !comment.deleted && !comment.dead),
      ]);
    }

    getComments(ids);
  }, [getComment, ids]);
  return (
    <>
      {isFetching && <p>Loading...</p>}
      {comments && (
        <div className={styles.comments}>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              choosedNews={choosedNews}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
