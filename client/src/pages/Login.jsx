import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="w-screen h-screen bg-slate-200 flex justify-center items-center">
        <div className="bg-white p-10 flex items-center justify-center flex-col text-center shadow-xl w-[40%] rounded-lg">
          <h2 className="mb-5 text-[25px]">Log in</h2>
          <div className="flex justify-between flex-col gap-5 w-full">
            <input
              name="username"
              className="py-4 px-4 border-b border-gray-300 rounded-md"
              type="text"
              placeholder="Username"
            />
            <input
              name="password"
              className="py-4 px-4 border-b border-gray-300 rounded-md"
              type="Password"
              placeholder="password"
            />
            <button className="bg-green-500 py-2 px-4 rounded-md text-white mt-5 hover:bg-green-600 duration-200">
              Log in
            </button>
            <p>
              You do not have an account??
              <Link
                to="/signup"
                className="text-red-400 hover:text-red-500 duration-200 ml-3"
              >
                Sing up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
