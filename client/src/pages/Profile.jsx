import { useLocation } from "react-router-dom";
import Posts from "../components/posts";

function Profile() {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <div className="h-[calc(100vh-105px)] basis-2/3 bg-white mx-[20px] mt-[20px] rounded-md p-[20px] overflow-scroll">
        <div className="border-b border-gray-300 pb-[20px] mb-[30px]">
          <div className="relative mb-[110px]">
            <img
              src="/img/proPic.jpg"
              alt=""
              className="w-full object-center object-cover h-[150px] rounded-lg"
            />
            <img
              src={state.profileImg}
              alt=""
              className="absolute rounded-[20px] w-[200px] h-[200px] top-[50px] left-[30px] border-[3px] border-white"
            />
          </div>
          <h2 className="text-[35px] ml-[30px]">{state.username}</h2>
        </div>
        <Posts />
      </div>
    </>
  );
}

export default Profile;
