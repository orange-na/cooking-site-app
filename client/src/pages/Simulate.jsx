import { useState } from "react";
import axios from "axios";

function Simulate() {
  const [results, setResults] = useState([{}]);
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
          setResults(data);
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

  //   const handleSimulate = async () => {
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:8800/api/simulate/getorder",
  //         inputs,
  //         { withCredentials: true }
  //       );
  //       const data = res.data;
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  console.log(results.data);

  return (
    <main className="h-[calc(100vh-105px)] basis-2/3 p-[20px] mx-[20px] mt-[20px] bg-white rounded-md overflow-scroll">
      <div>
        <div>
          <h2>Limit</h2>
          <input
            name="limit"
            type="number"
            placeholder="How much can you use?"
            onChange={handleChange}
          />
        </div>
        <div>
          <h2>Term</h2>
          <input
            name="term"
            type="number"
            placeholder="How many days?"
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-purple-500 px-[30px] py-[15px] rounded-lg text-white w-1/2 hover:bg-purple-600 duration-200 mt-[30px]"
          onClick={handleSimulate}
        >
          Simulate
        </button>
      </div>
      <div className="grid grid-cols-3 gap-x-[15px] gap-y-[25px]">
        {results?.data?.map((result) => {
          return (
            <div key={result.id}>
              <h2>{result.title}</h2>
              <p>{result.cost}</p>
              <img src={result.img} alt="" />
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Simulate;
