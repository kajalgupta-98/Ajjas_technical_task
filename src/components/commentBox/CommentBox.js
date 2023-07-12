import { useState } from "react";
import { useRecoilState } from "recoil";
import { commentsAtom } from "../../Data";
import style from "./commentBox.module.css";

export default function CommentBox() {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useRecoilState(commentsAtom);

  function handleComment() {
    setComments([
      ...comments,
      {
        parentComment: newComment,
        upvotes: 0,
        downvotes: 0,
        replies: []
      }
    ]);
    setNewComment("");
  }
  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Comment here..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleComment}>Send</button>
    </div>
  );
}
