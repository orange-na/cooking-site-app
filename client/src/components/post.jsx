import { Link, useLocation } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function Post() {
  const { state } = useLocation();
  const { currentUser } = useContext(AuthContext);
  const post = state.post;
  const likes = state.likes;
  return (
    <div className="">
      <div>
        <div className="pb-[30px] flex flex-col gap-4 mb-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-[13px]">
              <img
                src={post.profileicon}
                alt=""
                className="w-[55px] h-[55px] rounded-full object-cover mr-3"
              />
              <div>
                <Link to="/profile/:id" state={post}>
                  <p className="text-[15px] font-semibold">{post.username}</p>
                </Link>
                <p>{post.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-[20px]">
              <p className="text-[25px]">{post.category}</p>
              <p className="text-[30px]">${post.cost}</p>
            </div>
          </div>
          <Link to="/single/:id" state={{ post, likes }}>
            <p className="text-[40px]">{post.post_title}</p>
          </Link>
          <p>{post.post_desc}</p>
          <img
            src={`/upload/${post.img}`}
            alt=""
            className="object-cover w-full max-h-[450px] rounded-md"
          />
          <div className="ml-[10px]">
            <div className="flex items-center">
              {/* {likes.some(
                (like) =>
                  like.postid === post.post_id &&
                  like.likeuserid === currentUser.id
              ) ? (
                <FavoriteOutlinedIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )} */}
              <span className="ml-1">{post.like_count} likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
