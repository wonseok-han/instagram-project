import React, { useState } from "react";
import { Input, Button } from "antd";
import useAxios from "axios-hooks";
import Axios from "axios";
import { useAppContext } from "store";
import Comment from "./comment";

const CommentList = ({ post }) => {
  const {
    store: { jwtToken },
    dispatch
  } = useAppContext();

  const [commentContent, setCommentContent] = useState("");

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: commentList, loading, error }, refetch] = useAxios({
    url: `http://localhost:8000/api/posts/${post.id}/comments/`,
    headers
  });

  const handleCommentSave = async () => {
    try {
      const response = await Axios.post(
        `http://localhost:8000/api/posts/${post.id}/comments/`,
        { message: commentContent },
        { headers }
      );
      setCommentContent("");
      refetch();
    } catch (error) {
      console.log("error:::" + error);
    }
  };
  return (
    <div>
      {commentList &&
        commentList.map(comment => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      <Input.TextArea
        style={{ marginBottom: "0.5em" }}
        value={commentContent}
        onChange={e => setCommentContent(e.target.value)}
      />
      <Button
        block
        type="primary"
        disabled={commentContent.length === 0}
        onClick={handleCommentSave}
      >
        댓글쓰기
      </Button>
    </div>
  );
};

export default CommentList;
