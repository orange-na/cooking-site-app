import Post from "../components/post";

function Single() {
  return (
    <main className="h-[calc(100vh-105px)] basis-3/4 p-[20px] mx-[20px] mt-[20px] bg-white rounded-md overflow-scroll">
      <Post />
    </main>
  );
}

export default Single;
