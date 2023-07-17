import style from "./comment.module.css";
// import CommentBox from "../commentBox/CommentBox";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { commentsAtom, repliesAtom } from "../../Data";

export default function Comment({ comment, index }) {
  const [showInputBox, setShowInputBox] = useState(false);
  const [score, setScore] = useState(0);
  const [reply, setReply] = useState("");
  const [comments, setComments] = useRecoilState(commentsAtom);
  const [replies, setReplies] = useRecoilState(repliesAtom);
  const currentComment = comment;

  function handleReply() {
    setShowInputBox(!showInputBox);
  }

  function handleSendReply(index) {
    const currentCommentReplies = comments[index].replies || [];
    const updatedReplies = [
      ...currentCommentReplies,
      {
        id: Math.floor(Math.random() * 4000) + 1000,
        parentComment: reply,
        upvotes: 0,
        downvotes: 0,
        replies: []
      }
    ];
    setReplies(updatedReplies);
    const updated = { ...currentComment, replies: updatedReplies };
    const commentsArray = [...comments];
    commentsArray.splice(index, 1, updated);
    setComments([...commentsArray]);
    // console.log(comments);
    setReply("");
    setShowInputBox(false);
  }

  function handleUpvote(currentComment, index) {
    if (comments[index].id === currentComment.id) {
      const updated = comments.map((item, ind) => {
        if (item.id === comment.id) {
          return {
            ...item,
            upvotes: item.upvotes + 1
          };
        }
        return item;
      });

      setComments(updated);
    }
    // else if (replies[index].id === currentComment.id) {
    //   const updatedReplies = replies.map((item, ind) => {
    //     if (item.id === comment.id) {
    //       return {
    //         ...item,
    //         upvotes: item.upvotes + 1
    //       };
    //     }
    //     return item;
    //   });

    //   setReplies(updatedReplies);
    //   const ind = comments.indexOf(currentComment)
    //   const updated = { ...currentComment, replies: updatedReplies };
    //   const commentsArray = [...comments];
    //   commentsArray.splice(index, 1, updated);
    //   setComments([...commentsArray]);
    // }
    setScore(score + 1);
  }

  function handleDownvote(index) {
    if (comments[index].id === currentComment.id) {
      const updated = comments.map((item, ind) => {
        if (item.id === comment.id) {
          return {
            ...item,
            downvotes: item.downvotes + 1
          };
        }
        return item;
      });

      setComments(updated);
    }
    setScore(score - 1);
  }

  return (
    <div className={style.commentContainer}>
      {comment.parentComment}
      <span>
        <p>{score}</p>
        <p onClick={() => handleUpvote(currentComment, index)}>
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
