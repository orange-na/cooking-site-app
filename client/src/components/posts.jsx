import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import SearchIcon from "@mui/icons-material/Search";
import { PostsContext } from "../contexts/postsContext";

function Posts() {
  const { posts } = useContext(PostsContext);
  const [likes, setLikes] = useState([
    {
      id: 1,
      likeuserid: 1,
      postid: 1,
    },
  ]);
  const { currentUser } = useContext(AuthContext);

  const getPosts = async () => {
    try {
      // setPosts(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getLikes = async () => {
    try {
      // setLikes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      // getPosts();
      // getLikes();
    } catch (error) {
      console.log(error);
    }
  };

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.post_title.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase()) ||
      post.cost <= parseFloat(search)
  );

  const handleCategory = (e) => {
    setSearch(e.target.textContent);
  };

  useEffect(() => {
    // getPosts();
    // getLikes();
  }, []);

  return (
    <div>
      <div className="mb-[15px]">
        <label
          className="border-[1px] border-gray-300 rounded-lg block w-full px-[10px]"
          htmlFor="search"
        >
          <span className="w-[5%]">
            <SearchIcon sx={{ fontSize: 25, color: "gray" }} />
          </span>
          <input
            type="search"
            className="flex-grow py-[11px] px-[10px] w-[95%]"
            placeholder="Search Meals & Costs"
            id="search"
            value={search}
            onChange={handleSearch}
          />
        </label>
        <div className="flex gap-[5px] mt-[10px]">
          <button
            onClick={handleCategory}
            className="text-gray-700 py-[5px] px-[15px] border-[1px] border-gray-300 rounded-full hover:bg-gray-100 duration-100"
          >
            Breakfast
          </button>
          <button
            onClick={handleCategory}
            className="text-gray-700 py-[5px] px-[15px] border-[1px] border-gray-300 rounded-full hover:bg-gray-100 duration-100"
          >
            Lunch
          </button>
          <button
            onClick={handleCategory}
            className="text-gray-700 py-[5px] px-[15px] border-[1px] border-gray-300 rounded-full hover:bg-gray-100 duration-100"
          >
            Dinner
          </button>
        </div>
      </div>

      {search ? (
        <div className="grid grid-cols-3 gap-x-[15px] gap-y-[30px]">
          {filteredPosts?.map((filteredPost) => {
            return (
              <div
                key={filteredPost.post_id}
                className="rounded-lg flex flex-col shadow-lg border-[1px] border-gray-300 pb-[5px]"
              >
                <div className="relative">
                  <Link
                    to="/single/:id"
                    state={{ filteredPost, likes }}
                    className="flex justify-center"
                  >
                    <img
                      src={filteredPost.img}
                      alt=""
                      className="rounded-t-lg hover:opacity-[85%] duration-200 h-[300px] object-center object-cover w-full"
                    />
                  </Link>
                  <div className="">
                    <p className="absolute top-0 bg-white rounded-br-lg rounded-tl-lg px-[5px]">
                      ${filteredPost.cost}
                    </p>
                    <div className="absolute bottom-[8px] right-[5px] flex items-center gap-[5px]">
                      <div
                        className="flex items-center bg-white px-[10px] py-[1px] rounded-full cursor-pointer"
                        onClick={() => handleLike(filteredPost.post_id)}
                      >
                        {likes.some(
                          (like) =>
                            like.postid === filteredPost.post_id &&
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
                          {filteredPost.like_count}
                        </span>
                      </div>
                      <p className="bg-white px-[10px] py-[1px] rounded-full text-[15px] text-gray-800 font-medium">
                        {filteredPost.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-[10px] py-[5px]">
                  <Link to="/single/:id" state={{ filteredPost, likes }}>
                    <h2 className="font-[500] text-[20px] hover:opacity-[80%] duration-200">
                      {filteredPost.post_title}
                    </h2>
                  </Link>
                  <div className="flex justify-between">
                    <Link to="/profile/:id" state={{ filteredPost, likes }}>
                      <div className="flex items-center gap-[5px] mt-[1px]">
                        <img
                          src={filteredPost.profileicon}
                          alt=""
                          className="w-[30px] h-[30px] rounded-full"
                        />
                        <p>{filteredPost.nickname}</p>
                      </div>
                    </Link>
                    <p className="text-gray-700 text-[15px]">an hour ago</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Posts;
