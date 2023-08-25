import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";

function Liked() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/likes/getuser", {
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

  useEffect(() => {
    getPosts();
    getLikes();
  }, []);
  return (
    <main className="h-[calc(100vh-105px)] basis-3/4 p-[20px] mx-[20px] mt-[20px] bg-white rounded-md overflow-scroll shadow-xl">
      <div className="">
        <div className="grid grid-cols-3 gap-x-[15px] gap-y-[30px]">
          {posts.map((post) => {
            return (
              <div
                key={post.post_id}
                className="rounded-lg flex flex-col shadow-lg border-[1px] border-gray-300 pb-[5px]"
              >
                <div className="relative">
                  <Link
                    to="/single/:id"
                    state={{ post, likes }}
                    className="flex justify-center"
                  >
                    <img
                      src={`/upload/${post.img}`}
                      alt=""
                      className="rounded-t-lg hover:opacity-[85%] duration-200 h-[300px] object-center object-cover w-full"
                    />
                  </Link>
                  <div className="">
                    <p className="absolute top-0 bg-white rounded-br-lg rounded-tl-lg px-[5px]">
                      ${post.cost}
                    </p>
                    <div className="absolute bottom-[8px] right-[5px] flex items-center gap-[5px]">
                      <div
                        className="flex items-center bg-white px-[10px] py-[1px] rounded-full cursor-pointer"
                        onClick={() => handleLike(post.post_id)}
                      >
                        {likes.some(
                          (like) =>
                            like.postid === post.post_id &&
                            like.likeuserid === currentUser.id
                        ) ? (
                          <FavoriteOutlinedIcon
                            sx={{ fontSize: 17, color: "red" }}
                            className=""
                          />
                        ) : (
                          <FavoriteBorderOutlinedIcon sx={{ fontSize: 17 }} />
                        )}
                        <span className="ml-1 text-[15px]">
                          {post.like_count}
                        </span>
                      </div>
                      <p className="bg-white px-[10px] py-[1px] rounded-full text-[15px] text-gray-800 font-medium">
                        {post.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-[10px] py-[5px]">
                  <Link to="/single/:id" state={{ post, likes }}>
                    <h2 className="font-[500] text-[20px] hover:opacity-[80%] duration-200">
                      {post.post_title}
                    </h2>
                  </Link>
                  <div className="flex justify-between">
                    <Link to="/profile/:id" state={{ post, likes }}>
                      <div className="flex items-center gap-[5px] mt-[1px]">
                        <img
                          src={post.profileicon}
                          alt=""
                          className="w-[30px] h-[30px] rounded-full"
                        />
                        <p>{post.nickname}</p>
                      </div>
                    </Link>
                    <p className="text-gray-700 text-[15px]">an hour ago</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Liked;
