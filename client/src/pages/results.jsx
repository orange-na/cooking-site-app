import { useNavigate } from "react-router-dom";
import { PostsContext } from "../contexts/postsContext";
import { ResultsContext } from "../contexts/resultsContext";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import SearchIcon from "@mui/icons-material/Search";

function Results() {
  // const [results, setResults] = useState([]);
  // const { results, setResults } = useContext(ResultsContext);
  // const navigate = useNavigate();
  // const { posts } = useContext(PostsContext);

  // const [search, setSearch] = useState("");

  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  //   console.log(search);
  // };

  // const filteredPosts = posts.filter((post) =>
  //   post.post_title.includes(results.data.title)
  // );
  // console.log(results.data.title);
  // console.log(posts[0].title);

  // console.log(filteredPosts);

  // const handleCategory = (e) => {
  //   setSearch(e.target.textContent);
  // };

  // console.log(posts);

  // useEffect(() => {
  //   setResults(JSON.parse(localStorage.getItem("results")));
  // }, []);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { results, setResults } = useContext(ResultsContext);

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

  const handleReset = () => {
    setResults(null);
    localStorage.setItem("results", null);
    navigate("/simulate");
  };

  const filteredPosts = posts.filter((post) =>
    results?.data.map((result) => result?.title).includes(post?.post_title)
  );

  useEffect(() => {
    getPosts();
    getLikes();
  }, []);

  return (
    <main className="h-[calc(100vh-105px)] basis-3/4 p-[20px] mx-[20px] mt-[20px] bg-white rounded-md overflow-scroll">
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
                    src={`/upload/${filteredPost.img}`}
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
      <div className="text-center w-full mt-[70px] mb-[50px]">
        <button
          className="bg-purple-500 px-[30px] py-[15px] rounded-lg text-white hover:bg-purple-600 duration-200 text-center w-1/2"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </main>
  );
}

export default Results;
