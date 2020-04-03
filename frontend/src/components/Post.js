import React from "react";

const Post = ({ post }) => {
  const { caption, location, photo } = post;
  return (
    <div>
      <img src={photo} alrt={caption} style={{ width: "100px" }} />
      {photo}, {caption}, {location}
    </div>
  );
};

export default Post;
