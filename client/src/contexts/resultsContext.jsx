import { createContext, useEffect, useState } from "react";

export const ResultsContext = createContext();

export const ResultsContextProvider = ({ children }) => {
  const [results, setResults] = useState(
    JSON.parse(localStorage.getItem("results") || null)
  );

  const save = ({ simulation, inputs }) => {
    const newResults = {
      ...simulation,
      limit: inputs.limit,
      term: inputs.term,
    };
    setTimeout(
      setResults(
        localStorage.setItem("results", JSON.stringify(newResults)) || null
      ),
      1000
    );
  };

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  return (
    <ResultsContext.Provider value={{ save, setResults, results }}>
      {children}
    </ResultsContext.Provider>
  );
};
