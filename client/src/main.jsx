import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import { ResultsContextProvider } from "./contexts/resultsContext.jsx";
import { PostsContextProvider } from "./contexts/postsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ResultsContextProvider>
        <PostsContextProvider>
          <App />
        </PostsContextProvider>
      </ResultsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
