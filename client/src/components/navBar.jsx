import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function Navbar() {
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="">
      <div className="flex items-center justify-between h-[85px] px-[40px] bg-white shadow-md">
        <Link to="/">
          <h1 className="">On A Budget</h1>
        </Link>
        <div className="flex items-center gap-10">
          <Link
            to="/profile/:id"
            className="flex items-center"
            state={currentUser}
          >
            {currentUser.profileicon ? (
              <img
                src={currentUser.profileicon}
                alt=""
                className="w-[40px] h-[40px] mr-2 rounded-full bg-gray-300"
              />
            ) : (
              <AccountCircleIcon
                sx={{ fontSize: 35 }}
                className="text-gray-600 mr-2"
              />
            )}
            <span>{currentUser.nickname}</span>
          </Link>
          <Link to="/login">
            <span>Login</span>
          </Link>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/signup">
            <span>Sign up</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
