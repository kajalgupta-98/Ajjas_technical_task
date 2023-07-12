import AllComments from "./components/allComments/AllComments";
// import Comment from "./components/comment/Comment";
import CommentBox from "./components/commentBox/CommentBox";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <CommentBox />
      <AllComments />
    </div>
  );
}
