import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleReset = () => {
    setResults(null);
    localStorage.setItem("results", null);
    navigate("/simulate");
  };

  useEffect(() => {
    setResults(JSON.parse(localStorage.getItem("results")));
  }, []);

  return (
    <main className="h-[calc(100vh-105px)] basis-3/4 p-[20px] mx-[20px] mt-[20px] bg-white rounded-md overflow-scroll">
      <div>
        <p className="text-[25px]">{results?.total}</p>
        <p className="text-[25px]">{results?.term}</p>
      </div>
      <div className="grid grid-cols-3 gap-x-[20px] gap-y-[25px] mt-[20px]">
        {results?.data?.map((result) => {
          return (
            <div
              key={result?.id}
              className="rounded-lg flex flex-col shadow-lg relative border-[1px] border-gray-300"
            >
              <img
                src={`/upload/${result?.img}`}
                alt=""
                className="rounded-t-lg hover:opacity-[85%] duration-200 h-[300px] object-center object-cover w-full"
              />
              <div className="px-[20px] py-[15px]">
                <h2 className="font-[700] text-[20px]">{result?.title}</h2>
                <div>
                  <p>{result?.category}</p>
                </div>
              </div>
              <p className="absolute bg-white rounded-br-lg rounded-tl-lg px-[5px]">
                ${result?.cost}
              </p>
            </div>
          );
        })}
      </div>
      <div className="text-center w-full mt-[70px] mb-[50px]">
        <button
          className="bg-purple-500 px-[30px] py-[15px] rounded-lg text-white hover:bg-purple-600 duration-200 text-center w-1/2"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </main>
  );
}

export default Results;
