import React from "react";
import { Card } from "antd";
import PostNewForm from "components/postNewForm";
import "./postNew.scss";

const PostNew = () => {
  return (
    <div className="PostNew">
      <Card title="새 포스팅 쓰기">
        <PostNewForm />
      </Card>
    </div>
  );
};

export default PostNew;
