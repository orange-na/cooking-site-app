import { Link } from "react-router-dom";
import Posts from "../components/posts";

function Home() {
  return (
    <main className="h-[calc(100vh-105px)] basis-2/3 p-[20px] mx-[20px] mt-[20px] bg-white rounded-md overflow-scroll">
      <div className="">
        <Posts />
        <Link to="/publish">
          <button className="bg-slate-700 text-white text-[25px] px-[20px] py-[9px] rounded-full absolute bottom-[20px] right-[40px] hover:bg-slate-800 duration-200">
            +
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Home;
