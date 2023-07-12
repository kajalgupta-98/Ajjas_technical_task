import { atom } from "recoil";
const commentsAtom = atom({
  key: "all comments",
  default: []
});
export { commentsAtom };
