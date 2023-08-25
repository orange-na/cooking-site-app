import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ResultsContext } from "../contexts/resultsContext";

function Simulate() {
  const navigate = useNavigate();
  const { save } = useContext(ResultsContext);
  const [simulation, setSimulation] = useState({});
  const [inputs, setInputs] = useState({
    limit: "",
    term: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSimulate = async () => {
    let retries = 0;

    while (retries < 10) {
      try {
        const res = await axios.post(
          "http://localhost:8800/api/simulate/getorder",
          inputs,
          { withCredentials: true }
        );

        const data = res.data;
        console.log(data);
        console.log(inputs.limit);

        // 条件を満たした場合はループを終了
        if (data.total <= inputs.limit) {
          setSimulation(data);
          console.log(data);
          break;
        }

        retries++;
      } catch (error) {
        console.log(error);
        retries++;
      }
    }

    if (retries === 10) {
      console.log("Max retries reached. Unable to get data.");
    }
  };

  const handleSave = () => {
    save({ simulation, inputs });
    navigate("/");
  };

  return (
    <main className="h-[calc(100vh-105px)] basis-3/4 p-[20px] mx-[20px] mt-[20px] bg-white rounded-md overflow-scroll">
      <div className="flex flex-col items-center gap-[20px]">
        <h2 className="text-center text-[25px] font-medium">
          Let&apos;s simulate!!
        </h2>

        <div className="flex w-full">
          <h2 className="text-[30px] font-[700]"></h2>
          <input
            name="limit"
            type="number"
            placeholder="How much can you use?"
            onChange={handleChange}
            className="border border-gray-100 p-[10px] rounded-lg w-full"
          />
        </div>
        <div className="flex w-full">
          <h2 className="text-[30px] font-[700]"></h2>
          <input
            name="term"
            type="number"
            placeholder="How many days?"
            onChange={handleChange}
            className="border border-gray-100 p-[10px] rounded-lg w-full"
          />
        </div>
        <button
          className="bg-purple-500 px-[30px] py-[15px] rounded-lg text-white w-1/2 hover:bg-purple-600 duration-200"
          onClick={handleSimulate}
        >
          Simulate
        </button>
      </div>
      <div className="grid grid-cols-3 gap-x-[20px] gap-y-[25px] mt-[50px]">
        {simulation?.data?.map((result) => {
          return (
            <div
              key={result.id}
              className="rounded-lg flex flex-col shadow-lg relative border-[1px] border-gray-300"
            >
              <img
                src={`/upload/${result.img}`}
                alt=""
                className="rounded-t-lg hover:opacity-[85%] duration-200 h-[300px] object-center object-cover w-full"
              />
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
      {simulation?.data ? (
        <div className="text-center w-full mt-[70px] mb-[50px]">
          <button
            className="bg-purple-500 px-[30px] py-[15px] rounded-lg text-white hover:bg-purple-600 duration-200 text-center w-1/2"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : null}
    </main>
  );
}

export default Simulate;
