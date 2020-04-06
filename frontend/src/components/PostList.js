import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./post";
import { useAppContext } from "store";

const apiUrl = "http://localhost:8000/api/posts/";

const PostList = () => {
  const {
    store: { jwtToken },
    dispatch
  } = useAppContext();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    Axios.get(apiUrl)
      .then(response => {
        const { data } = response;
        console.log(response);
        setPostList(data);
      })
      .catch(error => {
        console.log(error);
      });
    console.log("mounted");
  }, []);

  return (
    <div>
      {postList.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
