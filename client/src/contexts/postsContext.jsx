import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState({});

  const get = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/posts/get", {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <PostsContext.Provider value={{ get, posts }}>
      {children}
    </PostsContext.Provider>
  );
};
