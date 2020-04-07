import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import Axios from "axios";
import useAxios from "axios-hooks";
import Post from "./post";
import { useAppContext } from "store";

const apiUrl = "http://localhost:8000/api/posts/";

const PostList = () => {
  // store에서 로그인시 받아오는 jwtToken, dispatch를 사용할 수 있음.
  const {
    store: { jwtToken },
    dispatch
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: postList, loading, error }, refetch] = useAxios({
    url: apiUrl,
    headers
  });
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
      {postList && postList.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;