import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import SearchIcon from "@mui/icons-material/Search";
import { PostsContext } from "../contexts/postsContext";

function Navbar() {
  const { logout, currentUser } = useContext(AuthContext);
  const { posts } = useContext(PostsContext);
  const navigate = useNavigate();

  console.log(posts);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="">
      <div className="flex items-center justify-between h-[85px] px-[40px] bg-white shadow-md">
        <Link to="/">
          <h1 className="font-[800] text-[20px]">OnBudget</h1>
        </Link>
        <div className="flex items-center gap-[25px]">
          {/* <label
            className="border-[1px] border-gray-300 px-[10px] rounded-lg  w-[350px]"
            htmlFor="search"
          >
            <SearchIcon sx={{ fontSize: 25, color: "gray" }} />
            <input
              type="search"
              className="py-[10px] px-[5px] w-[90%]"
              placeholder="Search"
              id="search"
            />
          </label> */}
          <Link
            to="/profile/:id"
            className="flex items-center"
            state={currentUser}
          >
            {currentUser.profileicon ? (
              <img
                src={currentUser.profileicon}
                alt=""
                className="w-[40px] h-[40px] rounded-full bg-gray-300"
              />
            ) : (
              <AccountCircleIcon
                sx={{ fontSize: 35 }}
                className="text-gray-600 mr-2"
              />
            )}
            {/* <span>{currentUser.nickname}</span> */}
          </Link>
          {currentUser ? null : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-green-500 py-[8px] px-[15px] text-white rounded-lg hover:bg-green-600 duration-200"
          >
            Logout
          </button>
          <Link
            to="/signup"
            className="bg-green-500 py-[8px] px-[15px] text-white rounded-lg hover:bg-green-600 duration-200"
          >
            <span>Sign up</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
