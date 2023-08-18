import { useLocation } from "react-router-dom";

function Post() {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="">
      <div>Post</div>
    </div>
  );
}

export default Post;
