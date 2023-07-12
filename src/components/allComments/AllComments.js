import { useRecoilValue } from "recoil";
import { commentsAtom } from "../../Data";
import Comment from "../comment/Comment";

export default function AllComments() {
  const comments = useRecoilValue(commentsAtom);
  return (
    <div>
      {comments.map((item, index) => {
        return <Comment comment={item} index={index} />;
      })}
    </div>
  );
}
