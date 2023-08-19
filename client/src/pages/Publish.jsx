import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function Publish() {
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [inputs, setInputs] = useState({
    title: "",
    cost: null,
  });

  const handleChanged = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePost = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/posts/add",
        { ...inputs, cat: cat, desc: desc, img: "/img/foodImg.jpg" },
        { withCredentials: true }
      );
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(inputs);
  console.log(desc);
  console.log(cat);

  const file = false;
  return (
    <>
      <div className="h-[calc(100vh-105px)] basis-2/3 bg-white mx-[20px] mt-[20px] rounded-md p-[20px] overflow-scroll">
        <div className="flex">
          <img
            src="/img/profileImg.jpg"
            alt=""
            className="w-[55px] h-[55px] rounded-full object-cover mr-3"
          />
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="border border-gray-200 rounded-md w-full px-[20px] py-[10px]"
            onChange={handleChanged}
          />
        </div>
        <div className="flex mt-[25px] ">
          <div className="h-[500px] basis-2/3">
            <ReactQuill
              className="h-full"
              theme="snow"
              value={desc}
              onChange={setDesc}
            />
          </div>
          <div className="basis-1/3 ml-[15px]">
            <div className="flex items-center">
              <p className="text-[20px]">
                <span className="font-[700]">Cost:</span> $
              </p>
              <input
                type="number"
                name="cost"
                placeholder="How much?"
                className="text-[20px] py-[5px] px-[2px] border border-gray-200 rounded-md"
                onChange={handleChanged}
              />
            </div>
            <div className="flex items-center mt-[20px]">
              <h1 className="text-[20px] font-[700] mr-[10px]">Upload: </h1>

              <input className="hidden" type="file" id="file" />
              {file ? (
                <label
                  htmlFor="file"
                  className="border-2 py-2 px-4 text-center rounded-lg duration-200 bg-green-300 cursor-pointer text-white"
                >
                  Uploded
                </label>
              ) : (
                <label
                  htmlFor="file"
                  className="border-2 py-2 px-4 text-center rounded-lg duration-200 hover:bg-gray-100 cursor-pointer"
                >
                  Select Picture
                </label>
              )}
            </div>
            <div className="mt-[20px]">
              <div>
                <input
                  type="radio"
                  name="cat"
                  value="breakfast"
                  id="breakfast"
                  className="mr-[5px]"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label className="text-[20px]" htmlFor="breakfast">
                  Breakfast
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="cat"
                  className="mr-[5px]"
                  value="lunch"
                  id="lunch"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label className="text-[20px]" htmlFor="lunch">
                  Lunch
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="cat"
                  className="mr-[5px]"
                  value="dinner"
                  id="dinner"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label className="text-[20px]" htmlFor="dinner">
                  Dinner
                </label>
              </div>
            </div>
            <button
              className="bg-slate-700 px-[20px] py-[10px] text-white rounded-lg w-1/2 mt-[20px] hover:bg-slate-600 duration-200"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Publish;
