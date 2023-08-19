import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    nickname: "",
  });

  const handleChanged = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/signup",
        inputs,
        { withCredentials: true }
      );
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(inputs);
  return (
    <>
      <div className="w-screen h-screen bg-slate-200 flex justify-center items-center">
        <div className="bg-white p-10 flex items-center justify-center flex-col text-center shadow-xl w-[40%] rounded-lg">
          <h2 className="mb-5 text-[25px]">Sign up</h2>
          <div className="flex justify-between flex-col gap-5 w-full">
            <input
              name="username"
              className="py-4 px-4 border-b border-gray-300 rounded-md"
              type="text"
              onChange={handleChanged}
              placeholder="Username"
            />
            <input
              name="password"
              className="py-4 px-4 border-b border-gray-300 rounded-md"
              type="password"
              onChange={handleChanged}
              placeholder="Password"
            />
            <input
              name="email"
              className="py-4 px-4 border-b border-gray-300 rounded-md"
              type="email"
              onChange={handleChanged}
              placeholder="Email"
            />
            <input
              name="nickname"
              className="py-4 px-4 border-b border-gray-300 rounded-md"
              type="text"
              onChange={handleChanged}
              placeholder="Nickname"
            />
            <button
              className="bg-green-500 py-2 px-4 rounded-md text-white mt-5 hover:bg-green-600 duration-200"
              onClick={handleSignup}
            >
              Sign up
            </button>
            <p>
              Do you have an account??
              <Link
                to="/login"
                className="text-red-400 hover:text-red-500 duration-200 ml-3"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
