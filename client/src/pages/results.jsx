import { useEffect, useState } from "react";

function Results() {
  const [results, setResults] = useState(
    JSON.parse(localStorage.getItem("results") || [])
  );

  useEffect(() => {
    setResults(JSON.parse(localStorage.getItem("results")));
  }, []);

  return (
    <main className="h-[calc(100vh-105px)] basis-2/3 p-[20px] mx-[20px] mt-[20px] bg-white rounded-md overflow-scroll">
      <div>
        <h2 className="text-[25px] font-[700]">Simulation!!!</h2>
      </div>
      <div className="grid grid-cols-3 gap-x-[20px] gap-y-[25px] mt-[50px]">
        {results.data.map((result) => {
          return (
            <div
              key={result.id}
              className="rounded-lg flex flex-col shadow-lg relative border-[1px] border-gray-300"
            >
              <img src={result.img} alt="" className="rounded-t-lg" />
              <div className="px-[20px] py-[15px]">
                <h2 className="font-[700] text-[20px]">{result.title}</h2>
                <div>
                  <p>{result.category}</p>
                </div>
              </div>
              <p className="absolute bg-white rounded-br-lg rounded-tl-lg px-[5px]">
                ${result.cost}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Results;
