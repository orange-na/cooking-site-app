import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { PostsContext } from "../contexts/postsContext";

function Profile() {
  const { state } = useLocation();
  const { posts } = useContext(PostsContext);
  const [likes, setLikes] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const handleLike = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className="h-[calc(100vh-105px)] basis-3/4 bg-white mx-[20px] mt-[20px] rounded-md p-[20px] overflow-scroll">
        <div className="border-b border-gray-300 pb-[20px] mb-[30px]">
          <div className="relative mb-[110px]">
            {state.profileimg ? (
              <img
                src="/img/proPic.jpg"
                alt=""
                className="w-full object-center object-cover h-[150px] rounded-lg"
              />
            ) : (
              <div className="w-full object-center object-cover h-[150px] rounded-lg bg-gray-500"></div>
            )}
            {state.profileicon ? (
              <img
                src={state.profileicon}
                alt=""
                className="absolute rounded-[20px] w-[200px] h-[200px] top-[50px] left-[30px] border-[3px] border-white"
              />
            ) : (
              <div className="absolute rounded-[20px] w-[200px] h-[200px] top-[50px] left-[30px] border-[3px] border-white bg-gray-400"></div>
            )}
          </div>
          <h2 className="text-[35px] ml-[30px]">{state.username}</h2>
        </div>

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
                      src={post.img}
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
    </>
  );
}

export default Profile;
