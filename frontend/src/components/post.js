import React from "react";
import { Card, Avatar } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";

const Post = ({ post }) => {
  const { author, caption, location, photo, tag_set, like_user_set } = post;
  const { username, name, avatar_url } = author;
  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        // FIXME: host지점을 로직으로 처리
        actions={[<HeartFilled />]}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={
                <img
                  src={"http://localhost:8000" + avatar_url}
                  alt={username}
                />
              }
            />
          }
          title={location}
          description={caption}
        />
      </Card>
      {/* <img src={photo} alrt={caption} style={{ width: "100px" }} />
      {caption}, {location} */}
    </div>
  );
};

export default Post;