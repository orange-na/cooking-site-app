import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

function Posts() {
  const posts = [
    {
      id: 1,
      username: "Takeshi",
      profileImg: "/img/profileImg.jpg",
      date: "an hour ago",
      cost: "2.56",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur odio rem officiis et nemo autem delectus quam doloremque commodi saepe!",
      postImg: "/img/foodImg.jpg",
    },
    {
      id: 2,
      username: "Takeshi",
      profileImg: "/img/profileImg.jpg",
      date: "an hour ago",
      cost: "2.56",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur odio rem officiis et nemo autem delectus quam doloremque commodi saepe!",
      postImg: "/img/foodImg.jpg",
    },
  ];
  return (
    <div>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="border-b border-gray-300 pb-[30px] flex flex-col gap-4 mb-5"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center text-[13px]">
                <img
                  src={post.profileImg}
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
            <Link to="/post/:id" state={post}>
              <p>{post.desc}</p>
            </Link>
            <img
              src={post.postImg}
              alt=""
              className="object-cover w-full max-h-[450px] rounded-md"
            />
            <div className="ml-[10px]">
              <div>
                <FavoriteBorderOutlinedIcon />
                <span className="ml-1">2</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
