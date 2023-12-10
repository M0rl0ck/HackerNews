import { IComment } from "../../infostructure/INews";
import DOMPurify from "dompurify";
import styles from "./comment.module.css";
import Comments from "./Comments";

interface ICommentProp {
  comment: IComment;
  choosedNews: { [key: string]: boolean };
  setIsOpen: (id: string) => void;
}

const Comment = ({ comment, choosedNews, setIsOpen }: ICommentProp) => {
  const openComment = () => {
    setIsOpen(comment.id.toString());
  };
  return (
    <div>
      <div
        className={styles.comment}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.text) }}
      ></div>
      {comment.kids && (
        <button onClick={openComment} className={styles.button_open}>
          {choosedNews[comment.id] ? "v" : ">"}
        </button>
      )}
      {choosedNews[comment.id] && comment.kids && (
        <Comments
          ids={comment.kids}
          choosedNews={choosedNews}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default Comment;
