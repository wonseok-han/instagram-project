import React, { useEffect, useState } from "react";
import { Alert } from "antd";
// import Axios from "axios";
// import useAxios from "axios-hooks";
import { axiosInstance, useAxios } from "api";
import Post from "./post";
import { useAppContext } from "store";

const PostList = () => {
  // store에서 로그인시 받아오는 jwtToken, dispatch를 사용할 수 있음.
  const {
    store: { jwtToken },
    dispatch
  } = useAppContext();

  const [postList, setPostList] = useState([]);

  const apiUrl = "/api/posts/";
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: apiUrl,
    headers
  });

  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);

  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `/api/posts/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";

    try {
      const response = await axiosInstance({
        url: apiUrl,
        method,
        headers
      });
      console.log("response:::" + response);

      setPostList(prevList => {
        return prevList.map(currentPost =>
          currentPost === post
            ? { ...currentPost, is_like: isLike }
            : currentPost
        );
      });
    } catch (error) {
      console.log("error:::" + error);
    }
  };
  // const [postList, setPostList] = useState([]);
  // useEffect(() => {
  // const headers = { Authorization: `JWT ${jwtToken}` };
  // Axios.get(apiUrl, { headers })
  //   .then(response => {
  //     const { data } = response;
  //     console.log(response);
  //     setPostList(data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // console.log("mounted");
  // }, []);

  return (
    <div>
      {!postList && <Alert type="warning" message="포스팅이 없습니다." />}
      {postList &&
        postList.map(post => (
          <Post key={post.id} post={post} handleLike={handleLike} />
        ))}
    </div>
  );
};

export default PostList;
