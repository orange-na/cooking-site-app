import { createContext, useEffect, useState } from "react";

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      category: "lunch",
      cost: "13.22",
      date: null,
      img: "/img/salada.jpg",
      like_count: "2",
      nickname: "test",
      post_desc: "fenest food",
      post_id: 1,
      post_title: "【Healthy】colorful salada",
      profileicon: "/img/profileImg.jpg",
      profileimg: null,
      uid: 2,
      username: "test",
    },
    {
      category: "breakfast",
      cost: "13.22",
      date: null,
      img: "/img/toast.jpg",
      like_count: "2",
      nickname: "test",
      post_desc: "fenest food",
      post_id: 1,
      post_title: "Egg Toast with melty cheese!!",
      profileicon: "/img/profileImg.jpg",
      profileimg: null,
      uid: 2,
      username: "test",
    },
    {
      category: "dinner",
      cost: "13.22",
      date: null,
      img: "/img/steak.jpg",
      like_count: "2",
      nickname: "test",
      post_desc: "fenest food",
      post_id: 1,
      post_title: "Beef steak",
      profileicon: "/img/profileImg.jpg",
      profileimg: null,
      uid: 2,
      username: "test",
    },
    {
      category: "dinner",
      cost: "13.22",
      date: null,
      img: "/img/salmon.jpg",
      like_count: "2",
      nickname: "test",
      post_desc: "fenest food",
      post_id: 1,
      post_title: "Salmon risotto",
      profileicon: "/img/profileImg.jpg",
      profileimg: null,
      uid: 2,
      username: "test",
    },
    {
      category: "lunch",
      cost: "13.22",
      date: null,
      img: "/img/fry.jpg",
      like_count: "2",
      nickname: "test",
      post_desc: "fenest food",
      post_id: 1,
      post_title: "Fried Fish",
      profileicon: "/img/profileImg.jpg",
      profileimg: null,
      uid: 2,
      username: "test",
    },
    {
      category: "lunch",
      cost: "13.22",
      date: null,
      img: "/img/pasta.jpg",
      like_count: "2",
      nickname: "test",
      post_desc: "fenest food",
      post_id: 1,
      post_title: "Meat spaghetti",
      profileicon: "/img/profileImg.jpg",
      profileimg: null,
      uid: 2,
      username: "test",
    },
    {
      category: "dinner",
      cost: "13.22",
      date: null,
      img: "/img/meatball.jpg",
      like_count: "2",
      nickname: "test",
      post_desc: "fenest food",
      post_id: 1,
      post_title: "Meatball for today's dinner",
      profileicon: "/img/profileImg.jpg",
      profileimg: null,
      uid: 2,
      username: "test",
    },
    {
      category: "breakfast",
      cost: "13.22",
      date: null,
      img: "/img/eggtoast.jpg",
      like_count: "2",
      nickname: "test",
      post_desc: "fenest food",
      post_id: 1,
      post_title: "Egg toast with Avo",
      profileicon: "/img/profileImg.jpg",
      profileimg: null,
      uid: 2,
      username: "test",
    },
    {
      category: "lunch",
      cost: "13.22",
      date: null,
      img: "/img/dumplings.jpg",
      like_count: "2",
      nickname: "test",
      post_desc: "fenest food",
      post_id: 1,
      post_title: "Chinese Dumpling",
      profileicon: "/img/profileImg.jpg",
      profileimg: null,
      uid: 2,
      username: "test",
    },
    {
      category: "lunch",
      cost: "13.22",
      date: null,
      img: "/img/pancake.jpg",
      like_count: "2",
      nickname: "test",
      post_desc: "fenest food",
      post_id: 1,
      post_title: "French Toast!!",
      profileicon: "/img/profileImg.jpg",
      profileimg: null,
      uid: 2,
      username: "test",
    },
  ]);

  const get = async () => {
    try {
      // setPosts(res.data);
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
