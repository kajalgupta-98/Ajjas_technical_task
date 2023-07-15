import style from "./comment.module.css";
// import CommentBox from "../commentBox/CommentBox";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { commentsAtom } from "../../Data";

export default function Comment({ comment, index }) {
  const [showInputBox, setShowInputBox] = useState(false);
  const [score, setScore] = useState(0);
  const [reply, setReply] = useState("");
  const [comments, setComments] = useRecoilState(commentsAtom);
  const currentComment = comment;
  const currentCommentText = comment.parentComment;

  function handleReply() {
    setShowInputBox(!showInputBox);
  }
  function handleSendReply(index) {
    const currentCommentReplies = comments[index].replies || [];
    const updatedReplies = [
      ...currentCommentReplies,
      {
        parentComment: reply,
        upvotes: 0,
        downvotes: 0,
        replies: []
      }
    ];
    const updated = { ...currentComment, replies: updatedReplies };
    const commentsArray = [...comments];
    commentsArray.splice(index, 1, updated);
    // commentsArray.splice(index,)
    setComments([...commentsArray]);
    // console.log(comments);
    setReply("");
    setShowInputBox(false);
  }

  function handleUpvote(index) {
    const updated = comments.map((item, ind) => {
      if (item.parentComment == currentCommentText && ind === index) {
        return {
          ...item,
          upvotes: item.upvotes + 1
        };
      }
      return item;
    });
    setScore(score + 1);
    setComments(updated);
  }

  function handleDownvote(index) {
    const updated = comments.map((item, ind) => {
      if (ind === index) {
        return {
          ...item,
          downvotes: item.downvotes + 1
        };
      }
      return item;
    });
    setScore(score - 1);
    setComments(updated);
  }

  return (
    <div className={style.commentContainer}>
      {comment.parentComment}
      <span>
        <p>{score}</p>
        <p onClick={() => handleUpvote(currentCommentText, index)}>
          <AiOutlineArrowUp size={25} />
          {comment.upvotes}
        </p>
        <p onClick={() => handleDownvote(index)}>
          <AiOutlineArrowDown size={25} />
          {comment.downvotes}
        </p>
        <button className={style.replyBtn} onClick={handleReply}>
          reply
        </button>
      </span>
      {showInputBox && (
        <div className={style.container}>
          <input
            type="text"
            placeholder="Reply here..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <button onClick={() => handleSendReply(index)}>Send</button>
        </div>
      )}
      <div>
        {comment.replies.map((item, index) => {
          return <Comment comment={item} index={index} />;
        })}
      </div>
    </div>
  );
}
