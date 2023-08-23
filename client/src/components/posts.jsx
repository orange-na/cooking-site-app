import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
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
    // <div className="">
    //   {posts.map((post) => {
    //     return (
    //       <div
    //         key={post.post_id}
    //         className="border-b border-gray-300 pb-[30px] flex flex-col gap-4 mb-5"
    //       >
    //         <div className="flex justify-between items-center">
    //           <div className="flex items-center text-[13px]">
    //             <img
    //               src={post.profileicon}
    //               alt=""
    //               className="w-[50px] h-[50px] rounded-full object-cover mr-3"
    //             />
    //             <div className="flex flex-col">
    //               <Link to="/profile/:id" state={post}>
    //                 <p className="text-[18px] font-semibold">{post.username}</p>
    //               </Link>
    //               <p>{post.date} an hour ago</p>
    //             </div>
    //           </div>
    //           <div className="flex items-center gap-[20px]">
    //             <p className="text-[20px]">{post.category}</p>
    //             <p className="text-[30px]">${post.cost}</p>
    //           </div>
    //         </div>
    //         <Link to="/single/:id" state={{ post, likes }}>
    //           <p className="text-[25px]">{post.post_title}</p>
    //         </Link>
    //         <img
    //           src={post.img}
    //           alt=""
    //           className="object-cover w-full max-h-[450px] rounded-md"
    //         />
    //         <div className="ml-[10px]">
    // <div
    //   className="flex items-center"
    //   onClick={() => handleLike(post.post_id)}
    // >
    //   {likes.some(
    //     (like) =>
    //       like.postid === post.post_id &&
    //       like.likeuserid === currentUser.id
    //   ) ? (
    //     <FavoriteOutlinedIcon />
    //   ) : (
    //     <FavoriteBorderOutlinedIcon />
    //   )}
    //   <span className="ml-1">{post.like_count} likes</span>
    // </div>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>

    <div className="grid grid-cols-3 gap-x-[15px] gap-y-[30px]">
      {posts.map((post) => {
        return (
          <div
            key={post.post_id}
            className="rounded-lg flex flex-col shadow-lg border-[1px] border-gray-300 pb-[15px]"
          >
            <div className="relative">
              <Link to="/single/:id" state={{ post, likes }}>
                <img
                  src={`/upload/${post.img}`}
                  alt=""
                  className="rounded-t-lg hover:opacity-[85%] duration-200"
                />
              </Link>
              <div className="">
                <p className="absolute top-0 bg-white rounded-br-lg rounded-tl-lg px-[5px]">
                  ${post.cost}
                </p>
                <div className="absolute bottom-[5px] right-[5px] flex items-center gap-[5px]">
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
                    <span className="ml-1 text-[15px]">{post.like_count}</span>
                  </div>
                  <p className="bg-white px-[10px] py-[1px] rounded-full text-[15px]">
                    {post.category}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-[20px] py-[5px]">
              <Link to="/single/:id" state={{ post, likes }}>
                <h2 className="font-[500] text-[20px] hover:opacity-[80%] duration-200">
                  {post.post_title}
                </h2>
              </Link>
              <Link to="/profile/:id" state={post}>
                <div className="flex items-center gap-[5px] mt-[5px]">
                  <img
                    src={post.profileicon}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  <p>{post.nickname}</p>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
