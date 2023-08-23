import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RightBar() {
  const [results, setResults] = useState(
    JSON.parse(localStorage.getItem("results") || null)
  );

  useEffect(() => {
    setResults(JSON.parse(localStorage.getItem("results")));
  }, []);

  return (
    <aside className="h-[calc(100vh-125px)] basis-1/3 bg-white mr-[20px] mt-[20px] rounded-md p-[20px] shadow-lg">
      <div>
        <div>
          {/* <h2 className="text-[25px] text-center mt-[20px] font-[700] mb-[10px]">
            This time
          </h2> */}
          <p className="text-center text-[25px]">
            <span className="text-[35px]">{results.term}</span> meals
          </p>
          <p className="text-center text-[25px]">
            $<span className="text-[35px]">{results.limit}</span>
          </p>
        </div>
        <div>
          <h2 className="text-[25px] text-center font-[700] mb-[10px]">
            Today&apos;s Recipe
          </h2>
          <div>
            <Link to="/results">
              <img
                src={results ? results.data[0].img : "img/"}
                alt=""
                className="bg-gray-400 w-full h-[250px] rounded-lg object-cover hover:opacity-[85%] duration-200"
              />
            </Link>
          </div>
        </div>
        <div className="text-center mb-[30px] mt-[30px]">
          <Link to="/simulate" className="">
            <button className="bg-purple-500 px-[30px] py-[25px] rounded-[20px] text-white w-1/2 hover:bg-purple-600 duration-200">
              Simulate
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default RightBar;
