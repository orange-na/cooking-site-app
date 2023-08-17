import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  return (
    <header>
      <div className="flex items-center justify-between h-[85px] px-10">
        <h1 className="">On A Budget</h1>
        <div className="flex items-center gap-10">
          <Link to="/profile/:id" className="flex items-center">
            <AccountCircleIcon
              sx={{ fontSize: 35 }}
              className="text-gray-600 mr-2"
            />
            <span>Domo Name</span>
          </Link>
          <Link to="/login">
            <span>Login</span>
          </Link>
          <span>Logout</span>
          <Link to="/signup">
            <span>Sign up</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
