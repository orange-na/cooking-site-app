import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { AuthContext } from "../contexts/authContext";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/posts/get", {
        withCredentials: true,
      });
      const newData = res.data;
      setPosts(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getLikes = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/likes/get", {
        withCredentials: true,
      });
      setLikes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(likes);

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/likes/add",
        {
          postid: postId,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      getPosts();
      getLikes();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(posts);

  useEffect(() => {
    getPosts();
    getLikes();
  }, []);

  return (
    <div>
      {posts.map((post) => {
        return (
          <div
            key={post.post_id}
            className="border-b border-gray-300 pb-[30px] flex flex-col gap-4 mb-5"
          >
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
              <p className="text-[30px]">${post.cost}</p>
            </div>
            <Link to="/single/:id" state={post}>
              <p>{post.desc}</p>
            </Link>
            <img
              src={post.img}
              alt=""
              className="object-cover w-full max-h-[450px] rounded-md"
            />
            <div className="ml-[10px]">
              <div
                className="flex items-center"
                onClick={() => handleLike(post.post_id)}
              >
                {likes.some(
                  (like) =>
                    like.postid === post.post_id &&
                    like.likeuserid === currentUser.id
                ) ? (
                  <FavoriteOutlinedIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
                <span className="ml-1">{post.like_count} likes</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
